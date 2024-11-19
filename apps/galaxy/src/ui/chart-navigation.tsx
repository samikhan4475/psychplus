'use client'

import { useMemo } from 'react'
import NextLink from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { cn, getNavLinks } from '@/utils'

const ChartNavigation = () => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')
  const visitType = searchParams.get('visitType')
  const visitSequence = searchParams.get('visitSequence')

  const navLinks = useMemo(() => getNavLinks(appointmentId), [appointmentId])
  return (
    <Box className="bg-white mb-4 w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        <Flex direction="column">
          {navLinks.map((widget) => (
            <NavigationLink
              key={widget.label}
              href={widget.href}
              appointmentId={appointmentId}
              visitType={visitType}
              visitSequence={visitSequence}
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
  appointmentId: string | null
  visitType: string | null
  visitSequence: string | null
}

const NavigationLink = ({
  href,
  appointmentId,
  visitType,
  visitSequence,
  children,
}: React.PropsWithChildren<NavigationLinkProps>) => {
  const pathname = usePathname()
  const { id } = useParams<{ id: string }>()

  href = href ? `/chart/${id}${href}` : `/chart/${id}`

  const isActive = pathname === href

  return (
    <NextLink
      href={
        appointmentId
          ? `${href}?id=${appointmentId}&visitType=${visitType}&visitSequence=${visitSequence}`
          : href
      }
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

export { ChartNavigation }
