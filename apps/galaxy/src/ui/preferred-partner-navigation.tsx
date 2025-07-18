'use client'

import { useMemo } from 'react'
import NextLink from 'next/link'
import { useParams, usePathname, useSearchParams } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { cn, getPreferredPartnerNavLinks } from '@/utils'

const PreferredPartnerNavigation = () => {
  const { id } = useParams<{
    id: string
  }>()

  const navLinks = useMemo(
    () => getPreferredPartnerNavLinks({ ppId: id }),
    [id],
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
  const id = searchParams.get('id')

  const link = href ?? `/preferred-partner`

  const isActive = id ? `${pathname}/${id}` === link : pathname === link

  return (
    <NextLink
      prefetch={false}
      href={link}
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

export { PreferredPartnerNavigation }
