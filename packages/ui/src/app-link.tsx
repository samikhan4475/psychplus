import NextLink, { LinkProps } from 'next/link'
import { APP_ENV, APP_PATH } from '@psychplus/utils/constants'

interface AppLinkProps extends React.PropsWithChildren<LinkProps> {
  className?: string
}

const AppLink = (props: AppLinkProps) => {
  const { href, ...rest } = props

  const combinedHref =
    APP_ENV !== 'development' ? `${APP_PATH ?? ''}${href}` : href

  return <NextLink {...rest} href={combinedHref} />
}

export { AppLink }
