import {
  type AppBskyActorDefs,
  type AppBskyActorGetProfile,
  AtUri,
} from '@atproto/api'
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
import {
  asUri,
  asyncGenCollect,
  asyncGenFilter,
  type ConstellationLink,
} from '../constellation'
import {
  getTrustedConstellationVerifications,
  RQKEY as PROGRESSIAONE_VERIFICATION_RQKEY,
} from '../progressiaone-verification'

export function useVerificationsRemoveMutation() {
  const agent = useAgent()
  const {currentAccount} = useSession()
  const updateProfileVerificationCache = useUpdateProfileVerificationCache()

  const qc = useQueryClient()
  const progressiaoneVerificationEnabled = useProgressiaoneVerificationEnabled()
  const progressiaoneVerificationTrusted = useProgressiaoneVerificationTrusted(
    currentAccount?.did,
  )
  const constellationInstance = useConstellationInstance()

  return useMutation({
    async mutationFn({
      profile,
      verifications,
    }: {
      profile: bsky.profile.AnyProfileView
      verifications: AppBskyActorDefs.VerificationView[]
    }) {
      if (!currentAccount) {
        throw new Error('User not logged in')
      }

      const uris = new Set(verifications.map(v => v.uri))

      await Promise.all(
        Array.from(uris).map(uri => {
          return agent.app.bsky.graph.verification.delete({
            repo: currentAccount.did,
            rkey: new AtUri(uri).rkey,
          })
        }),
      )

      if (progressiaoneVerificationEnabled) {
        await until(
          10,
          2e3,
          (link: ConstellationLink[]) => {
            return link.length === 0
          },
          () =>
            asyncGenCollect(
              asyncGenFilter(
                getTrustedConstellationVerifications(
                  constellationInstance,
                  profile.did,
                  progressiaoneVerificationTrusted,
                ),
                link => uris.has(asUri(link)),
              ),
            ),
        )
      } else {
        await until(
          5,
          1e3,
          ({data: profile}: AppBskyActorGetProfile.Response) => {
            if (
              !profile.verification?.verifications.some(v => uris.has(v.uri))
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
      logger.metric('verification:revoke', {}, {statsig: true})
      await updateProfileVerificationCache({profile})
      qc.invalidateQueries({
        queryKey: PROGRESSIAONE_VERIFICATION_RQKEY(
          profile.did,
          progressiaoneVerificationTrusted,
        ),
      })
    },
  })
}
