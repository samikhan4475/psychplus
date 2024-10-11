import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'
import { getSlashedDateString } from '@/utils'

const PatientText = ({ visitDetails }: { visitDetails: Appointment }) => {
  const dob = getSlashedDateString(visitDetails.dob)
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Patient Name</FormFieldLabel>
      <TextField.Root
        size="1"
        value={`${visitDetails.name} ${visitDetails.age} yo ${visitDetails.gender[0]} | ${dob} | ${visitDetails.patientMrn} | ${visitDetails.patientStatus}`}
        disabled
        className="h-[21px]"
      />
    </FormFieldContainer>
  )
}

export { PatientText }
