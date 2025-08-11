'use client'

import { RadioFieldWithError } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { PATIENT_RESULT_CONFIG } from '@/ui/fit-for-duty-psych-eval/widget/constant'
import { BlockProps } from '@/ui/fit-for-duty-psych-eval/widget/types'

const ResultsOfPatientRadio = ({ disabled = false }: BlockProps) => {
  return (
    <>
      {PATIENT_RESULT_CONFIG.map(({ field, heading, options }) => (
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
export { ResultsOfPatientRadio }
