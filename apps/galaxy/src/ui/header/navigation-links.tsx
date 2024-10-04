'use client'

import NextLink from 'next/link'
import { Flex } from '@radix-ui/themes'
import { useStore } from '@/store'

const NavigationLinks = () => {
  return (
    <Flex>
      <NavigationLink href="/schedule" label="Schedule" />
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
      <NavigationLink href="/reports" label="Reports" />
    </Flex>
  )
}

interface NavigationLinkProps {
  href: string
  label: string
}

const NavigationLink = ({ href, label }: NavigationLinkProps) => {
  const addTab = useStore((state) => state.addTab)

  return (
    <NextLink
      href={href}
      className="whitespace-nowrap px-2 py-1 text-[13px]"
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
