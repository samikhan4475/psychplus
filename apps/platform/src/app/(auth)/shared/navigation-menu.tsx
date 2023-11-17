import { AppLink } from '@psychplus/ui/app-link'
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
    <AppLink key={item.href} href={item.href}>
      <NavigationMenuLink href={item.href}>{item.label}</NavigationMenuLink>
    </AppLink>
  ))
}

export { NavigationMenu, type MenuItem }
