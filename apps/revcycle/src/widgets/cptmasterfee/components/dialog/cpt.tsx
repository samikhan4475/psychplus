'use client'

import { Box, Flex } from '@radix-ui/themes'
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

const schema = z.object({
  cptCode: validate.requiredString,
  placeOfService: validate.requiredString,
  macLocality: validate.anyString.optional(),
  description: validate.requiredString,
  service: validate.anyString.optional(),
  category: validate.requiredString,
  gender: validate.requiredString,
  minimumAge: validate.requiredString,
  maximumAge: validate.requiredString,
  requirement: validate.requiredString,
  resourceStatusList: validate.anyString.optional(),
})

interface CPT {
  macLocality?: string
  hcpcsCodes?: string[]
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  resourceStatusList?: string
  id?: string
}

type SchemaType = z.infer<typeof schema>
interface Props {
  refresh: () => void
  optionalData: CPT
}
const CPTComponent = (props: Props) => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      gender: 'Male',
      resourceStatusList: 'Active',
      minimumAge: '0',
      maximumAge: '10',
      ...(props.optionalData || {}),
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = () => {
    if (props.optionalData && props.optionalData.id) {
      updateCPTRecords(props.optionalData.id, form.getValues()).then(() => {
        props.refresh()
      })
    }
    addCPTRecords(0, 0, form.getValues()).then(() => {
      props.refresh()
    })
  }

  return (
    <Form
      form={form}
      onSubmit={() => {
        onSubmit(form.getValues())
      }}
    >
      <Flex direction="column" gap="4" mb="4" px="1">
        <Flex gap="4" mb="4" mt="4">
          <Box className="flex-1">
            <FormTextInput label="CPT Code" {...form.register('cptCode')} />
          </Box>
          <Box className="flex-1">
            <FormTextInput label="POS" {...form.register('placeOfService')} />
          </Box>
          <Box className="flex-1">
            <FormTextInput
              label="Medicare Amount"
              {...form.register('macLocality')}
            />
          </Box>
        </Flex>
        <Flex gap="4" mb="4" mt="4">
          <Box className="flex-1">
            <FormTextInput
              label="Description"
              {...form.register('description')}
            />
          </Box>
          <Box className="flex-1">
            <FormTextInput
              label="Requirement"
              {...form.register('requirement')}
            />
          </Box>
        </Flex>
        <Flex gap="4" mb="4" mt="4">
          <Box className="flex-1">
            <FormTextInput
              label="Type of Service"
              {...form.register('service')}
            />
          </Box>
          <Box className="flex-1">
            <FormTextInput label="Category" {...form.register('category')} />
          </Box>
          <Box className="flex-1">
            <FormSelect
              label="Gender"
              defaultValue="Male"
              {...form.register('gender')}
              options={[
                { label: 'Male', value: 'Male' },
                { label: 'Female', value: 'Female' },
              ]}
            />
          </Box>
        </Flex>
        <Flex gap="4" mb="4" mt="4">
          <Box className="flex-1">
            <FormTextInput
              label="Age Range"
              placeholder="From"
              {...form.register('minimumAge')}
            />
          </Box>
          <Box className="flex-1">
            <FormTextInput
              label="To"
              placeholder="To"
              {...form.register('maximumAge')}
            />
          </Box>
          <Box className="flex-1">
            <FormSelect
              label="Status"
              defaultValue="Active"
              {...form.register('resourceStatusList')}
              options={[
                { label: 'Active', value: 'Active' },
                { label: 'Inactive', value: 'Inactive' },
              ]}
            />
          </Box>
        </Flex>
      </Flex>
      <Flex gap="3" justify="end">
        <FormSubmitButton size="2">
          {props.optionalData?.id ? 'Update' : 'Create'}
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { CPTComponent }
