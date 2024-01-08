'use client'

import { useRef } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { usePatient } from '@psychplus/patient'
import { PATIENT_WIDGET } from '@psychplus/widgets'
import {
  usePublishLoaded,
  usePublishSize,
  useSubscribeClosePopover,
} from '@psychplus/widgets/hooks'
import { useStore } from './store'

const PatientWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)
  const patient = usePatient(useStore)

  usePublishLoaded(PATIENT_WIDGET)
  usePublishSize(PATIENT_WIDGET, ref)
  useSubscribeClosePopover(PATIENT_WIDGET)

  return (
    <Flex
      direction="column"
      p="3"
      width="100%"
      className="h-full min-w-fit"
      ref={ref}
    >
      <Text>
        This example widget will fetch and display the patient&apos;s name.
      </Text>
      <Text>
        <b>Patient:</b> {patient.legalName.firstName}
      </Text>
    </Flex>
  )
}

export { PatientWidgetClient }
