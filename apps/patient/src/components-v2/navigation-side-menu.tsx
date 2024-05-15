'use client'

import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@psychplus-v2/utils'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { type LucideIcon } from 'lucide-react'

interface NavigationSideMenuProps {
  heading: string
  links: SideMenuLink[]
  containerClassName?: string
}

interface SideMenuLink {
  href: string
  label: string
  Icon: LucideIcon
}

const NavigationSideMenu = ({
  heading,
  links,
  containerClassName,
}: NavigationSideMenuProps) => {
  const pathname = usePathname()

  return (
    <Flex
      direction="column"
      className={cn('hidden sm:flex', containerClassName)}
    >
      <Heading mb="4" className="px-4 font-sans text-[26px] tracking-[.25px]">
        {heading}
      </Heading>
      <ul className="flex flex-col">
        <li>
          {links.map((link) => {
            const isActive = link.href === pathname

            return (
              <NextLink
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center gap-2 rounded-2 px-4 py-2 font-[500] tracking-[0.25px] hover:bg-accent-2',
                  {
                    'bg-accent-3 text-accent-12 hover:bg-accent-3': isActive,
                  },
                )}
              >
                <link.Icon
                  width={22}
                  height={22}
                  strokeWidth={1}
                  fill="white"
                />
                <Text className="text-[14px]">{link.label}</Text>
              </NextLink>
            )
          })}
        </li>
      </ul>
    </Flex>
  )
}

export { NavigationSideMenu }
