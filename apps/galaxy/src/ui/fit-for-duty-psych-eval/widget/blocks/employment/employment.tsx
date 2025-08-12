'use client'

import { useFormContext } from 'react-hook-form'
import { BlockHeading } from '../../block-heading'
import { DetailsField, RadioFieldWithError } from '../../components'
import { EMPLOYMENT_HAND_GUN_DESCRIPTION, HAVE_OPTIONS } from '../../constant'
import { SchemaType } from '../../schema'
import { BlockProps } from '../../types'
import { EmploymentDepartmentInput } from './employment-department-input'
import { EmploymentPriorInput } from './employment-prior-input'
import { PositionInput } from './position-input'

const Employment = ({ disabled = false }: BlockProps) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const hadDisciplinary = watch('hadDisciplinary')
  return (
    <BlockHeading title="Employment">
      <EmploymentDepartmentInput disabled={disabled} />
      <EmploymentPriorInput disabled={disabled} />
      <PositionInput disabled={disabled} />

      <RadioFieldWithError
        label="They have had disciplinary write-ups/actions while employed."
        field="hadDisciplinary"
        options={HAVE_OPTIONS}
        disabled={disabled}
        onChange={(val) => {
          if (val !== 'have') {
            setValue('disciplinaryIncident', '')
          }
        }}
        required
      />

      {hadDisciplinary === 'have' && (
        <DetailsField
          label="Describe the incident that led to reprimand"
          field="disciplinaryIncident"
          disabled={disabled}
          className="min-h-16"
          maxLength={1200}
        />
      )}
      <DetailsField
        label={EMPLOYMENT_HAND_GUN_DESCRIPTION}
        field="handgunDescription"
        disabled={disabled}
        maxLength={1000}
        className="min-h-16"
      />
    </BlockHeading>
  )
}
export { Employment }
