import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { searchPatientsAction } from '@/ui/visit/actions'
import { ServerSearchSelect } from '@/ui/visit/add-visit/components/server-search-select'
import { Patient } from '@/ui/visit/types'
import { PatientClaimDetails } from './patient-claim-details'
import { ClaimAddSchemaType } from './schema'

const PatientSelect = () => {
  const form = useFormContext<ClaimAddSchemaType>()

  const generatePatientDisplayName = (value: Patient) =>
    [
      value.firstName,
      value.middleName,
      value.lastName,
      value.medicalRecordNumber ? `| ${value.medicalRecordNumber}` : '',
    ]
      .filter(Boolean)
      .join(' ')

  const handlePatientSelect = (selectedPatient: Patient) => {
    if (!selectedPatient) return
    form.setValue('patientId', selectedPatient.id, {
      shouldValidate: true,
      shouldDirty: true,
    })
    form.setValue('patientName', generatePatientDisplayName(selectedPatient), {
      shouldValidate: true,
      shouldDirty: true,
    })
    form.setValue('patientAccountNumber', selectedPatient.medicalRecordNumber, {
      shouldValidate: true,
      shouldDirty: true,
    })
    form.setValue('patientDateOfBirth', selectedPatient.birthdate, {
      shouldValidate: true,
      shouldDirty: true,
    })
    form.setValue('patientGender', selectedPatient.gender, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  return (
    <>
      <FormFieldContainer>
        <FormFieldLabel required>Patient Name</FormFieldLabel>
        <ServerSearchSelect
          fieldName="patient"
          placeholder="Search patients…"
          fetchResults={(name: string) => searchPatientsAction({ name: name })}
          formatText={generatePatientDisplayName}
          required
          onChange={handlePatientSelect}
        />
        <FormFieldError name="patientAccountNumber" />
      </FormFieldContainer>
      <PatientClaimDetails />
    </>
  )
}

export { PatientSelect }
