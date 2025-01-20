import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, TextField } from '@radix-ui/themes'
import { SearchIcon } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer, FormFieldLabel, SelectInput } from '@/components'
import { FilterFieldContainer } from '../shared'

const schema = z.object({
  from: z.ostring(),
  to: z.ostring(),
  duration: z.ostring(),
  staffName: z.ostring(),
  tasks: z.ostring(),
  status: z.ostring(),
})

type ForwardingMessageFilterSchemaType = z.infer<typeof schema>

const tasksOptions = [
  { label: 'Messaging', value: 'messaging' },
  { label: 'Notes', value: 'notes' },
  { label: 'Lab Orders', value: 'lab_orders' },
  { label: 'Medications', value: 'medications' },
]

const statusOptions = [{ label: 'Pending', value: 'pending' }]

const ForwardingMessageFilterForm = () => {
  const form = useForm<ForwardingMessageFilterSchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {},
  })

  const handleSubmit: SubmitHandler<ForwardingMessageFilterSchemaType> = () => {
    //TODO: Integrate filter forwarding message API
  }

  const handleClearFields = () => {
    form.reset()
  }

  return (
    <Flex className="bg-white mt-[3px]" px="2" py="1">
      <FormContainer form={form} onSubmit={handleSubmit} className="gap-2">
        <Flex align="center" className="gap-1.5">
          <FilterFieldContainer>
            <FormFieldLabel>From</FormFieldLabel>
            <TextField.Root
              type="date"
              placeholder="Date"
              {...form.register('from')}
              className="h-7 w-full [&__.rt-TextFieldInput]:!inline-block"
            />
          </FilterFieldContainer>
          <FilterFieldContainer>
            <FormFieldLabel>To</FormFieldLabel>
            <TextField.Root
              type="date"
              placeholder="Date"
              {...form.register('to')}
              className="h-7 w-full [&__.rt-TextFieldInput]:!inline-block"
            />
          </FilterFieldContainer>
          <FilterFieldContainer>
            <FormFieldLabel>Duration</FormFieldLabel>
            <SelectInput
              placeholder="Select"
              className="flex-1 "
              buttonClassName="w-full h-7"
              field="duration"
              options={[]}
            />
          </FilterFieldContainer>
          <FilterFieldContainer>
            <FormFieldLabel>Staff Name</FormFieldLabel>
            <SelectInput
              placeholder="Select"
              className="flex-1"
              buttonClassName="w-full h-7"
              field="staffName"
              options={[]}
            />
          </FilterFieldContainer>
          <FilterFieldContainer>
            <FormFieldLabel>Tasks</FormFieldLabel>
            <SelectInput
              placeholder="Select"
              className="flex-1"
              buttonClassName="w-full h-7"
              field="tasks"
              options={tasksOptions}
            />
          </FilterFieldContainer>
          <FilterFieldContainer>
            <FormFieldLabel>Status</FormFieldLabel>
            <SelectInput
              placeholder="Select"
              className="flex-1"
              buttonClassName="w-full h-7"
              field="status"
              options={statusOptions}
            />
          </FilterFieldContainer>
          <Button
            size="1"
            variant="outline"
            color="gray"
            className="text-black"
            onClick={handleClearFields}
          >
            Clear
          </Button>
          <Button size="1" variant="solid" highContrast type="submit">
            <SearchIcon width={14} height={14} />
          </Button>
        </Flex>
      </FormContainer>
    </Flex>
  )
}

export { ForwardingMessageFilterForm }
