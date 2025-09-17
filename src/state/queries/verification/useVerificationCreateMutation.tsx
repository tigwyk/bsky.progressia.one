import {type AppBskyActorGetProfile} from '@atproto/api'
import {useMutation, useQueryClient} from '@tanstack/react-query'

import {until} from '#/lib/async/until'
import {logger} from '#/logger'
import {useConstellationInstance} from '#/state/preferences/constellation-instance'
import {
  useProgressiaoneVerificationEnabled,
  useProgressiaoneVerificationTrusted,
} from '#/state/preferences/progressiaone-verification'
import {useUpdateProfileVerificationCache} from '#/state/queries/verification/useUpdateProfileVerificationCache'
import {useAgent, useSession} from '#/state/session'
import type * as bsky from '#/types/bsky'
import {asUri, asyncGenFind, type ConstellationLink} from '../constellation'
import {
  getTrustedConstellationVerifications,
  RQKEY as PROGRESSIAONE_VERIFICATION_RQKEY,
} from '../progressiaone-verification'

export function useVerificationCreateMutation() {
  const agent = useAgent()
  const {currentAccount} = useSession()
  const updateProfileVerificationCache = useUpdateProfileVerificationCache()

  const qc = useQueryClient()
  const progressiaOneVerificationEnabled = useProgressiaoneVerificationEnabled()
  const progressiaOneVerificationTrusted = useProgressiaoneVerificationTrusted(
    currentAccount?.did,
  )
  const constellationInstance = useConstellationInstance()

  return useMutation({
    async mutationFn({profile}: {profile: bsky.profile.AnyProfileView}) {
      if (!currentAccount) {
        throw new Error('User not logged in')
      }

      const {uri} = await agent.app.bsky.graph.verification.create(
        {repo: currentAccount.did},
        {
          subject: profile.did,
          createdAt: new Date().toISOString(),
          handle: profile.handle,
          displayName: profile.displayName || '',
        },
      )

      if (progressiaOneVerificationEnabled) {
        await until(
          10,
          2e3,
          (link: ConstellationLink | undefined) => {
            return link !== undefined
          },
          () => {
            return asyncGenFind(
              getTrustedConstellationVerifications(
                constellationInstance,
                profile.did,
                progressiaOneVerificationTrusted,
              ),
              link => asUri(link) === uri,
            )
          },
        )
      } else {
        await until(
          5,
          1e3,
          ({data: profile}: AppBskyActorGetProfile.Response) => {
            if (
              profile.verification &&
              profile.verification.verifications.find(v => v.uri === uri)
            ) {
              return true
            }
            return false
          },
          () => {
            return agent.getProfile({actor: profile.did ?? ''})
          },
        )
      }
    },
    async onSuccess(_, {profile}) {
      logger.metric('verification:create', {}, {statsig: true})
      await updateProfileVerificationCache({profile})
      qc.invalidateQueries({
        queryKey: PROGRESSIAONE_VERIFICATION_RQKEY(
          profile.did,
          progressiaOneVerificationTrusted,
        ),
      })
    },
  })
}
