'use client'

import {
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
} from '@/components'
import { BlockHeading } from '../../block-heading'
import { PATIENT_DESCRIPTION_BLOCK_CONFIG } from '../../constant'
import { BlockProps } from '../../types'
import { PatientHeightInput } from './patient-height-input'
import { PatientWidthInput } from './patient-width-input'

const PatientDescription = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Patient description">
      {PATIENT_DESCRIPTION_BLOCK_CONFIG.map(({ field, heading, options }) => (
        <FormFieldContainer key={field} className="flex-row items-center gap-1">
          <RadioSelectSection
            label={heading}
            field={field}
            options={options}
            disabled={disabled}
            required
            errorField={field}
            shouldTriggerOnChange
          />
          <FormFieldError name={field} />
        </FormFieldContainer>
      ))}

      <PatientHeightInput disabled={disabled} />
      <PatientWidthInput disabled={disabled} />
    </BlockHeading>
  )
}
export { PatientDescription }
