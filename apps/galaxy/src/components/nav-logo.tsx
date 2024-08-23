import NextLink from 'next/link'
import { Link } from '@radix-ui/themes'
import { PsychPlusLogo } from './psychplus-logo'

const NavLogo = () => (
  <Link className="no-underline" asChild>
    <NextLink href="/">
      <PsychPlusLogo />
    </NextLink>
  </Link>
)

export { NavLogo }
