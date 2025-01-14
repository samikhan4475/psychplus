import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, TextField } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import {
  BlockLabel,
  FormContainer,
  FormSubmitButton,
  MultiSelectChipDropdown,
} from '@/components'
import { schema, SchemaType } from './schema'

const toOptions = [
  { display: 'Option 1', value: 'option1' },
  { display: 'Option 2', value: 'option2' },
  { display: 'Option 3', value: 'option3' },
  { display: 'Option 4', value: 'option4' },
  { display: 'Option 5', value: 'option5' },
]

const taskPermissionsOptions = [
  { display: 'Messaging', value: 'messaging' },
  { display: 'Notes', value: 'notes' },
  { display: 'Lab Orders', value: 'lab_orders' },
  { display: 'Medications', value: 'medications' },
]

const ForwardingMessageForm = ({
  onSubmit,
}: {
  onSubmit: SubmitHandler<SchemaType>
}) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      to: [],
      startingDate: '',
      startingTime: '',
      endingDate: '',
      endingTime: '',
      days: '',
      taskPermissions: [],
    },
  })

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2">
        <BlockLabel className="text-base">Forward To</BlockLabel>
        <MultiSelectChipDropdown
          name="to"
          options={toOptions}
          className="[&__.rt-TextFieldRoot]:h-8"
          showOptionsAtBottom
        />
        <Flex gap="2">
          <Flex direction="column" gap="1" width="40%">
            <BlockLabel required>Starting Date & time</BlockLabel>
            <Flex direction="row" gap="1">
              <TextField.Root
                placeholder="Date"
                type="date"
                size="2"
                {...form.register('startingDate')}
              />
              <TextField.Root
                type="time"
                size="2"
                placeholder="Time"
                {...form.register('startingTime')}
                className="w-full [&__.rt-TextFieldInput]:!inline-block"
              />
            </Flex>
          </Flex>
          <Flex direction="column" gap="1" width="40%">
            <BlockLabel required>Ending Date & time</BlockLabel>
            <Flex direction="row" gap="1">
              <TextField.Root
                type="date"
                size="2"
                {...form.register('endingDate')}
              />
              <TextField.Root
                type="time"
                size="2"
                {...form.register('endingTime')}
                className="w-full [&__.rt-TextFieldInput]:!inline-block"
              />
            </Flex>
          </Flex>
          <Flex direction="column" gap="1" width="20%">
            <BlockLabel required>Duration</BlockLabel>
            <TextField.Root
              type="number"
              size="2"
              variant="soft"
              color="gray"
              {...form.register('days')}
            />
          </Flex>
        </Flex>
        <BlockLabel>Task Permissions</BlockLabel>
        <MultiSelectChipDropdown
          name="taskPermissions"
          options={taskPermissionsOptions}
          className="[&__.rt-TextFieldRoot]:h-8"
        />
        <Flex justify="end">
          <FormSubmitButton form={form} highContrast>
            Save
          </FormSubmitButton>
        </Flex>
      </Flex>
    </FormContainer>
  )
}

export { ForwardingMessageForm }
