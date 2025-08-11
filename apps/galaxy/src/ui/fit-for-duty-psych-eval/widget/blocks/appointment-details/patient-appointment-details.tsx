'use client'

import { BlockHeading } from '../../block-heading'
import { RadioFieldWithError } from '../../components'
import { PATIENT_APPOINTMENT_BLOCK_CONFIG } from '../../constant'

const PatientAppointmentDetails = ({ disabled = false }) => {
  return (
    <BlockHeading title="Patient appointment details">
      {PATIENT_APPOINTMENT_BLOCK_CONFIG.map(({ field, heading, options }) => (
        <RadioFieldWithError
          key={field}
          label={heading}
          field={field}
          options={options}
          disabled={disabled}
          required
        />
      ))}
    </BlockHeading>
  )
}

export { PatientAppointmentDetails }
