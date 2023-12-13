'use client'

import { CheckIcon } from '@radix-ui/react-icons'
import { Box, Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormDatePicker,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { AddFeeScheduleCptTable } from './add-fee-schedule-cpt-table'
import { CancelAddFeeScheduleButton } from './cancel-add-fee-schedule-button'
import { FeeScheduleConfiguration } from './fee-schedule-config/fee-schedule-configuration'

const today = new Date()

const schema = z.object({
  name: validate.requiredString,
  effectiveFrom: z.date().optional(),
  effectiveTo: z.date().optional(),
  description: z.string().optional(),
  sequenceNumber: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const AddFeeScheduleForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      name: undefined,
      effectiveFrom: today,
      effectiveTo: today,
      description: undefined,
      sequenceNumber: undefined,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    console.log('onSubmit Data', data)
  }

  return (
    <>
      <Form form={form} onSubmit={onSubmit}>
        <Flex direction="column" gap="4" mb="4" px="1">
          <Flex gap="4">
            <Box style={{ flex: 1 }}>
              <FormTextInput
                type="text"
                label="Name"
                placeholder="Enter Fee Schedule Name"
                data-testid="add-fee-schedule-name-input"
                {...form.register('name')}
              />
            </Box>
            <Box style={{ flex: 1 }}>
              <FormTextInput
                type="text"
                label="Sequence #"
                placeholder=""
                disabled
                data-testid="add-fee-schedule-sequence-number-disabled-input"
                {...form.register('sequenceNumber')}
              />
            </Box>
          </Flex>
          <Flex gap="4">
            <Box style={{ flex: 1 }}>
              <FormDatePicker
                label="Effective From"
                {...form.register('effectiveFrom')}
              />
            </Box>
            <Box style={{ flex: 1 }}>
              <FormDatePicker
                label="Effective To"
                {...form.register('effectiveTo')}
              />
            </Box>
          </Flex>
          <FormTextInput
            type="text"
            label="Description"
            placeholder=""
            data-testid="add-fee-schedule-name-input"
            {...form.register('description')}
          />
        </Flex>
        <Flex px="1" mb="2">
          <Box style={{ flex: 1 }}>
            <AddFeeScheduleCptTable />
          </Box>
        </Flex>
        <Flex px="1" mb="2">
          <Box style={{ flex: 1 }}>
            <FeeScheduleConfiguration />
          </Box>
        </Flex>
        <Flex gap="3" justify="end">
          <CancelAddFeeScheduleButton formDirty={form?.formState?.isDirty} />
          <FormSubmitButton
            size="2"
            data-testid="edit-claim-status-submit-button"
          >
            <CheckIcon />
            Save
          </FormSubmitButton>
        </Flex>
      </Form>
    </>
  )
}

export { AddFeeScheduleForm }
