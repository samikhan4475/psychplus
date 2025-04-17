import NextLink from 'next/link'
import { CaretRightIcon } from '@radix-ui/react-icons'
import { Flex, Text } from '@radix-ui/themes'
import { ShieldAlertIcon, ShieldCheckIcon } from 'lucide-react'
import { FeatureEmpty, TriggerButton } from '@/components-v2'
import { Insurance } from '../../payments/types'

interface InsuranceSummaryProps {
  data?: Insurance
}

const InsuranceSummary = ({ data }: InsuranceSummaryProps) => {
  if (!data?.policies) {
    return (
      <FeatureEmpty
        title="No Insurance Added"
        action={
          <Flex className="justify-center">
            <NextLink href="/billing/insurance">
              <TriggerButton title="Add Insurance" className="justify-center" />
            </NextLink>
          </Flex>
        }
        Icon={ShieldAlertIcon}
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
        <ShieldCheckIcon
          width={30}
          height={30}
          strokeWidth={1.25}
          fill="white"
          className="text-accent-12"
        />
      </Flex>
      <Flex direction="column" align="start" className="flex-1">
        <Flex direction="column" gap="1">
          <Text className="text-[18px] font-[500] leading-3 text-accent-12">
            {data?.policies?.[0].payerName}
          </Text>
        </Flex>
        <NextLink
          href="/billing/insurance"
          className="flex items-center py-2 pl-0 text-[13px] text-accent-12 underline-offset-4 hover:underline"
        >
          Update insurance
          <CaretRightIcon width={18} height={18} />
        </NextLink>
      </Flex>
    </Flex>
  )
}

export { InsuranceSummary }
