'use client'

import { ChangeEvent } from 'react'
import { useRouter } from 'next/navigation'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { Flex, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { Form, FormSubmitButton, FormTextInput, useForm } from '@psychplus/form'
import { schema, SchemaType } from './schema'

const ScheduleAppointmentDialogForm = ({ title }: NewPatientProps) => {
  const router = useRouter()
  const providerTypeDefaultValue = toCamelCase(title)

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      providerType: providerTypeDefaultValue as SchemaType['providerType'],
      appointmentType: 'Virtual',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    const queryString = new URLSearchParams(form.getValues()).toString()

    router.push(`/dashboard/schedule-appointment?${queryString}`)
  }

  const handleZipCodeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const zipCode = event.target.value.slice(0, 5)
    form.setValue('zipCode', zipCode)

    if (form.formState.isSubmitted) form.trigger('zipCode')
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex className="text-[#151B4A]" mt="5" gap="6" direction="column">
        <Flex className="text-5 font-medium">
          Do you want to see a Psychiatrist or a Therapist?
        </Flex>

        <ToggleGroup.Root
          type="single"
          defaultValue={providerTypeDefaultValue}
          onValueChange={(value) =>
            form.setValue('providerType', value as SchemaType['providerType'])
          }
        >
          <Flex gap="3" className="flex-wrap">
            <ToggleGroup.Item
              value="Psychiatrist"
              className={
                toggleGroupItemClasses + ' h-[60px] w-[268px] sm:w-[292px]'
              }
            >
              Psychiatrist <Text size="1">(Diagnosis / Medications)</Text>
            </ToggleGroup.Item>

            <ToggleGroup.Item
              value="Therapist"
              className={toggleGroupItemClasses + ' h-[60px] w-[207px] '}
            >
              Therapist <Text size="1">(Counseling)</Text>
            </ToggleGroup.Item>
          </Flex>
        </ToggleGroup.Root>
      </Flex>

      <Flex direction="column" py="5" gap="6">
        <Flex className="text-5 font-medium">
          Would you like to meet in-person or virtually?
        </Flex>

        <ToggleGroup.Root
          type="single"
          defaultValue="Virtual"
          onValueChange={(value) =>
            form.setValue(
              'appointmentType',
              value as SchemaType['appointmentType'],
            )
          }
        >
          <Flex gap="3" className="flex-wrap">
            <ToggleGroup.Item
              value="Virtual"
              className={'h-[60px] w-[157px] ' + toggleGroupItemClasses}
            >
              Virtual
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="In-Person"
              className={' h-[60px] w-[178px] ' + toggleGroupItemClasses}
            >
              In-Person
            </ToggleGroup.Item>
          </Flex>
        </ToggleGroup.Root>
      </Flex>
      {form.watch('appointmentType') === 'In-Person' && (
        <Flex direction="column" className="w-1/2 font-regular max-xs:w-full">
          <Text size="4" mb="3">
            Enter ZIP Code
          </Text>
          <FormTextInput
            type="number"
            label=""
            placeholder="ZIP Code"
            data-testid="zip-code-input"
            {...form.register('zipCode')}
            onChange={handleZipCodeChange}
            className="h-[56px] text-4"
          />
        </Flex>
      )}
      <Flex mt="5" justify="end">
        <FormSubmitButton
          radius="full"
          className="h-[40px] w-[100px] bg-[#151B4A] px-4 font-bold"
        >
          <Text size="3">Search</Text>
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

const toggleGroupItemClasses =
  'bg-[#E8E8E8] text-3 data-[state=on]:bg-[#151B4A] data-[state=on]:text-accent-1 rounded-4 px-2'

interface NewPatientProps {
  title: string
}

const toCamelCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export { ScheduleAppointmentDialogForm }
