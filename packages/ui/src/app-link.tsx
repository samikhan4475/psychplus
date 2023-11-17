import { unstable_noStore as noStore } from 'next/cache'
import NextLink, { LinkProps } from 'next/link'
import { APP_ENV, APP_PATH } from '@psychplus/utils/constants'

interface AppLinkProps extends React.PropsWithChildren<LinkProps> {
  className?: string
}

const AppLink = (props: AppLinkProps) => {
  noStore()

  const { href, ...rest } = props

  const appPath = APP_PATH ? `/${APP_PATH}` : ''

  const combinedHref = APP_ENV !== 'development' ? `${appPath}${href}` : href

  return <NextLink {...rest} href={combinedHref} />
}

export { AppLink }
