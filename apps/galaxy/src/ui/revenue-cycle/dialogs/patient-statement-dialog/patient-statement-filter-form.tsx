'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { PatientStatementPayload } from '../../types'
import { ClaimNumberField } from './claim-number-field'
import { ClearButton } from './clear-button'
import { useStore } from './store'

const schema = z.object({
  claimNumber: z.string().trim().optional(),
})

type SchemaType = z.infer<typeof schema>

interface PatientStatementFilterFormProps {
  patientId: number
}

const PatientStatementFilterForm = ({
  patientId,
}: PatientStatementFilterFormProps) => {
  const { search } = useStore((state) => ({
    search: state.search,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      claimNumber: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const cleanedData = sanitizeFormData(data) as PatientStatementPayload
    return search(patientId, {
      ...cleanedData,
      patientIds: [patientId],
    })
  }

  return (
    <FormContainer
      className="bg-white flex-row gap-1.5 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <ClaimNumberField />
      <ClearButton patientId={patientId} />
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { PatientStatementFilterForm, type SchemaType }
