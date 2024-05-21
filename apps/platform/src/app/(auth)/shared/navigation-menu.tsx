import NextLink from 'next/link'
import { NavigationMenuLink } from './navigation-menu-link'

interface MenuItem {
  label: string
  href: string
}

interface NavigationMenuProps {
  items: MenuItem[]
}

const NavigationMenu = ({ items }: NavigationMenuProps) => {
  return items.map((item) => (
    <NextLink key={item.href} href={item.href}>
      <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
    </NextLink>
  ))
}

export { NavigationMenu, type MenuItem }
