'use client'

import { Flex } from '@radix-ui/themes'
import { DoseInformation } from './dose-information'
import { DurationInformation } from './duration-information'
import { NotesInformation } from './notes-information'
import { PharmacyInformation } from './pharmacy-information'
import { PrescriberInformation } from './prescriber-information'
import { RouteInformation } from './route-information'
import { SigInformation } from './sig-information'

interface PatientMedicationFormProps {
  index: number
}

const PatientMedicationForm = ({ index }: PatientMedicationFormProps) => {
  return (
    <Flex className="bg-whiteA-12 mt-2" gap="2" direction="column">
      <DoseInformation index={index} />
      <RouteInformation index={index} />
      <DurationInformation index={index} />
      <SigInformation index={index} />
      <PharmacyInformation index={index} />
      <PrescriberInformation index={index} />
      <NotesInformation index={index} />
    </Flex>
  )
}

export { PatientMedicationForm }
