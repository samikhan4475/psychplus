import React, { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { searchPatientsAction } from '@/ui/visit/actions'
import { ServerSearchSelect } from '@/ui/visit/add-visit/components/server-search-select'
import { calculateAge } from '@/ui/visit/add-visit/util'
import { Patient } from '@/ui/visit/types'
import { getGenderShortName } from '@/ui/visit/utils'
import { getSlashedPaddedDateString } from '@/utils'
import { SchemaType } from './schema'

const PatientSelect = () => {
  const form = useFormContext<SchemaType>()
  const genderCodes = useCodesetCodes(CODESETS.Gender)
  const statusCodes = useCodesetCodes(CODESETS.CustomerStatus)
  const mappedStatuses: { [key: string]: string } = useMemo(() => {
    return statusCodes.reduce<{ [key: string]: string }>((acc, curr) => {
      acc[curr.value] = curr.display
      return acc
    }, {})
  }, [statusCodes])
  const formatText = (value: Patient) => {
    let text = ''
    const parts = [
      value.firstName,
      value.middleName,
      value.lastName,
      value.birthdate ? calculateAge(value.birthdate) : '',
      getGenderShortName(genderCodes, value.gender),
      value.birthdate
        ? `| ${getSlashedPaddedDateString(value.birthdate, true)}`
        : '',
      value.medicalRecordNumber ? `| ${value.medicalRecordNumber}` : '',
      value.status ? `| ${mappedStatuses[value.status]}` : '',
    ]
    text = parts.filter(Boolean).join(' ')

    return text
  }
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Patient Name</FormFieldLabel>
      <ServerSearchSelect
        fieldName="patient"
        placeholder="Search patients…"
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
    </FormFieldContainer>
  )
}

export { PatientSelect }
