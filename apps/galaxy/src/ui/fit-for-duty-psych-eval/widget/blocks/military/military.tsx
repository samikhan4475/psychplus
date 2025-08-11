'use client'

import { useFormContext } from 'react-hook-form'
import { BlockHeading } from '../../block-heading'
import { DetailsField, RadioFieldWithError } from '../../components'
import { DOES_OPTIONS } from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'

const Military = ({ disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const hasMilitaryExperience = watch('hasMilitaryExperience')
  return (
    <BlockHeading title="Military">
      <RadioFieldWithError
        field="hasMilitaryExperience"
        label="Patient has military experience."
        options={DOES_OPTIONS}
        disabled={disabled}
        onChange={(val) => {
          if (val !== 'does') {
            setValue('militaryBranch', '')
          }
        }}
        required
      />

      {hasMilitaryExperience === 'does' && (
        <DetailsField
          field="militaryBranch"
          label="Patient was enlisted in:"
          disabled={disabled}
          containerClassName="flex-row item-center"
          className="min-h-5 !max-w-96"
          maxLength={100}
        />
      )}
    </BlockHeading>
  )
}
export { Military }
