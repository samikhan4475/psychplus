import { parseDate } from '@internationalized/date'
import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { NewPatient } from '@/types'
import { getAgeFromDate } from '@/utils'

const PatientText = ({ patient }: { patient: NewPatient }) => {
  const {
    user: { legalName },
    dob = '',
    gender = '',
    patientMrn = '',
    patientStatus = '',
  } = patient
  const name = `${legalName.firstName} ${
    legalName.middleName ? legalName.middleName + ' ' : ''
  }${legalName.lastName}`
  const age = dob ? getAgeFromDate(parseDate(dob)) : ''
  const value = [
    name && `${name}`,
    age && `${age} yo`,
    gender && `${gender[0]}`,
    dob && `| ${dob}`,
    patientMrn && `| ${patientMrn}`,
    patientStatus && `| ${patientStatus}`,
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
