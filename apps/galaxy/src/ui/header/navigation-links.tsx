'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { useStore } from '@/store'
import { cn } from '@/utils'

const NavigationLinks = () => {
  return (
    <Flex>
      <NavigationLink href="/" label="Schedule" />
      <NavigationLink href="/patient-lookup" label="Patient Lookup" />
      <NavigationLink href="/revenue-cycle" label="Revenue Cycle" />
      <NavigationLink href="/experience" label="Experience" />
      <NavigationLink href="/auto-text" label="Auto Text" />
      <NavigationLink href="/management" label="Management" />
      <NavigationLink
        href="/pre-visit-assessment"
        label="Pre-visit Assessment"
      />
      <NavigationLink href="/rx" label="Rx" />
    </Flex>
  )
}

interface NavigationLinkProps {
  href: string
  label: string
}

const NavigationLink = ({ href, label }: NavigationLinkProps) => {
  const addTab = useStore((state) => state.addTab)
  const pathname = usePathname()
  const isActive = href === '/' ? pathname === href : pathname.startsWith(href)
  const navLinkClass = cn('whitespace-nowrap px-2 py-1 text-[13px]', {
    'bg-pp-black-1 rounded-[4px]': isActive,
  })

  if (label === 'Schedule') {
    return (
      <NextLink href="/" className={navLinkClass}>
        Schedule
      </NextLink>
    )
  }

  return (
    <NextLink
      href={href}
      className={navLinkClass}
      onClick={() => {
        addTab({
          href,
          label,
        })
      }}
    >
      {label}
    </NextLink>
  )
}

export { NavigationLinks }
