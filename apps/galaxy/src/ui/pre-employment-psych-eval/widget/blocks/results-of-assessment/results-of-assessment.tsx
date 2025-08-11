'use client'

import React from 'react'
import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { ResultsOfAssessmentInput } from './results-of-assessment-input'
import { ResultsOfAssessmentRadio } from './results-of-assessment-radio'
import { ResultsOfPatientRadio } from './results-of-patient-radio'

const ResultsOfAssessment = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Results of Assessment">
      <ResultsOfPatientRadio disabled={disabled} />
      <ResultsOfAssessmentInput disabled={disabled} />
      <ResultsOfAssessmentRadio disabled={disabled} />
    </BlockHeading>
  )
}

export { ResultsOfAssessment }
