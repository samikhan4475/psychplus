'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer, NumberInput, PhoneNumberInput } from '@/components'
import { sanitizeFormData } from '@/utils'
import { Address } from './address-input'
import { ClearFilterButton } from './clear-filter-button'
import { PharmacyCityInput } from './pharmacy-city-input'
import { PharmacyName } from './pharmacy-input'
import { PharmacyStatusSelect } from './pharmacy-status-select'
import { SearchFilterButton } from './search-filter-button'
import { ServiceLevelSelect } from './service-level-select'
import { StateSelect } from './states-select'
import { useStore } from './store'

const schema = z.object({
  organizationName: z.string().optional(),
  address1: z.string().optional(),
  address2: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  npi: z.string().optional(),
  phone: z.string().optional(),
  serviceLevelCodes: z.array(z.string()).optional(),
})
type FilterSchemaType = z.infer<typeof schema>

const PharmacyFilterForm = () => {
  const { fetchPatientPharmacies } = useStore((state) => ({
    fetchPatientPharmacies: state.fetchPatientPharmacies,
  }))
  const form = useForm<FilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      organizationName: undefined,
      address1: undefined,
      address2: undefined,
      zip: undefined,
      city: undefined,
      state: undefined,
      phone: undefined,
      npi: undefined,
      serviceLevelCodes: [],
    },
    mode: 'onBlur',
  })
  const onSubmit: SubmitHandler<FilterSchemaType> = (data) => {
    const sanitizedData = sanitizeFormData(data)
    return fetchPatientPharmacies(sanitizedData)
  }
  const handleReset = () => {
    form.reset({
      organizationName: '',
      address1: '',
      address2: '',
      zip: '',
      city: '',
      state: '',
      phone: '',
      npi: '',
      serviceLevelCodes: [],
    })
    fetchPatientPharmacies()
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white rounded-bl-1 rounded-br-1 p-2"
    >
      <Flex align="center" gap="2" wrap="wrap" width="100%">
        <PharmacyName />
        <Address label="Address 1" fieldName="address1" />
        <Address label="Address 2" fieldName="address2" />
        <PharmacyCityInput />
        <StateSelect />

        <NumberInput
          field="zip"
          label="ZIP"
          placeholder="Search"
          format="#####"
        />
        <PhoneNumberInput field="phone" label="Phone" placeholder="Search" />
        <NumberInput field="npi" label="NPI" placeholder="Search" />
        <ServiceLevelSelect label="Service Level" />
        <PharmacyStatusSelect />
        <ClearFilterButton handleReset={handleReset} />
        <SearchFilterButton />
      </Flex>
    </FormContainer>
  )
}

export { PharmacyFilterForm, type FilterSchemaType }
