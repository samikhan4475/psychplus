import { useMemo, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { getSlashedPaddedDateString } from '@/utils'
import { searchPatientsAction } from '../../actions'
import { Patient } from '../../types'
import { getGenderShortName } from '../../utils'
import { SchemaType } from '../schema'
import { SlotDetails } from '../types'
import { calculateAge } from '../util'
import { ServerSearchSelect } from './server-search-select'
import { StateChangeAlert } from './state-change-alert'

const PatientSelect = ({ slotDetails }: { slotDetails?: SlotDetails }) => {
  const form = useFormContext<SchemaType>()
  const statusCodes = useCodesetCodes(CODESETS.CustomerStatus)
  const genderCodes = useCodesetCodes(CODESETS.Gender)
  const [isOpen, setIsOpen] = useState<boolean>(false)

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
    <>
      <StateChangeAlert
        isOpen={isOpen}
        onConfirm={(isConfirmed: boolean) => {
          if (isConfirmed) {
            form.setValue('state', slotDetails?.state ?? '')
          }
          setIsOpen(false)
        }}
      />
      <FormFieldContainer>
        <FormFieldLabel required>Patient Name</FormFieldLabel>

        <ServerSearchSelect
          fieldName="patient"
          placeholder="Search patients…"
          fetchResults={(name: string) => searchPatientsAction({ name: name })}
          formatText={formatText}
          required
          onChange={(value: Patient) => {
            const state = value?.contactDetails?.addresses?.[0]?.state ?? ''
            if (state) {
              form.setValue('state', state)
            }
            if (slotDetails) {
              const areStatesSame = slotDetails.state === state
              if (!areStatesSame) {
                setIsOpen(true)
              }
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
    </>
  )
}

export { PatientSelect }
