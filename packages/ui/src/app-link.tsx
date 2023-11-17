import { unstable_noStore as noStore } from 'next/cache'
import NextLink, { LinkProps } from 'next/link'
import { wrapPath } from '@psychplus/utils/url'

interface AppLinkProps extends React.PropsWithChildren<LinkProps> {
  className?: string
}

const AppLink = (props: AppLinkProps) => {
  noStore()

  const { href, ...rest } = props

  return <NextLink {...rest} href={wrapPath(href.toString())} />
}

export { AppLink }
