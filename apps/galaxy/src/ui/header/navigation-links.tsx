'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { MAIN_PAGE_FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { useStore } from '@/store'
import { cn, getManagementLink } from '@/utils'
import { InboxLink } from './inbox-link'
import { PatientLookupDropdown } from './patient-lookup-dropdown'
import { ScheduleMenuDropdown } from './schedule-menu-dropdown.tsx'

const NavigationLinks = ({ count }: { count: number }) => {
  const { staffPractice, organizationIds, staffTypes } = useStore(
    (state) => state.staffResource,
  )
  const hasPermission = useHasPermission('mainTabManagementPermission')

  const isAvfeatureFlagEnabled = useFeatureFlagEnabled(
    MAIN_PAGE_FEATURE_FLAGS.ehr9475AudioVideoTelemedicine,
  )

  const isRCMFlagEnabled = useFeatureFlagEnabled(
    MAIN_PAGE_FEATURE_FLAGS.ehr7246EnableClaimManagementTab,
  )
  const managementLink =
    hasPermission &&
    getManagementLink(organizationIds, staffPractice, staffTypes)

  return (
    <Flex
      align="center"
      justify="between"
      py="1"
      px="5"
      className="text-white bg-accent-11"
    >
      <Flex>
        <NavigationLink href="/" label="Schedule" />
        <NavigationLink href="/patient-lookup" label="Patient Lookup" />
        <NavigationLink href="/rx" label="Rx" />
        {hasPermission && (
          <NavigationLink href={managementLink} label="Management" />
        )}
        {isRCMFlagEnabled && (
          <NavigationLink href="/revenue-cycle" label="Revenue Cycle" />
        )}

        <NavigationLink href="/auto-text" label="Auto Text" />

        {isAvfeatureFlagEnabled && (
          <NavigationLink href="/call" label="Audio/Video" />
        )}
      </Flex>
      <InboxLink href="/inbox" label="Inbox" inboxCountTotal={count} />
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
    return <ScheduleMenuDropdown isActive={isActive} />
  }
  if (label === 'Patient Lookup') {
    return <PatientLookupDropdown isActive={isActive} />
  }
  return (
    <NextLink
      prefetch={false}
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
