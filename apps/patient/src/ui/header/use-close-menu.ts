'use client'

import { useCallback, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useStore } from './store'

const CLOSE_MENU_THRESHOLD = 768

const useCloseMenu = () => {
  const pathname = usePathname()

  const { isOpen, closeMenu } = useStore((state) => ({
    isOpen: state.responsiveMenuOpen,
    closeMenu: state.closeMenu,
  }))

  useEffect(() => {
    closeMenu()
  }, [pathname, closeMenu])

  const handleResize = useCallback(() => {
    const screenWidth = window.innerWidth

    if (screenWidth >= CLOSE_MENU_THRESHOLD && isOpen) {
      closeMenu()
    }
  }, [isOpen, closeMenu])

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [handleResize])
}

export { useCloseMenu }
