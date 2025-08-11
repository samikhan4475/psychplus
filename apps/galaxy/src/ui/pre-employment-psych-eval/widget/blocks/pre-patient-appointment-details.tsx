'use client'

import { BlockHeading } from '@/ui/fit-for-duty-psych-eval/widget/block-heading'
import { RadioFieldWithError } from '@/ui/fit-for-duty-psych-eval/widget/components'
import { PATIENT_APPOINTMENT_DETAILS_CONFIG } from '@/ui/fit-for-duty-psych-eval/widget/constant'

const PrePatientAppointmentDetails = ({ disabled = false }) => {
  return (
    <BlockHeading title="Patient appointment details">
      {PATIENT_APPOINTMENT_DETAILS_CONFIG.map(({ field, heading, options }) => (
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

export { PrePatientAppointmentDetails }
