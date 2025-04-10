'use client'

import { useMemo } from 'react'
import NextLink from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { FEATURE_FLAGS } from '@/constants'
import { useFeatureFlagEnabled } from '@/hooks/use-feature-flag-enabled'
import { cn, getStaffNavLinks } from '@/utils'

interface StaffNavigationProps {
  staffId?: string
  isNonAdminProfileView?: boolean
}

const StaffNavigation = ({
  isNonAdminProfileView,
  staffId,
}: StaffNavigationProps) => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')

  const isFeatureFlagEnabled = useFeatureFlagEnabled(
    FEATURE_FLAGS.ehr11786EnableGalaxySecondPhaseFeatures,
  )
  const navLinks = useMemo(
    () =>
      getStaffNavLinks({
        isNonAdminProfileView,
        isFeatureFlagEnabled,
        staffId,
      }),
    [isFeatureFlagEnabled, isNonAdminProfileView, staffId],
  )

  return (
    <Box className="bg-white mb-4 w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        <Flex direction="column">
          {navLinks.map((widget) => {
            const shouldRender =
              !widget.conditions || widget.conditions.every(Boolean)

            if (!shouldRender) return null

            return (
              <NavigationLink
                key={widget.label}
                href={widget.href}
                userId={userId}
              >
                {widget.label}
              </NavigationLink>
            )
          })}
        </Flex>
      </ScrollArea>
    </Box>
  )
}

interface NavigationLinkProps {
  href?: string
  userId: string | null
}

const NavigationLink = ({
  href,
  userId,
  children,
}: React.PropsWithChildren<NavigationLinkProps>) => {
  const pathname = usePathname()

  href = href ? `${href}` : `/management`

  const isActive = pathname === href

  return (
    <NextLink
      href={userId ? `${href}?id=${userId}` : href}
      className={cn(
        'px-2 py-1 text-[11.5px] first:rounded-t-1 hover:bg-accent-2',
        {
          'text-white bg-accent-12 font-[600] hover:bg-accent-12': isActive,
        },
      )}
    >
      {children}
    </NextLink>
  )
}

export { StaffNavigation }
