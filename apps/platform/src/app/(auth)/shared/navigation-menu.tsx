'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'

interface MenuItem {
  label: string
  href: string
}

const NavigationMenu = ({ items }: { items: MenuItem[] }) => {
  const pathname = usePathname()

  return items.map((item) => {
    const active = pathname === item.href

    return (
      <Link
        key={item.href}
        href={item.href}
        className={cn('rounded-lg px-3', {
          'bg-slate-100': active,
          'hover:underline': !active,
        })}
      >
        <Box py="1">
          <Text size="2" weight={active ? 'bold' : 'regular'}>
            {item.label}
          </Text>
        </Box>
      </Link>
    )
  })
}

export { NavigationMenu, type MenuItem }
