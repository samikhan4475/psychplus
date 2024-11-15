'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { AllergiesEndDateField } from './allergies-end-date-field'
import { AllergiesNameField } from './allergies-name-field'
import { AllergiesStatusSelect } from './allergies-status-select'
import { AllergiesTypeSelect } from './allergies-type-select'
import { ObservationDateField } from './observation-date-field'
import { ResetButton } from './reset-button'
import { SeveritySelect } from './severity-select'

type SchemaType = z.infer<typeof schema>

const schema = z.object({
  observationDate: z.custom<DateValue>().nullable(),
  endDate: z.custom<DateValue>().nullable(),
  name: z.string().trim().optional(),
  allergyType: z.string().optional(),
  status: z.string().trim().optional(),
  severity: z.string().trim().optional(),
})

const PatientAllergiesFilterForm = ({ patientId }: { patientId: string }) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      observationDate: undefined,
      endDate: undefined,
      name: '',
      allergyType: '',
      status: '',
      severity: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      observationDate: formatDateToISOString(data.observationDate),
      endDate: formatDateToISOString(data.endDate, true),
    }
    const _cleanedData = sanitizeFormData(formattedData)
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <ObservationDateField />
      <AllergiesEndDateField />
      <AllergiesNameField />
      <AllergiesTypeSelect />
      <SeveritySelect />
      <AllergiesStatusSelect />
      <ResetButton />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { PatientAllergiesFilterForm, type SchemaType }
