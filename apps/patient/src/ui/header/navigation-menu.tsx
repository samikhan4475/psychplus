'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { Box, Flex, Link, Text } from '@radix-ui/themes'

const NAV_LINKS = [
  {
    href: '/',
    label: 'Home',
  },
  {
    href: '/account/profile',
    label: 'My Account',
  },
  {
    href: '/health',
    label: 'Health',
  },
  {
    href: '/appointments/upcoming',
    label: 'Appointments',
  },
  // {
  //   href: '/care-plan',
  //   label: 'Care Plan',
  // },
  {
    href: '/billing/credit-debit-cards',
    label: 'Billing',
  },
  // {
  //   href: '/messages',
  //   label: 'Messages',
  // },
]

const NavigationMenu = () => {
  const pathname = usePathname()

  return (
    <nav className="hidden gap-2 sm:flex">
      {NAV_LINKS.map((link) => (
        <Link key={link.href} className="no-underline" asChild>
          <NextLink href={link.href}>
            <Flex
              position="relative"
              align="center"
              justify="center"
              px="2"
              className="py-[5px]"
            >
              <Text className={'text-[15px] font-[600] text-accent-12'}>
                {link.label}
              </Text>
              {link.href === pathname ||
              (link.href !== '/' && pathname.startsWith(link.href)) ? (
                <Box className="absolute bottom-0 h-[3px] w-[25px] bg-accent-12" />
              ) : null}
            </Flex>
          </NextLink>
        </Link>
      ))}
    </nav>
  )
}

export { NavigationMenu }
