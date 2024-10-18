'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Flex, ScrollArea } from '@radix-ui/themes'
import { cn } from '@/utils'

const ManagementNavigation = () => {
  return (
    <Box className="bg-white mb-4 w-[160px] rounded-1 shadow-2">
      <ScrollArea>
        <Flex direction="column">
          <NavigationLink href="/coding">Coding</NavigationLink>
          <NavigationLink href="/clearinghouse">
            Clearing House Setup
          </NavigationLink>
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

  href = href ? `/management${href}` : `/management`

  const isActive = pathname === href

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
