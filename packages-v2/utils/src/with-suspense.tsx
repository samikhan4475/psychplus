import { Suspense, type SuspenseProps } from 'react'

const withSuspense = <P extends object>(
  Component: React.ComponentType<P>,
  suspenseProps: SuspenseProps,
) => {
  const ComponentWithSuspense = (props: P) => {
    return (
      <Suspense {...suspenseProps}>
        <Component {...props} />
      </Suspense>
    )
  }

  ComponentWithSuspense.displayName = `${
    Component.displayName ?? 'Component'
  }WithSuspense`

  return ComponentWithSuspense
}

export { withSuspense }
