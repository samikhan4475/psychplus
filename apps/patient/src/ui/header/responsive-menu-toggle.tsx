'use client'

import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons'
import { IconButton } from '@radix-ui/themes'
import { useStore } from './store'

const ResponsiveMenuToggle = () => {
  const { isOpen, toggleOpen } = useStore((state) => ({
    isOpen: state.responsiveMenuOpen,
    toggleOpen: state.toggleResponsiveMenuOpen,
  }))

  const icon = isOpen ? (
    <Cross1Icon height={30} width={30} />
  ) : (
    <HamburgerMenuIcon height={30} width={30} />
  )

  return (
    <IconButton
      onClick={toggleOpen}
      variant="ghost"
      size="4"
      radius="full"
      className="cursor-pointer transition-colors hover:bg-gray-2 active:bg-gray-3 sm:hidden"
      highContrast
    >
      <span className="sr-only">Open navigation menu</span>
      {icon}
    </IconButton>
  )
}

export { ResponsiveMenuToggle }
