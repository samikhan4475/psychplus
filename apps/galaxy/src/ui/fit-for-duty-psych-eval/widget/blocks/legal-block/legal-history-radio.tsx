'use client'

import { useFormContext } from 'react-hook-form'
import { DetailsField, RadioFieldWithError } from '../../components'
import { DOES_OPTIONS } from '../../constant'
import { BlockProps } from '../../types'

const LegalHistoryRadio = ({ disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext()
  const hasLegalHistory = watch('hasLegalHistory')
  return (
    <>
      <RadioFieldWithError
        field="hasLegalHistory"
        label="Patient has a history of legal difficulties."
        options={DOES_OPTIONS}
        disabled={disabled}
        onChange={(val) => {
          if (val !== 'does') {
            setValue('legalHistoryDetails', '')
          }
        }}
        required
      />

      {hasLegalHistory === 'does' && (
        <DetailsField
          label="Describe the legal difficulties the patient has faced:"
          field="legalHistoryDetails"
          disabled={disabled}
          className="min-h-11"
          maxLength={500}
        />
      )}
    </>
  )
}
export { LegalHistoryRadio }
