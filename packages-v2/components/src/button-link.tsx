import NextLink, { LinkProps } from 'next/link'
import { Button } from '@radix-ui/themes'

type ButtonLinkProps = React.ComponentProps<typeof Button> &
  Pick<LinkProps, 'href' | 'prefetch'>

const ButtonLink = ({ href, prefetch, children, ...rest }: ButtonLinkProps) => (
  <Button asChild {...rest}>
    <NextLink href={href} prefetch={prefetch}>
      {children}
    </NextLink>
  </Button>
)

export { ButtonLink }
