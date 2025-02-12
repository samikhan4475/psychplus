'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { ScrollBar } from '@/components/scroll-bar'
import { useStore } from '@/store'
import { cn } from '@/utils'

const NavigationTabs = () => {
  const tabs = useStore((state) => state.tabs)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Flex px="5" className="min-h-[38px] bg-accent-12" />
  }

  return (
    <ScrollBar
      px="5"
      align="end"
      gap="2"
      className={cn(
        'text-white min-h-[38px] whitespace-nowrap bg-accent-12 pb-0'
      )}
    >
      <NavigationTab href="/" label="Schedule" />
      {tabs.map((tab) => (
        <NavigationTab key={tab.href} href={tab.href} label={tab.label} />
      ))}
    </ScrollBar>
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
  const hrefParams = new URLSearchParams(href.split('?')[1])
  const id = hrefParams.get('id')
  const appointmentId = useSearchParams().get('id')
  const baseUrl = href.split('?')[0].split('/').slice(0, 3).join('/')

  const isActive =
    href === '/'
      ? pathname === href
      : pathname.startsWith(baseUrl) && appointmentId === id

  return (
    <NextLink
      href={href}
      prefetch={false}
      className={cn(
        'flex cursor-pointer items-center gap-2 rounded-t-2 px-2 py-1 no-underline transition-colors',
        {
          'text-white bg-pp-focus-bg hover:bg-white': !isActive,
          'cursor-default bg-[#FCFDFF] text-accent-12': isActive,
        }
      )}
    >
      <Text className="text-pp-black-1 text-[11px] font-[600]">{label}</Text>
      {href !== '/' && (
        <Flex
          align="center"
          justify="center"
          className={cn(
            'rounded-full text-white h-[20px] w-[20px] cursor-pointer transition-colors hover:bg-gray-3',
            {
              'text-gray-9 hover:bg-gray-3 hover:text-gray-11': isActive,
            }
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
          <Cross2Icon className="text-pp-black-1" width={12} height={12} />
        </Flex>
      )}
      {href === '/' && <Box className="h-[20px]" />}
    </NextLink>
  )
}

export { NavigationTabs }
