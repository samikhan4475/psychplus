'use client'

import { Flex } from '@radix-ui/themes'
import { CrossIcon, WalletIcon } from 'lucide-react'
import {
  CreditDebitCardIcon,
  NavigationSideMenu,
  ViewContainer,
} from '@/components-v2'

const LINKS = [
  {
    href: '/billing/credit-debit-cards',
    label: 'Credit/Debit Card',
    Icon: CreditDebitCardIcon,
  },
  {
    href: '/billing/payments',
    label: 'Payments',
    Icon: WalletIcon,
  },
  {
    href: '/billing/membership',
    label: 'Membership',
    Icon: CrossIcon,
  },
]

const BillingLayout = ({ children }: { children: React.ReactNode }) => (
  <ViewContainer className="max-w-[1200px] xs:px-5">
    <Flex gap="5" className="">
      <NavigationSideMenu heading="Billing" links={LINKS} />
      <Flex direction="column" className="flex-1">
        {children}
      </Flex>
    </Flex>
  </ViewContainer>
)

export default BillingLayout
