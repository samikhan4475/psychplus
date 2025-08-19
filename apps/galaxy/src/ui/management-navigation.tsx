'use client'

import { useMemo } from 'react'
import NextLink from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { useStore } from '@/store'
import { cn, getManagementNavLinks } from '@/utils'

const ManagementNavigation = () => {
  const { id, type, roleId, locationId } = useParams<{
    id: string
    type: string
    roleId: string
    locationId: string
  }>()
  const searchParams = useSearchParams()
  const practiceId = searchParams.get('practice')
  const pathname = usePathname()
  const segments = pathname.split('/').filter(Boolean)
  const { organizationIds, staffTypes } = useStore(
    (state) => state.staffResource,
  )
  const orgPracticeId = id || `${organizationIds?.[0]}`
  const navLinks = useMemo(
    () =>
      getManagementNavLinks(
        type,
        orgPracticeId,
        roleId,
        practiceId,
        locationId,
        staffTypes,
        segments,
      ),
    [type, orgPracticeId, roleId, practiceId],
  )
  return (
    <Box className="bg-white w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        <Flex direction="column">
          {navLinks.map((widget) => (
            <NavigationLink
              key={widget.label}
              href={widget.href}
              disabled={widget.disabled}
            >
              {widget.label}
            </NavigationLink>
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  )
}

interface NavigationLinkProps {
  href?: string
  disabled?: boolean
}

const NavigationLink = ({
  href,
  disabled,
  children,
}: React.PropsWithChildren<NavigationLinkProps>) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const practiceId = searchParams.get('practice')

  href = href ? href : `/management`

  const isActive = practiceId
    ? `${pathname}/?practice=${practiceId}` === href
    : pathname === href

  return (
    <NextLink
      prefetch={false}
      href={href}
      className={cn(
        'px-2 py-1 text-[11.5px] first:rounded-t-1 hover:bg-accent-2',
        {
          'text-white bg-accent-12 font-[600] hover:bg-accent-12': isActive,
        },
      )}
      onClick={(e) => {
        if (disabled) {
          e.preventDefault()
        }
      }}
    >
      {children}
    </NextLink>
  )
}

export { ManagementNavigation }
