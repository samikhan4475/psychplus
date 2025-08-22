import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TextInput,
} from '@/components'
import { searchPatientsAction } from '@/ui/visit/actions'
import { ServerSearchSelect } from '@/ui/visit/add-visit/components/server-search-select'
import { Patient } from '@/ui/visit/types'
import { formatDate } from '@/utils'
import { SchemaType } from './schema'

interface PatientSelectProps {
  patientId?: string
}
const PatientSelect = ({ patientId }: PatientSelectProps) => {
  const form = useFormContext<SchemaType>()
  const [patient, setPatient] = useState<Patient>()

  const formatText = (value: Patient) => {
    let text = ''
    const parts = [
      value.firstName,
      value.middleName,
      value.lastName,
      ' | ',
      value.birthdate ? formatDate(value.birthdate) : '',
    ]
    text = parts.filter(Boolean).join(' ')

    return text
  }

  useEffect(() => {
    if (patientId) {
      ;(async () => {
        const result = await searchPatientsAction({
          patientIds: [patientId],
          roleCodes: ['1'],
          IsIncludeInsuranceVerification: true,
        })

        if (result.state === 'success' && result.data.length > 0) {
          const patient = result.data[0]
          setPatient(patient)
          form.setValue('patientId', String(patient.id))
        }
      })()
    }
  }, [patientId])

  return (
    <FormFieldContainer>
      <FormFieldLabel required>Patient Name</FormFieldLabel>
      {patientId && !patient ? (
        <TextInput
          className="bg-white h-6 flex-1 border-0 outline-none"
          field="patient"
          placeHolder="Search patients..."
          disabled
        />
      ) : (
        <ServerSearchSelect
          fieldName="patient"
          placeholder="Search patients…"
          initialValue={patient}
          disabled={!!patientId}
          fetchResults={(name: string) =>
            searchPatientsAction({
              name,
              roleCodes: ['1'],
              IsIncludeInsuranceVerification: true,
            })
          }
          formatText={formatText}
          required
          onChange={(value: Patient) =>
            form.setValue('patientId', String(value.id))
          }
        />
      )}
      <FormFieldError name="patientId" />
    </FormFieldContainer>
  )
}

export { PatientSelect }
