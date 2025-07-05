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
import { SeveritySelect } from './severity-select'
import { useStore } from './store'

type SchemaType = z.infer<typeof schema>

const schema = z.object({
  onsetBegan: z.custom<DateValue>().nullable(),
  onsetEnded: z.custom<DateValue>().nullable(),
  allergyName: z.string().trim().optional(),
  allergyType: z.string().optional(),
  taskStatus: z.string().trim().optional(),
  severityCode: z.string().trim().optional(),
})

const PatientAllergiesFilterForm = ({ patientId }: { patientId: string }) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      onsetBegan: undefined,
      onsetEnded: undefined,
      allergyName: '',
      allergyType: '',
      taskStatus: '',
      severityCode: '',
    },
  })
  const { allergiesListSearch } = useStore()

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      onsetBegan: formatDateToISOString(data.onsetBegan),
      onsetEnded: formatDateToISOString(data.onsetEnded, true),
      taskStatus: data.taskStatus,
    }
    const _cleanedData = sanitizeFormData(formattedData)
    allergiesListSearch(patientId, { ..._cleanedData }, true)
  }

  const handleReset = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    form.reset()
    allergiesListSearch(patientId, {}, true)
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
      <Button
        color="gray"
        className="text-black ml-10"
        size="1"
        variant="outline"
        type="button"
        onClick={handleReset}
      >
        Clear
      </Button>
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { PatientAllergiesFilterForm, type SchemaType }
