'use client'

import {
  FormFieldContainer,
  FormFieldError,
  RadioSelectSection,
} from '@/components'
import { BlockHeading } from '../../block-heading'
import { PATIENT_APPOINTMENT_BLOCK_CONFIG } from '../../constant'

const PatientAppointmentDetails = ({ disabled = false }) => {
  return (
    <BlockHeading title="Patient appointment details">
      {PATIENT_APPOINTMENT_BLOCK_CONFIG.map(({ field, heading, options }) => (
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
    </BlockHeading>
  )
}

export { PatientAppointmentDetails }
