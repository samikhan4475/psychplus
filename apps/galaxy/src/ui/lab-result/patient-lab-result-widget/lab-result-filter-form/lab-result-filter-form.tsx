'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormContainer, FormSubmitButton } from '@/components'
import { cn, formatDateToISOString } from '@/utils'
import { useStore } from '../store'
import { LabResultsPayload } from '../types'
import { removeEmptyValues } from '../utils'
import { ClearButton } from './clear-button'
import { FromDatePicker } from './from-date-picker'
import { labresultSchema, LabResultSchemaType } from './schema'
import { TestSelect } from './test-select'
import { ToDatePicker } from './to-date-picker'

const LabResultFilterForm = () => {
  const form = useForm<LabResultSchemaType>({
    resolver: zodResolver(labresultSchema),
    criteriaMode: 'all',
    mode: 'onBlur',
  })
  const patientId = useParams().id as string

  const { fetchLabResults } = useStore((state) => ({
    fetchLabResults: state.fetchLabResults,
  }))
  const handleFormSubmit = form.handleSubmit((data) => {
    const formattedData = {
      ...data,
      dateFrom: formatDateToISOString(data.dateFrom),
      dateTo: formatDateToISOString(data.dateTo, true),
      patientId,
      resourceStatusList: ['Active'],
    }

    const cleanedData = removeEmptyValues(formattedData)

    fetchLabResults(cleanedData as LabResultsPayload)
  })
  return (
    <FormContainer
      form={form}
      onSubmit={() => {}}
      className={cn('flex flex-row justify-between gap-3 p-2')}
    >
      <FromDatePicker />
      <ToDatePicker />
      <TestSelect />
      <Flex gap="2" align="center" className="flex-1">
        <ClearButton />
        <FormSubmitButton
          form={form}
          size="1"
          variant="solid"
          onClick={handleFormSubmit}
          highContrast
        >
          <MagnifyingGlassIcon />
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { LabResultFilterForm }
