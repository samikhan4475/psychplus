'use client'

import { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { getQuickNoteDetailAction } from '@/actions/get-quicknote-detail'
import { genericEventBus } from '@/lib/generic-event-bus'
import { QuickNoteSectionItem } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { LabsAndOrderTab } from './labs-and-orders'
import { HistoryButton } from './labs-and-orders/history'

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
  const [hospitalOrderData, setHospitalOrderData] = useState(data)

  useEffect(() => {
    setHospitalOrderData(data)
  }, [data])

  useEffect(() => {
    const handleUdsUpdated = async () => {
      const response = await getQuickNoteDetailAction(patientId, [
        QuickNoteSectionName.QuickNoteSectionHospitalOrders,
      ])
      if (response.state === 'success') setHospitalOrderData(response.data)
    }

    genericEventBus.on('lab-and-orders-updated-tab', handleUdsUpdated)

    return () => {
      genericEventBus.off('lab-and-orders-updated-tab', handleUdsUpdated)
    }
  }, [patientId])

  return (
    <Flex direction="column">
      <Flex width="100%" direction="column" gap="2" p="2" className="bg-white">
        <Flex justify="between" align="center">
          <Text className="text-[16px] font-[600] text-accent-12">{title}</Text>
          <HistoryButton
            sectionName={QuickNoteSectionName.QuickNoteSectionHospitalOrders}
          />
        </Flex>

        <LabsAndOrderTab patientId={patientId} data={hospitalOrderData} />
      </Flex>
    </Flex>
  )
}

export { HospitalWidget }
