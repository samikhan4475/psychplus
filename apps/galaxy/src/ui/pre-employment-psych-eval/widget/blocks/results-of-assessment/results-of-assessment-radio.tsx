'use client'

import { RadioFieldWithError } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { RESULTS_OF_ASSESSMENT_CONFIG } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const ResultsOfAssessmentRadio = ({ disabled = false }: BlockProps) => {
  return (
    <>
      {RESULTS_OF_ASSESSMENT_CONFIG.map(({ field, heading, options }) => (
        <RadioFieldWithError
          key={field}
          label={heading}
          field={field}
          options={options}
          disabled={disabled}
          required
        />
      ))}
    </>
  )
}
export { ResultsOfAssessmentRadio }
