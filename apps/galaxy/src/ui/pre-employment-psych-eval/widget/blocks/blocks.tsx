'use client'

import { Flex } from '@radix-ui/themes'
import {
  Legal,
  PatientDescription,
} from '@/ui/fit-for-duty-psych-eval/widget/blocks'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { AlcoholDrugs } from './alcohol-and-drugs'
import { PreEmployement } from './employment'
import { PreEvaluationBlock } from './evaluation'
import { PrePatientInformation } from './patient-information'
import { PreFamilyHistory } from './pre-family-history'
import { PreHealth } from './pre-health'
import { PrePatientAppointmentDetails } from './pre-patient-appointment-details'
import { ResultsOfAssessment } from './results-of-assessment'

const Blocks = ({ disabled = false }: BlockProps) => {
  return (
    <Flex direction="column" gap="2" className="pr-2">
      <PreEvaluationBlock disabled={disabled} />
      <PatientDescription disabled={disabled} />
      <PrePatientAppointmentDetails disabled={disabled} />
      <PrePatientInformation disabled={disabled} />
      <PreFamilyHistory disabled={disabled} />
      <PreEmployement disabled={disabled} />
      <PreHealth disabled={disabled} />
      <Legal disabled={disabled} />
      <AlcoholDrugs disabled={disabled} />
      <ResultsOfAssessment disabled={disabled} />
    </Flex>
  )
}
export { Blocks }
