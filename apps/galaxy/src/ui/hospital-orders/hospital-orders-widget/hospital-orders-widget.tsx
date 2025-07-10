'use client'

import { Flex, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'
import { LabsAndOrderTab } from './labs-and-orders'

interface HospitalWidgetProps {
  patientId: string
  data?: QuickNoteSectionItem[]
  title?: string
}

const HospitalWidget = ({
  title = 'Labs & Orders',
  patientId,
  data,
}: HospitalWidgetProps) => {
  return (
    <Flex direction="column">
      <Flex width="100%" direction="column" gap="2" p="2" className="bg-white">
        <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>

        <LabsAndOrderTab patientId={patientId} data={data} />
      </Flex>
    </Flex>
  )
}

export { HospitalWidget }
