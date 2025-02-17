'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { ConsentStatus } from '@/types'
import { applyClientSideFilters } from '../patient-info-tab/utils'
import { IssuanceSelect } from './issuance-select'
import { PolicyTypeSelect } from './policy-type-select'
import { RefreshButton } from './refresh-button'
import { StatusSelect } from './status-select'
import { useStore } from './store'

const schema = z.object({
  status: z.string().optional(),
  type: z.string().optional(),
  issuanceDate: z.string().optional(),
})

type PatientConsentSchemaType = z.infer<typeof schema>

interface FilterFormProps {
  patientId: string
}
const FilterForm = ({ patientId }: FilterFormProps) => {
  const { consents, setFilteredConsents } = useStore((state) => ({
    consents: state.consents,
    setFilteredConsents: state.setFilteredConsents,
  }))

  const form = useForm<PatientConsentSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      status: '',
      type: '',
      issuanceDate: '',
    },
  })

  const { isDirty } = form.formState

  const onSubmit: SubmitHandler<PatientConsentSchemaType> = (data) => {
    if (!isDirty) return
    const filteredConsents = applyClientSideFilters(consents ?? [], {
      status: data.status as ConsentStatus,
      issuanceDate: data.issuanceDate,
      type: data.type,
    })

    setFilteredConsents(filteredConsents ?? [])
  }

  const handleReset = () => {
    if (!isDirty) return
    form.reset({
      status: '',
      issuanceDate: '',
      type: '',
    })
    setFilteredConsents(consents ?? [])
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white px-2 py-1 shadow-5"
    >
      <Flex gap="2" align="center">
        <PolicyTypeSelect />
        <IssuanceSelect />
        <StatusSelect />
        <Button
          variant="outline"
          color="gray"
          size="1"
          className="text-black  font-regular"
          onClick={handleReset}
        >
          Clear
        </Button>
        <Button type="submit" size="1" highContrast>
          <Search height={14} width={14} />
        </Button>
        <RefreshButton patientId={patientId} />
      </Flex>
    </FormContainer>
  )
}

export { FilterForm, type PatientConsentSchemaType }
