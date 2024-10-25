import { parseDate } from '@internationalized/date'
import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { NewPatient } from '@/types'
import { getAgeFromDate, getSlashedDateString } from '@/utils'

const PatientText = ({ patient }: { patient: NewPatient }) => {
  const {
    user: { legalName },
    dob = '',
    gender = '',
    patientMrn = '',
    patientStatus = '',
  } = patient
  const name = `${legalName.firstName} ${legalName.middleName} ${legalName.lastName}`
  const age = getAgeFromDate(parseDate(dob))
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Patient Name</FormFieldLabel>
      <TextField.Root
        size="1"
        value={`${name} ${age} yo ${gender[0] ?? ''} | ${getSlashedDateString(
          dob,
        )} | ${patientMrn} | ${patientStatus}`}
        disabled
        className="h-6"
      />
    </FormFieldContainer>
  )
}

export { PatientText }
