'use client'

import React from 'react'
import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'
import { ResultsOfAssessmentHeading } from './results-of-assessment-heading'
import { ResultsOfAssessmentRadio } from './results-of-assessment-radio'
import { ResultsOfPatientRadio } from './results-of-patient-radio'

const ResultsOfAssessment = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Results of Assessment">
      <ResultsOfPatientRadio disabled={disabled} />
      <ResultsOfAssessmentHeading />
      <ResultsOfAssessmentRadio disabled={disabled} />
    </BlockHeading>
  )
}

export { ResultsOfAssessment }
