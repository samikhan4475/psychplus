import React from 'react'
import NextLink from 'next/link'
import * as Accordion from '@radix-ui/react-accordion'
import { Flex, Text } from '@radix-ui/themes'
import {
  AlertTriangleIcon,
  ChevronDownIcon,
  CircleDollarSignIcon,
  CrossIcon,
  FlaskConicalIcon,
  HeartPulseIcon,
  ListChecksIcon,
  NotebookTextIcon,
  PillIcon,
  ScaleIcon,
  Settings2Icon,
  ShieldPlusIcon,
  StethoscopeIcon,
  StoreIcon,
  UserCircleIcon,
  WalletIcon,
  type LucideIcon,
} from 'lucide-react'
import { useStore } from './store'

const ResponsiveMenuLinks = () => {
  const { responsiveMenuExpandedState, setResponsiveMenuExpandedState } =
    useStore((state) => ({
      responsiveMenuExpandedState: state.responsiveMenuExpandedState,
      setResponsiveMenuExpandedState: state.setResponsiveMenuExpandedState,
    }))

  return (
    <Accordion.Root
      type="multiple"
      value={responsiveMenuExpandedState}
      onValueChange={setResponsiveMenuExpandedState}
    >
      {/* <MenuItem value="messages" label="Messages" href="/messages" /> */}
      {/* <MenuItem
        value="appointments"
        label="Appointments"
        href="/appointments"
      /> */}
      <MenuItem
        value="health"
        label="Health"
        links={[
          { label: 'Medications', href: '/health/medications', Icon: PillIcon },
          // {
          //   label: 'Lab Results',
          //   href: '/health/lab-results',
          //   Icon: FlaskConicalIcon,
          // },
          // { label: 'Vitals', href: '/health/vitals', Icon: HeartPulseIcon },
          // {
          //   label: 'Allergies',
          //   href: '/health/allergies',
          //   Icon: AlertTriangleIcon,
          // },
          // {
          //   label: 'Pharmacy',
          //   href: '/health/pharmacy',
          //   Icon: StoreIcon,
          // },
        ]}
      />
      {/* <MenuItem
        value="care-plan"
        label="Care Plan"
        links={[
          {
            label: 'Action Items',
            href: '/care-plan/action-items',
            Icon: ListChecksIcon,
          },
          {
            label: 'Care Team',
            href: '/care-plan/care-team',
            Icon: StethoscopeIcon,
          },
          {
            label: 'Visit Notes',
            href: '/care-plan/visit-notes',
            Icon: NotebookTextIcon,
          },
        ]}
      /> */}
      <MenuItem
        value="account"
        label="Account"
        links={[
          {
            label: 'Profile',
            href: '/account/profile',
            Icon: UserCircleIcon,
          },
          // {
          //   label: 'Preferences',
          //   href: '/account/preferences',
          //   Icon: Settings2Icon,
          // },
          {
            label: 'Security',
            href: '/account/security',
            Icon: ShieldPlusIcon,
          },
          // {
          //   label: 'Policies & Consent',
          //   href: '/account/policies',
          //   Icon: ScaleIcon,
          // },
        ]}
      />

      <MenuItem
        value="billing"
        label="Billing"
        links={[
          {
            label: 'Payments',
            href: '/billing/payments',
            Icon: ListChecksIcon,
          },
          // {
          //   label: 'Insurance',
          //   href: '/billing/payments',
          //   Icon: CircleDollarSignIcon,
          // },
          {
            label: 'Membership',
            href: '/billing/membership',
            Icon: CrossIcon,
          },
          // {
          //   label: 'Payment Methods',
          //   href: '/billing/payments',
          //   Icon: WalletIcon,
          // },
        ]}
      />
    </Accordion.Root>
  )
}

interface NavLink {
  href: string
  label: string
  Icon: LucideIcon
}

interface MenuItemProps {
  value: string
  label: string
  href?: string
  links?: NavLink[]
}

const MenuItem = ({ value, href, label, links }: MenuItemProps) => {
  const { isOpen, closeMenu } = useStore((state) => ({
    isOpen: state.responsiveMenuOpen,
    closeMenu: state.closeMenu,
  }))

  const content = (
    <Accordion.Item value={value}>
      <Accordion.Trigger
        tabIndex={isOpen && links ? undefined : -1}
        className="group flex h-[48px] w-full items-center justify-between gap-2 border-b border-b-gray-5 px-4 hover:bg-accent-1 hover:text-accent-12 focus:outline-accent-9"
      >
        <Text weight="medium" className="text-[14px]">
          {label}
        </Text>
        {links ? (
          <ChevronDownIcon
            width={32}
            height={32}
            strokeWidth={1}
            className="transition-transform duration-150 ease-[cubic-bezier(0.87,_0,_0.13,_1)] group-data-[state=open]:rotate-180"
            aria-hidden
          />
        ) : null}
      </Accordion.Trigger>
      {links ? (
        <Accordion.Content className="data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp bg-white overflow-hidden py-[2px]">
          {links.map((link) => (
            <NextLink
              key={link.href}
              href={link.href}
              onClick={() => {
                closeMenu()
              }}
              className="focus:outline-accent-9"
            >
              <Flex
                align="center"
                px="6"
                gap="3"
                className="h-[48px] border-b border-b-gray-5 hover:bg-accent-1 hover:text-accent-12"
              >
                <link.Icon
                  width={20}
                  height={20}
                  strokeWidth={1}
                  fill="white"
                  className="text-accent-12"
                />
                <Text weight="medium" className="text-[14px]">
                  {link.label}
                </Text>
              </Flex>
            </NextLink>
          ))}
        </Accordion.Content>
      ) : null}
    </Accordion.Item>
  )

  return href ? (
    <NextLink
      href={href}
      tabIndex={isOpen ? undefined : -1}
      className="focus:outline-accent-9"
    >
      {content}
    </NextLink>
  ) : (
    content
  )
}

export { ResponsiveMenuLinks }
