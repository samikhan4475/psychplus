import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'
import { getSlashedDateString } from '@/utils'

const PatientText = ({ visitDetails }: { visitDetails: Appointment }) => {
  const dob = getSlashedDateString(visitDetails?.dob)
  const value = [
    visitDetails?.name && `${visitDetails.name}`,
    visitDetails?.age && `${visitDetails.age} yo`,
    visitDetails?.gender && `${visitDetails.gender?.[0]}`,
    dob && `| ${dob}`,
    visitDetails?.patientMrn && `| ${visitDetails.patientMrn}`,
    visitDetails?.patientStatus && `| ${visitDetails.patientStatus}`,
  ]
    .filter(Boolean)
    .join(' ')
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Patient Name</FormFieldLabel>
      <TextField.Root size="1" value={value} disabled className="h-6" />
    </FormFieldContainer>
  )
}

export { PatientText }
