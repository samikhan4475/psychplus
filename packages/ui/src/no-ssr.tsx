import * as React from 'react'
import dynamic from 'next/dynamic'

const NoSSR = dynamic(
  () =>
    Promise.resolve(({ children }: { children: React.ReactNode }) => (
      <React.Fragment>{children}</React.Fragment>
    )),
  {
    ssr: false,
  },
)

export { NoSSR }
