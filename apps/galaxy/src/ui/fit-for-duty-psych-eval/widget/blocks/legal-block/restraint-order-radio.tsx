'use client'

import { useFormContext } from 'react-hook-form'
import { DetailsField, RadioFieldWithError } from '../../components'
import { HAVE_OPTIONS } from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const RestraintOrderRadio = ({ disabled = false }: BlockProps) => {
  const { watch } = useFormContext<SchemaType>()
  const hasRestrainingOrder = watch('hasRestrainingOrder')
  return (
    <>
      <RadioFieldWithError
        field="hasRestrainingOrder"
        label="Patient has been the subject of a restraining order:"
        options={HAVE_OPTIONS}
        disabled={disabled}
        required
      />

      {hasRestrainingOrder === 'have' && (
        <DetailsField
          label="Describe the situation that led to this restraining order"
          field="restrainingOrderDetails"
          disabled={disabled}
          className="min-h-11"
          maxLength={500}
        />
      )}
    </>
  )
}
export { RestraintOrderRadio }
