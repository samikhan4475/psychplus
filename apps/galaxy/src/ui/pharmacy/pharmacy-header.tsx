'use client'

import { Flex, Text } from '@radix-ui/themes'
import { WidgetAddButton } from '@/components'
import { PharmacyAddButton } from './pharmacy-add-button'

const PharmacyHeader = ({ scriptSureAppUrl }: { scriptSureAppUrl: string }) => {
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white px-2 py-1 pr-3 shadow-2"
    >
      <Text className="flex items-center gap-x-[11px] text-[20px] font-bold">
        Pharmacy
      </Text>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <WidgetAddButton title="Add Pharmacy">
          <PharmacyAddButton scriptSureAppUrl={scriptSureAppUrl} />
        </WidgetAddButton>
      </Flex>
    </Flex>
  )
}

export { PharmacyHeader }
