import React from 'react'

import * as persisted from '#/state/persisted'

type StateContext = persisted.Schema['progressiaoneVerification']
type SetContext = (v: persisted.Schema['progressiaoneVerification']) => void

const stateContext = React.createContext<StateContext>(
  persisted.defaults.progressiaoneVerification,
)
const setContext = React.createContext<SetContext>(
  (_: persisted.Schema['progressiaoneVerification']) => {},
)

export function Provider({children}: React.PropsWithChildren<{}>) {
  const [state, setState] = React.useState(
    persisted.get('progressiaoneVerification'),
  )

  const setStateWrapped = React.useCallback(
    (
      progressiaoneVerification: persisted.Schema['progressiaoneVerification'],
    ) => {
      setState(progressiaoneVerification)
      persisted.write('progressiaoneVerification', progressiaoneVerification)
    },
    [setState],
  )

  React.useEffect(() => {
    return persisted.onUpdate(
      'progressiaoneVerification',
      nextProgressiaoneVerification => {
        setState(nextProgressiaoneVerification)
      },
    )
  }, [setStateWrapped])

  return (
    <stateContext.Provider value={state}>
      <setContext.Provider value={setStateWrapped}>
        {children}
      </setContext.Provider>
    </stateContext.Provider>
  )
}

export function useProgressiaoneVerification() {
  return (
    React.useContext(stateContext) ??
    persisted.defaults.progressiaoneVerification!
  )
}

export function useProgressiaoneVerificationEnabled() {
  return useProgressiaoneVerification().enabled
}

export function useProgressiaoneVerificationTrusted(
  mandatory: string | undefined = undefined,
) {
  const trusted = new Set(useProgressiaoneVerification().trusted)
  if (mandatory) {
    trusted.add(mandatory)
  }
  return trusted
}

export function useSetProgressiaoneVerification() {
  return React.useContext(setContext)
}

export function useSetProgressiaoneVerificationEnabled() {
  const progressiaoneVerification = useProgressiaoneVerification()
  const setProgressiaoneVerification = useSetProgressiaoneVerification()

  return React.useMemo(
    () => (enabled: boolean) =>
      setProgressiaoneVerification({...progressiaoneVerification, enabled}),
    [progressiaoneVerification, setProgressiaoneVerification],
  )
}

export function useSetProgressiaoneVerificationTrust() {
  const progressiaoneVerification = useProgressiaoneVerification()
  const setProgressiaoneVerification = useSetProgressiaoneVerification()

  return React.useMemo(
    () => ({
      add: (add: string) => {
        const trusted = new Set(progressiaoneVerification.trusted)
        trusted.add(add)
        setProgressiaoneVerification({
          ...progressiaoneVerification,
          trusted: Array.from(trusted),
        })
      },
      remove: (remove: string) => {
        const trusted = new Set(progressiaoneVerification.trusted)
        trusted.delete(remove)
        setProgressiaoneVerification({
          ...progressiaoneVerification,
          trusted: Array.from(trusted),
        })
      },
    }),
    [progressiaoneVerification, setProgressiaoneVerification],
  )
}
