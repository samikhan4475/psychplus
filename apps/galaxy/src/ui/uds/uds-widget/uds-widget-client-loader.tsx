'use client'

import { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { genericEventBus } from '@/lib/generic-event-bus'
import {
  GenericPayload,
  LabOrderResponseList,
  QuickNoteSectionItem,
} from '@/types'
import { getLabOrdersAction } from '@/ui/lab-orders/lab-orders-widget/client-action/get-lab-orders'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useStore } from '@/ui/quicknotes/store'
import { UdsWidget } from './uds-widget'

interface UdsWidgetLoaderProps {
  patientId: string
  data?: QuickNoteSectionItem[]
  isUdsTab?: boolean
}

const UdsWidgetClientLoader = ({
  patientId,
  data,
  isUdsTab = false,
}: UdsWidgetLoaderProps) => {
  const [eventLabOrders, setLabOrders] = useState<LabOrderResponseList>()
  const searchParams = useSearchParams()
  const { id } = useParams<{ id: string }>()
  const appointmentId = searchParams.get('id') ?? '0'

  const fetchLabOrders = async () => {
    const payload = { patientId: [id], appointmentIds: [appointmentId] }
    const response = await getLabOrdersAction({ appointmentId, payload })
    if (response.state === 'success') {
      const labOrdersData = {
        ...response.data,
        labOrders: response.data.labOrders,
      }
      setLabOrders(labOrdersData)
    }
  }

  useEffect(() => {
    if (!isUdsTab) {
      fetchLabOrders()
    }
    const handleEvent = (event?: GenericPayload) => {
      if (isUdsTab) return

      if (event?.type === 'lab-order') {
        fetchLabOrders()
      }
    }

    const eventKey = `${appointmentId}`
    genericEventBus.on(eventKey, handleEvent)

    return () => {
      genericEventBus.off(eventKey, handleEvent)
    }
  }, [appointmentId, isUdsTab])

  const diagnosisData = useStore(
    (state) =>
      state.actualNotewidgetsData[
        QuickNoteSectionName.QuickNoteSectionDiagnosis
      ],
  )
  if (!eventLabOrders && !isUdsTab) {
    return (
      <Flex height="100%" align="center" justify="center" className="mt-5">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <UdsWidget
      patientId={patientId}
      data={data}
      isUdsTab={isUdsTab}
      diagnosisData={diagnosisData}
      labOrdersData={eventLabOrders}
    />
  )
}

export { UdsWidgetClientLoader }
