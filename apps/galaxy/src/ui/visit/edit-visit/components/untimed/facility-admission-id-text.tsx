import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'
import { getSlashedDateString } from '@/utils'

const FacilityAdmissionText = ({
  visitDetails,
}: {
  visitDetails: Appointment
}) => {
  let text = `${visitDetails.facilityAdmissionId}`
  if (visitDetails.dateOfAdmission)
    text += ` | ${getSlashedDateString(visitDetails.dateOfAdmission)}`
  if (visitDetails.locationName) text += ` | ${visitDetails.locationName}`
  if (visitDetails.service) text += `/ ${visitDetails.service}`
  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Facility Admission ID</FormFieldLabel>
      <TextField.Root size="1" disabled className="h-6 w-full" value={text} />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionText }
