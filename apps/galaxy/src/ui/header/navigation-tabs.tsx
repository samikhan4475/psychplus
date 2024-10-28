'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useStore } from '@/store'
import { cn } from '@/utils'

const NavigationTabs = () => {
  const tabs = useStore((state) => state.tabs)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Flex px="5" className="h-[38px] bg-accent-12" />
  }

  return (
    <Flex
      px="5"
      align="end"
      gap="2"
      className="text-white h-[38px] bg-accent-12"
    >
      <NavigationTab href="/" label="Schedule" />
      {tabs.map((tab) => (
        <NavigationTab key={tab.href} href={tab.href} label={tab.label} />
      ))}
    </Flex>
  )
}

interface NavigationTabProps {
  href: string
  label: string
}

const NavigationTab = ({ href, label }: NavigationTabProps) => {
  const router = useRouter()

  const { tabs, removeTab } = useStore((state) => ({
    tabs: state.tabs,
    removeTab: state.removeTab,
  }))

  const pathname = usePathname()
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href)

  return (
    <NextLink
      href={href}
      prefetch={false}
      className={cn(
        'text-white flex cursor-pointer items-center gap-2 overflow-hidden rounded-t-2 bg-blue-11 px-2 py-1 no-underline hover:bg-[var(--blue-11-accent)]',
        {
          'bg-white hover:bg-white cursor-default text-accent-12': isActive,
        },
      )}
    >
      <Text className="text-[11px] font-[600]">{label}</Text>
      {href !== '/' ? (
        <Flex
          align="center"
          justify="center"
          className={cn(
            'rounded-full text-white h-[20px] w-[20px] cursor-pointer transition-colors hover:bg-accent-12',
            {
              'text-gray-9 hover:bg-gray-3 hover:text-gray-11': isActive,
            },
          )}
          onClick={(e) => {
            e.preventDefault()

            let tabIndex = tabs.findIndex((tab) => tab.href === href)
            tabIndex = tabIndex !== -1 ? tabIndex : 0

            const isLastTab = tabIndex === tabs.length - 1
            const prevTab = tabs[tabIndex - 1]
            const nextTab = tabs[tabIndex + 1]

            removeTab(href)

            if (isActive) {
              if (isLastTab && prevTab) {
                return router.replace(prevTab.href)
              }

              if (!isLastTab && nextTab) {
                return router.replace(nextTab.href)
              }

              return router.replace('/')
            }
          }}
        >
          <Cross2Icon width={12} height={12} />
        </Flex>
      ) : (
        <Box className="h-[20px]" />
      )}
    </NextLink>
  )
}

export { NavigationTabs }
