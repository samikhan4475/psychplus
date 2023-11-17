'use client'

import { usePathname } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'

interface NavigationMenuLink {
  href: string
}

const NavigationMenuLink = ({
  href,
  children,
}: React.PropsWithChildren<NavigationMenuLink>) => {
  const pathname = usePathname()

  const active = pathname === href

  return (
    <Box
      py="1"
      className={cn('rounded-item px-3', {
        'bg-accent-4': active,
        'hover:underline': !active,
      })}
    >
      <Text size="2" weight={active ? 'bold' : 'regular'}>
        {children}
      </Text>
    </Box>
  )
}

export { NavigationMenuLink }
