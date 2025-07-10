'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { useStore } from '../store'
import { AuthorizationInformation } from './authorization-information'
import { DoseInformation } from './dose-information'
import { DurationInformation } from './duration-information'
import { NotesInformation } from './notes-information'
import { PharmacyInformation } from './pharmacy-information'
import { PrescriberInformation } from './prescriber-information'
import { RouteInformation } from './route-information'
import { UpdateMedicationSchema } from './schema'
import { SigInformation } from './sig-information'

interface PatientMedicationFormProps {
  index: number
}

const PatientMedicationForm = ({ index }: PatientMedicationFormProps) => {
  const form = useFormContext<UpdateMedicationSchema>()
  const rxChangeRequestCode = form.getValues('rxChangeRequestCode')
  const { activeTab } = useStore()
  const isRefillTab = activeTab.includes('Refill')
  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      <DoseInformation index={index} />
      <RouteInformation index={index} />
      <DurationInformation index={index} />
      <SigInformation index={index} />
      <PharmacyInformation index={index} />
      <PrescriberInformation index={index} />
      <NotesInformation index={index} />
      {rxChangeRequestCode === 'PriorAuthorizationRequired' || isRefillTab ? (
        <AuthorizationInformation index={index} />
      ) : null}
    </Flex>
  )
}

export { PatientMedicationForm }
