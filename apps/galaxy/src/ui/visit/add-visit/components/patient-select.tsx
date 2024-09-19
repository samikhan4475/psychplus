import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { searchPatientsAction } from '../actions'
import { SchemaType } from '../schema'
import { Patient } from '../types'
import { calculateAge } from '../util'
import { ServerSearchSelect } from './server-search-select'

const PatientSelect = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Patient Name</FormFieldLabel>

      <ServerSearchSelect
        fieldName="patient"
        placeholder="Search patients…"
        fetchResults={searchPatientsAction}
        formatText={(value: Patient) =>
          `${value.firstName} ${value.middleName || ''} ${
            value.lastName
          } ${calculateAge(value.birthdate)} ${value.gender} | ${
            value.birthdate
          } | ${value.medicalRecordNumber} | ${value.status}`
        }
        required
        onChange={(value: Patient) => {
          const state = value?.contactDetails?.addresses?.[0]?.state ?? ''
          if (state) {
            form.setValue('state', state)
          }
          form.setValue('patient', {
            id: value.id,
            firstName: value.firstName,
            lastName: value.lastName,
            status: value.status,
            middleName: value.middleName,
            birthdate: value.birthdate,
            gender: value.gender,
            medicalRecordNumber: value.medicalRecordNumber,
            state,
          })
        }}
      />
      <FormFieldError name="patient" />
    </FormFieldContainer>
  )
}

export { PatientSelect }
