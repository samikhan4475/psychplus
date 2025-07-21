import {
  DatePickerInput,
  FormContainer,
  FormFieldContainer,
  FormFieldLabel
} from '@/components'
import { formatDateToISOString } from '@/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, TextField } from '@radix-ui/themes'
import { Search } from 'lucide-react'
import { DateValue } from 'react-aria-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { useHpiHistoryStore } from './store'

export const HpiHistoryFilterForm = ({ patientId }: { patientId: string }) => {
  const { fetchHistory } = useHpiHistoryStore()
  const schema = z.object({
    historyCreatedFrom: z.custom<DateValue | undefined>().optional(),
    historyCreatedTo: z.custom<DateValue | undefined>().optional(),
    username: z.string().optional().default(''),
  })

  type SchemaType = z.infer<typeof schema>

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      historyCreatedFrom: undefined,
      historyCreatedTo: undefined,
      username: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    fetchHistory({
      patientId,
      filters: {
        historyCreatedFrom: formatDateToISOString(
          data.historyCreatedFrom,
        ) as string,
        historyCreatedTo: formatDateToISOString(
          data.historyCreatedTo,
        ) as string,
        username: data.username as string,
      },
    })
  }

  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="flex flex-row flex-wrap gap-3"
    >
      <FormFieldContainer className="w-[174px] flex-row items-center gap-1">
        <FormFieldLabel className="pt-0.5 !text-1">From</FormFieldLabel>
        <DatePickerInput field="historyCreatedFrom" />
      </FormFieldContainer>

      <FormFieldContainer className="w-[174px] flex-row items-center gap-1">
        <FormFieldLabel className="pt-0.5 !text-1">To</FormFieldLabel>
        <DatePickerInput field="historyCreatedTo" />
      </FormFieldContainer>

      <FormFieldContainer className="flex-row items-center gap-1">
        <FormFieldLabel>Name</FormFieldLabel>
        <TextField.Root
          size="1"
          placeholder="Search by name"
          className="border-pp-gray-2 h-6 w-[122px] border border-solid !outline-none [box-shadow:none]"
          {...form.register('username')}
        />
      </FormFieldContainer>
      <Button size="1" className="bg-pp-black-2 text-white"> <Search size={"14"} />
      </Button>
      <Button
        variant="outline"
        size="1"
        color="gray"
        className="text-black"
        onClick={() => form.reset()}
      >
        Reset
      </Button>
    </FormContainer>
  )
}
