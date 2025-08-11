'use client'

import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import { PATIENT_DESCRIPTION_BLOCK_CONFIG } from '../../constant'
import { BlockProps } from '../../types'
import { PatientHeightInput } from './patient-height-input'
import { PatientWeightInput } from './patient-weight-input'

const PatientDescription = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Patient description">
      {PATIENT_DESCRIPTION_BLOCK_CONFIG.map(({ field, heading, options }) => (
        <RadioFieldWithError
          key={field}
          label={heading}
          field={field}
          options={options}
          disabled={disabled}
          required
        />
      ))}

      <PatientHeightInput disabled={disabled} />
      <PatientWeightInput disabled={disabled} />
    </BlockHeading>
  )
}
export { PatientDescription }
