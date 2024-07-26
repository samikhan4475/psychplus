'use client'

import { Box, Button, Flex } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { addCPTRecords, updateCPTRecords } from '../../api.client'
import { useStore } from '../../store'

const schema = z.object({
  cptCode: validate.requiredString,
  placeOfService: validate.requiredString,
  medicareAmount: validate.anyString.optional(),
  description: validate.requiredString,
  service: validate.anyString.optional(),
  category: validate.requiredString,
  gender: validate.requiredString,
  minimumAge: validate.requiredString,
  maximumAge: validate.requiredString,
  requirement: validate.requiredString,
  recordStatus: validate.anyString.optional(),
})

interface CPT {
  medicareAmount?: string
  hcpcsCodes?: string
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  recordStatus?: string
  id?: string
}

type SchemaType = z.infer<typeof schema>
interface Props {
  refresh: () => void
  optionalData: CPT
}
const CPTAddForm = (props: Props) => {
  const posCodes = useStore((state) => state.codingPosList || [])
  const feeScheduleCategory = useStore(
    (state) => state.feeScheduleCategoryList || [],
  )
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      gender: 'Male',
      recordStatus: 'Active',
      minimumAge: '0',
      maximumAge: '10',
      ...(props.optionalData || {}),
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    if (props?.optionalData?.id) {
      updateCPTRecords(props.optionalData.id, form.getValues()).then(() => {
        props.refresh()
      })
    } else {
      addCPTRecords(0, 0, form.getValues()).then(() => {
        props.refresh()
      })
    }
  }
  const handleClearForm = () => {
    form.reset()
    form.setValue('placeOfService', '')
    form.setValue('category', '')
    form.setValue('gender', '')
    form.setValue('recordStatus', '')
  }
  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" px="1">
        <Flex gap="2" my="1">
          <Box className="w-2/5">
            <FormTextInput
              label="CPT Code"
              required={true}
              placeholder="Enter CPT"
              {...form.register('cptCode')}
            />
          </Box>
          <Box className="w-1/5">
            <FormSelect
              label="POS"
              placeholder="Default Value"
              required={true}
              {...form.register('placeOfService')}
              options={posCodes.map((r) => ({
                label: r.display,
                value: r.code,
              }))}
            />
          </Box>
          <Box className="w-2/5">
            <FormTextInput
              label="Medicare Amount"
              placeholder="MCD $"
              required={true}
              {...form.register('medicareAmount')}
            />
          </Box>
        </Flex>

        <Flex gap="2" my="1">
          <Box className="w-3/5">
            <FormTextInput
              maxLength={128}
              label="Description"
              required={true}
              placeholder="Description..."
              {...form.register('description')}
            />
          </Box>
          <Box className="w-2/5">
            <FormTextInput
              maxLength={256}
              label="Requirement"
              placeholder="Requirements..."
              required={true}
              {...form.register('requirement')}
            />
          </Box>
        </Flex>

        <Flex gap="2" my="1">
          <Box className="w-3/5">
            <FormSelect
              label="Category"
              placeholder="Select"
              required={true}
              {...form.register('category')}
              options={feeScheduleCategory.map((r) => ({
                label: r.display,
                value: r.code,
              }))}
            />
          </Box>
          <Box className="w-2/5">
            <FormSelect
              label="Gender"
              placeholder="Select"
              required={false}
              {...form.register('gender')}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
            />
          </Box>
        </Flex>

        <Flex gap="2" my="1">
          <Box>
            <FormTextInput
              label="Age Range"
              placeholder="From"
              {...form.register('minimumAge')}
            />
          </Box>
          <Box className="mt-6">-</Box>
          <Box className='mt-[18.4px]'>
            <FormTextInput
              label=" "
              placeholder="To"
              {...form.register('maximumAge')}
            />
          </Box>

          <Box className="w-1/5">
            <FormSelect
              label="Status"
              placeholder="Select"
              required={true}
              {...form.register('recordStatus')}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
              ]}
            />
          </Box>
          <Box className="mt-6 w-1/3">
            <Button
              highContrast
              variant="outline"
              className="mr-2"
              onClick={handleClearForm}
            >
              Clear
            </Button>
          </Box>
        </Flex>
      </Flex>

      <Flex mt="3" justify="end">
        <FormSubmitButton size="2" className="bg-[#151B4A]">
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { CPTAddForm }
