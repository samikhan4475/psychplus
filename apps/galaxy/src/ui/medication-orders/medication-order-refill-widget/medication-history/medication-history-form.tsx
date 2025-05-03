'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { DateValue } from 'react-aria-components'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { DatePickerInput, FormContainer } from '@/components'
import {
  formatEndOfDay,
  formatStartOfDay,
  isValidDateRange,
  sanitizeFormData,
} from '@/utils'

interface MedicationHistoryFilterFormProps {
  onFilterSubmit: (data?: any) => void
}
const schema = z.object({
  dateFrom: z.custom<DateValue>().nullable(),
  dateTo: z.custom<DateValue>().nullable(),
})

type MedicationHistoryFilterSchemaType = z.infer<typeof schema>

const MedicationHistoryFilterForm = ({
  onFilterSubmit,
}: MedicationHistoryFilterFormProps) => {
  const form = useForm<MedicationHistoryFilterSchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      dateFrom: undefined,
      dateTo: undefined,
    },
  })

  const onSubmit: SubmitHandler<MedicationHistoryFilterSchemaType> = (data) => {
    const isValid = isValidDateRange(data.dateFrom, data.dateTo)
    if (!isValid) {
      toast.error('To date must be the same or after From date')
      return
    }
    const payload = {
      dateFrom: data.dateFrom ? formatStartOfDay(data.dateFrom) : null,
      dateTo: data.dateTo ? formatEndOfDay(data.dateTo) : null,
    }
    const payloadSanitized = sanitizeFormData(payload)
    onFilterSubmit(payloadSanitized)
  }

  return (
    <FormContainer
      className="bg-white mb-2 flex-row gap-1.5 px-2 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <Flex className="flex-row items-center gap-1">
        <DatePickerInput
          field="dateFrom"
          className="w-[101px]"
          yearFormat="YYYY"
        />
      </Flex>
      <Flex className="flex-row items-center gap-1">
        <DatePickerInput
          field="dateTo"
          className="w-[101px]"
          yearFormat="YYYY"
        />
      </Flex>
      <Button
        color="gray"
        className="text-black"
        size="1"
        variant="outline"
        type="button"
        onClick={() => {
          form.reset()
          onFilterSubmit()
        }}
      >
        Clear
      </Button>
      <Button highContrast size="1" type="submit">
        <MagnifyingGlassIcon strokeWidth={2} />
      </Button>
    </FormContainer>
  )
}

export { MedicationHistoryFilterForm, type MedicationHistoryFilterSchemaType }
