import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid, RadioGroup, Text } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import {
  FormSelect,
  FormSubmitButton,
  FormTextInput,
  validate,
} from '@psychplus/form'
import { type Location } from '@psychplus/management-locations/types'
import { FormContainer } from '@psychplus/ui/form/form-container'
import AddressComponent from './address-fields'

interface AddManagementLocationProps {
  data?: Location
}

const initialValues = {
  id: '',
  name: '',
  npi: '',
  taxonomy: '',
  phone: '',
  fax: '',
  status: '',
  testLocation: '',
  address1: '',
  address2: '',
  locationType: 'Clinic',
  zip: '',
  city: '',
  state: '',
}

const schema = z.object({
  name: validate.requiredString,
  npi: validate.requiredString,
  taxonomy: validate.optionalString,
  phone: validate.phoneNumber,
  fax: validate.optionalString,
  status: validate.requiredString,
  testLocation: validate.requiredString,
  id: validate.optionalString,
  address1: validate.requiredString,
  address2: validate.requiredString,
  locationType: validate.optionalString,
  zip: validate.requiredString,
  city: validate.requiredString,
  state: validate.requiredString,
})

type SchemaType = z.infer<typeof schema>

const LocationForm = ({ data }: AddManagementLocationProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: data ?? initialValues,
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    console.log(data)
  }

  const statusOptions = [
    { value: 'active', label: 'Active' },
    { value: 'inactive', label: 'Inactive' },
  ]

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <RadioGroup.Root
        color="indigo"
        highContrast
        mb={'2'}
        defaultValue={form.watch('locationType')}
        onValueChange={(value: string) => {
          form.setValue('locationType', value)
        }}
      >
        <Flex gap="4" align={'center'}>
          <Text
            as="label"
            size={'2'}
            weight={'bold'}
            className="text-[#1C2024]"
          >
            Location Type
          </Text>
          <Flex gap="1" align={'center'}>
            <RadioGroup.Item className="text-[#151B4A]" value="Clinic" />
            <Text
              as="label"
              size={'2'}
              weight={'bold'}
              className="text-[#1C2024]"
            >
              Clinic
            </Text>
          </Flex>
          <Flex gap="1" align={'center'}>
            <RadioGroup.Item
              className="text-[12px] font-bold text-[#000000]"
              value="Facility"
            />
            <Text
              as="label"
              size={'2'}
              weight={'bold'}
              className="text-[#1C2024]"
            >
              Facility
              <Text
                as="span"
                size={'2'}
                weight={'bold'}
                className="text-[#60646C]"
              >
                &nbsp;(Not Time Dependent)
              </Text>
            </Text>
          </Flex>
        </Flex>
      </RadioGroup.Root>
      <Grid columns={'3'} gap={'3'}>
        <FormTextInput
          label="Name"
          size={'2'}
          placeholder="Enter name"
          required
          {...form.register('name')}
        />
        <FormTextInput
          label="NPI"
          size={'2'}
          placeholder="Enter NPI"
          required
          {...form.register('npi')}
        />
        <FormTextInput
          label="Taxonomy"
          size={'2'}
          placeholder="Enter Taxonomy"
          {...form.register('taxonomy')}
        />
        <FormTextInput
          label="Phone"
          size={'2'}
          placeholder="Enter phone"
          {...form.register('phone')}
        />
        <FormTextInput
          label="Fax"
          size={'2'}
          placeholder="Enter fax"
          {...form.register('fax')}
        />
        <FormSelect
          buttonClassName="w-[100%] text-[12px]"
          label="Status"
          size={'2'}
          placeholder="Select status"
          options={statusOptions}
          required
          {...form.register('status')}
        />

        <FormSelect
          buttonClassName="w-[100%] text-[12px]"
          label="Test Location"
          size={'2'}
          placeholder="Select test location"
          options={statusOptions}
          required
          {...form.register('testLocation')}
        />
        <FormTextInput
          label="ID"
          size={'2'}
          placeholder="Enter ID"
          {...form.register('id')}
        />
      </Grid>
      <Text size={'3'} weight={'medium'} my={'1'}>
        Primary Address
      </Text>

      <AddressComponent />

      <Flex justify="end" mt="5">
        <FormSubmitButton className="bg-[#151B4A]" size={'2'}>
          Save
        </FormSubmitButton>
      </Flex>
    </FormContainer>
  )
}

export { LocationForm, type SchemaType }
