import NextLink from 'next/link'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { CheckCheckIcon, ReceiptTextIcon } from 'lucide-react'
import { FeatureEmpty } from '@/components-v2'
import type { PaymentDue } from '../../types'

interface PaymentSummaryProps {
  data: PaymentDue[]
}

const PaymentSummary = ({ data }: PaymentSummaryProps) => {
  if (data.length === 0) {
    return (
      <FeatureEmpty
        title="No Payment Due, Hooray!"
        action={
          <NextLink
            href="/billing/payments"
            className="flex items-center text-[14px] text-accent-12 underline-offset-4 hover:underline"
          >
            View payment history
            <CaretRightIcon width={18} height={18} />
          </NextLink>
        }
        Icon={CheckCheckIcon}
      />
    )
  }

  return (
    <Flex align="start" gap="4">
      <Flex
        align="center"
        justify="center"
        className="rounded-full mt-[2px] h-[60px] w-[60px] min-w-[30px] bg-accent-3"
      >
        <ReceiptTextIcon
          width={30}
          height={30}
          strokeWidth={1.25}
          fill="white"
          className="text-accent-12"
        />
      </Flex>
      <Flex direction="column" align="start" className="flex-1">
        <Text className="text-[18px] font-[600] leading-3 text-accent-12">
          You have a payment due
        </Text>
        <NextLink
          href="/billing/payments"
          className="flex items-center p-2 pl-1 text-[13px] text-accent-12 underline-offset-4 hover:underline"
        >
          Review bills
          <CaretRightIcon width={18} height={18} />
        </NextLink>
      </Flex>
    </Flex>
  )
}

export { PaymentSummary }
