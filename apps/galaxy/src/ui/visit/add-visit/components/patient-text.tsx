import { parseDate } from '@internationalized/date'
import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { NewPatient } from '@/types'
import { formatDate, getAgeFromDate } from '@/utils'
import { getGenderShortName } from '../../utils'
import { useCodesetCodes } from '@/hooks'
import { CODESETS } from '@/constants'

const PatientText = ({ patient }: { patient: NewPatient }) => {
  const {
    user: { legalName },
    dob = '',
    gender = '',
    patientMrn = '',
    patientStatus = '',
  } = patient
  const genderCodes = useCodesetCodes(CODESETS.Gender)
  const name = `${legalName.firstName} ${
    legalName.middleName ? legalName.middleName + ' ' : ''
  }${legalName.lastName}`
  const age = dob
    ? getAgeFromDate(parseDate(formatDate(dob, 'yyyy-MM-dd')))
    : ''
  const value = [
    name && `${name}`,
    age && `${age} yo`,
    getGenderShortName(genderCodes, gender),
    dob && `| ${formatDate(dob, 'MM-dd-yyyy') ?? ''}`,
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
