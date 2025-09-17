import React from 'react'
import {Pressable, View} from 'react-native'
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome'
import {msg, Trans} from '@lingui/macro'
import {useLingui} from '@lingui/react'

import {useWebMediaQueries} from '#/lib/hooks/useWebMediaQueries'
import {ErrorBoundary} from '#/view/com/util/ErrorBoundary'
import {Logo} from '#/view/icons/Logo'
import {Logotype} from '#/view/icons/Logotype'
import {
  AppClipOverlay,
  postAppClipMessage,
} from '#/screens/StarterPack/StarterPackLandingScreen'
import {atoms as a, useTheme} from '#/alf'
import {AppLanguageDropdown} from '#/components/AppLanguageDropdown'
import {Button, ButtonText} from '#/components/Button'
import * as Layout from '#/components/Layout'
import {InlineLinkText} from '#/components/Link'
import {Text} from '#/components/Typography'

export const SplashScreen = ({
  onDismiss,
  onPressSignin,
  onPressCreateAccount,
}: {
  onDismiss?: () => void
  onPressSignin: () => void
  onPressCreateAccount: () => void
}) => {
  const {_} = useLingui()
  const t = useTheme()
  const {isTabletOrMobile: isMobileWeb} = useWebMediaQueries()
  const [showClipOverlay, setShowClipOverlay] = React.useState(false)

  React.useEffect(() => {
    const getParams = new URLSearchParams(window.location.search)
    const clip = getParams.get('clip')
    if (clip === 'true') {
      setShowClipOverlay(true)
      postAppClipMessage({
        action: 'present',
      })
    }
  }, [])

  return (
    <>
      {onDismiss && (
        <Pressable
          accessibilityRole="button"
          style={{
            position: 'absolute',
            top: 20,
            right: 20,
            padding: 20,
            zIndex: 100,
          }}
          onPress={onDismiss}>
          <FontAwesomeIcon
            icon="x"
            size={24}
            style={{
              color: String(t.atoms.text.color),
            }}
          />
        </Pressable>
      )}

      <Layout.Center style={[a.h_full, a.flex_1]} ignoreTabletLayoutOffset>
        <View
          testID="noSessionView"
          style={[
            a.h_full,
            a.justify_center,
            // @ts-expect-error web only
            {paddingBottom: '20vh'},
            isMobileWeb && a.pb_5xl,
            t.atoms.border_contrast_medium,
            a.align_center,
            a.gap_5xl,
            a.flex_1,
          ]}>
          <ErrorBoundary>
            <View style={[a.justify_center, a.align_center, a.pb_0, a.mb_0]}>
              <Logo width={120} fill={t.atoms.text.color} />

              <View style={[a.pb_sm, a.pt_5xl, a.pt_0, a.mt_lg, a.mb_lg]}>
                <Logotype width={280} fill={t.atoms.text.color} />
              </View>

              <Text
                style={[a.text_md, a.font_bold, t.atoms.text_contrast_medium]}>
                <Trans>What's poppin'?</Trans>
              </Text>
            </View>

            <View
              testID="signinOrCreateAccount"
              style={[a.w_full, a.px_xl, a.gap_md, a.pb_2xl, {maxWidth: 320}]}>
              <Button
                testID="createAccountButton"
                onPress={onPressCreateAccount}
                label={_(msg`Create new account`)}
                accessibilityHint={_(
                  msg`Opens flow to create a new Blacksky account`,
                )}
                size="large"
                variant="solid"
                color="primary">
                <ButtonText>
                  <Trans>Create account</Trans>
                </ButtonText>
              </Button>
              <Button
                testID="signInButton"
                onPress={onPressSignin}
                label={_(msg`Sign in`)}
                accessibilityHint={_(
                  msg`Opens flow to sign in to your existing Blacksky account`,
                )}
                size="large"
                variant="solid"
                color="secondary">
                <ButtonText>
                  <Trans>Sign in</Trans>
                </ButtonText>
              </Button>
              <Text
                style={[
                  t.atoms.text_contrast_medium,
                  a.text_sm,
                  a.leading_snug,
                  a.flex_1,
                ]}>
                <Trans>
                  Migrating from Bluesky? Use{' '}
                  <InlineLinkText
                    label={_(msg`Migrate your account with tektite.cc`)}
                    to="https://tektite.cc"
                    style={[a.text_sm]}>
                    Tektite.cc{' '}
                  </InlineLinkText>
                  to move your followers, posts, and media to Blacksky.
                </Trans>
              </Text>
            </View>
          </ErrorBoundary>
        </View>
        <Footer />
      </Layout.Center>
      <AppClipOverlay
        visible={showClipOverlay}
        setIsVisible={setShowClipOverlay}
      />
    </>
  )
}

function Footer() {
  const t = useTheme()
  const {_} = useLingui()

  return (
    <View
      style={[
        a.absolute,
        a.inset_0,
        {top: 'auto'},
        a.px_xl,
        a.py_lg,
        a.border_t,
        a.flex_row,
        a.align_center,
        a.flex_wrap,
        a.gap_xl,
        a.flex_1,
        t.atoms.border_contrast_medium,
      ]}>
      <InlineLinkText
        label={_(msg`Read the patches and contribute`)}
        to="https://github.com/tigwyk/bsky.progressia.one">
        <Trans>Github</Trans>
      </InlineLinkText>

      <View style={a.flex_1} />

      <AppLanguageDropdown />
    </View>
  )
}
