'use client'

import { useMemo } from 'react'
import NextLink from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { cn, getManagementNavLinks } from '@/utils'

const ManagementNavigation = () => {
  const { id, type, roleId } = useParams<{
    id: string
    type: string
    roleId: string
  }>()
  const searchParams = useSearchParams()
  const practiceId = searchParams.get('practice')
  const navLinks = useMemo(
    () => getManagementNavLinks(type, id, roleId, practiceId),
    [type, id, roleId, practiceId],
  )
  return (
    <Box className="bg-white w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        <Flex direction="column">
          {navLinks.map((widget) => (
            <NavigationLink key={widget.label} href={widget.href}>
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
}

const NavigationLink = ({
  href,
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
      href={href}
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

export { ManagementNavigation }
