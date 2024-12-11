'use client'

import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { LabsAndOrderTab } from './labs-and-orders'

interface HospitalWidgetProps {
  patientId: string
  data: QuickNoteSectionItem[]
}

const HospitalWidget = ({ patientId, data }: HospitalWidgetProps) => {
  return (
    <Flex direction="column" gap="1">
      <Flex
        width="100%"
        justify="between"
        align="center"
        p="2"
        className="bg-white -mt-[1px] border border-gray-5"
      >
        <Text className="text-[16px] font-[600] text-accent-12">
          Labs & Orders
        </Text>
      </Flex>
      <LabsAndOrderTab patientId={patientId} data={data} />
    </Flex>
  )
}

export { HospitalWidget }
