'use client'

import { Flex } from '@radix-ui/themes'
import { Appointment, QuickNoteSectionItem } from '@/types'
import { CodesWidget } from './codes-widget'
import { transformIn } from './data'

interface CodesWidgetLoaderProps {
  patientId: string
  appointmentId?: string
  isCodesHeader?: boolean
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const CodesWidgetClientLoader = ({
  patientId,
  appointmentId,
  isCodesHeader,
  appointment,
  data,
}: CodesWidgetLoaderProps) => {
  const initialValues = transformIn(data ?? [])

  return (
    <Flex direction="column" width="100%">
      <Flex direction="column" gap="2">
        <CodesWidget
          patientId={patientId}
          initialValues={initialValues}
          appointmentId={appointmentId}
          appointment={appointment}
          isCodesHeader={isCodesHeader}
        />
      </Flex>
    </Flex>
  )
}

export { CodesWidgetClientLoader }
