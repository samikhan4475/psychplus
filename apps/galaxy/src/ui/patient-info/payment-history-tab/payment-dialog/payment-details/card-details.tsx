'use client'

import { ReactNode } from 'react'
import { Flex, Strong, Text } from '@radix-ui/themes'
import { CreditCardIcon } from 'lucide-react'
import { FormFieldContainer } from '@/components'
import {
  AmericanExpressCardIcon,
  DinersClubCardIcon,
  DiscoverCardIcon,
  JCBCardIcon,
  MasterCardIcon,
  UnionPayCardIcon,
  VisaCardIcon,
} from '@/components/icons'
import { CreditCardType } from '@/constants'
import { CreditCard } from '@/types'

interface CardDetailsProps {
  primaryCard?: CreditCard
}

const CardDetails = ({ primaryCard }: CardDetailsProps) => {
  if (!primaryCard)
    return (
      <Text className="flex-1 self-end pb-0.5 text-center text-2 font-medium">
        No Card Data Found
      </Text>
    )
  return (
    <FormFieldContainer className="h-full w-full pt-5">
      <Flex
        className="h-6 w-full rounded-1 border border-solid border-blue-6"
        px="2"
        py="1"
        justify="between"
        align="center"
      >
        {Icons?.[primaryCard?.cardType] ?? (
          <CreditCardIcon width={20} height={20} />
        )}
        <Text size="1" className="text-pp-black-3">
          ***********{primaryCard?.numberLastFour}
        </Text>
        <Text size="1" className="text-pp-black-3">
          {primaryCard?.name}
        </Text>
        <Text size="1" className="text-pp-black-3">
          <Strong>Exp. Date </Strong>
          {primaryCard?.expireMonth}/{primaryCard?.expireYear}
        </Text>
      </Flex>
    </FormFieldContainer>
  )
}

const Icons: Record<CreditCardType, ReactNode> = {
  Visa: <VisaCardIcon />,
  AmericanExpress: <AmericanExpressCardIcon />,
  Discover: <DiscoverCardIcon />,
  MasterCard: <MasterCardIcon />,
  DinersClub: <DinersClubCardIcon />,
  Jcb: <JCBCardIcon />,
  UnionPay: <UnionPayCardIcon />,
}
export { CardDetails }
