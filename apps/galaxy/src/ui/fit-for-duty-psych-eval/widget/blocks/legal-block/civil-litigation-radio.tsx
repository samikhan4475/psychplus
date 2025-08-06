'use client'

import { useFormContext } from 'react-hook-form'
import { DetailsField, RadioFieldWithError } from '../../components'
import { HAS_OPTIONS } from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const CivilLitigationRadio = ({ disabled = false }: BlockProps) => {
  const { watch } = useFormContext<SchemaType>()
  const hasCivilLitigation = watch('hasCivilLitigation')
  return (
    <>
      <RadioFieldWithError
        field="hasCivilLitigation"
        label="Patient has been involved in civil litigation."
        options={HAS_OPTIONS}
        disabled={disabled}
        required
      />

      {hasCivilLitigation === 'has' && (
        <DetailsField
          label="Describe the situation that led to this litigation"
          field="civilLitigationDetails"
          disabled={disabled}
          className="min-h-11"
          maxLength={500}
        />
      )}
    </>
  )
}
export { CivilLitigationRadio }
