'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { LabOrders } from '@/types'
import { getLabOrdersAction } from '@/ui/lab-orders/lab-orders-widget/actions'
import { Details } from './details'

type LabOrderClientNoteProps = {
  patientId: string
  appointmentId: string
}

const LabOrderClientNote = ({
  patientId,
  appointmentId,
}: LabOrderClientNoteProps) => {
  const [response, setResponse] = useState<LabOrders[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const payload = {
        patientId: [patientId],
        appointmentIds: [appointmentId],
        resourceStatusList: ['Active'],
        isIncludeAppointments:true
      }
      const result = await getLabOrdersAction({
        appointmentId,
        payload,
        limit: 0,
      })
      setLoading(false)
      if (result.state === 'error') {
        return
      }
      if (result.data?.labOrders?.length) {
        setResponse(result.data?.labOrders)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return <Details data={response} />
}

export { LabOrderClientNote }
