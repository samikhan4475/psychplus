'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { FEATURE_FLAGS, MAIN_PAGE_FEATURE_FLAGS } from '@/constants'
import { useHasPermission } from '@/hooks'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { useStore } from '@/store'
import { cn } from '@/utils'
import { PatientLookupDropdown } from './patient-lookup-dropdown'

const NavigationLinks = () => {
  const hasPermission = useHasPermission('mainTabManagementPermission')
  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr11786EnableGalaxySecondPhaseFeatures,
  )

  const isAvfeatureFlagEnabled = useFeatureFlagEnabled(
    MAIN_PAGE_FEATURE_FLAGS.ehr9475AudioVideoTelemedicine,
  )

  const isRCMFlagEnabled = useFeatureFlagEnabled(
    MAIN_PAGE_FEATURE_FLAGS.ehr7246EnableClaimManagementTab,
  )
  return (
    <Flex>
      <NavigationLink href="/" label="Schedule" />
      <NavigationLink href="/patient-lookup" label="Patient Lookup" />
      <NavigationLink href="/rx" label="Rx" />
      {hasPermission && (
        <NavigationLink href="/management" label="Management" />
      )}
      {isRCMFlagEnabled && (
        <NavigationLink href="/revenue-cycle" label="Revenue Cycle" />
      )}

      {isFeatureFlagEnabled && (
        <>
          <NavigationLink href="/experience" label="Experience" />
          <NavigationLink
            href="/pre-visit-assessment"
            label="Pre-visit Assessment"
          />
        </>
      )}
      <NavigationLink href="/auto-text" label="Auto Text" />

      {isAvfeatureFlagEnabled && (
        <NavigationLink href="/call" label="Audio/Video" />
      )}
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
  if (label === 'Patient Lookup') {
    return <PatientLookupDropdown isActive={isActive} />
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
