'use client'

import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormContainer } from '@/components'
import { FilterSchemaType, schema } from '../filter-form'
import { useStore } from '../store'
import { transformFormValuesToPayload } from '../utils'
import { AddressField } from './address-field'
import { CityField } from './city-field'
import { NameField } from './name-field'
import { PhoneNumberField } from './phone-field'
import { StateField } from './state-field'
import { ZipCodeField } from './zipcode-field'

const PharmacyFilterFrom = () => {
  const { patient, fetchPharmacies } = useStore((state) => ({
    patient: state.patient,
    fetchPharmacies: state.fetchPharmacies,
  }))

  const form = useForm<FilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      pharmacyName: undefined,
      pharmacyAddress: undefined,
      pharmacyZip: undefined,
      pharmacyCity: undefined,
      pharmacyStateCode: patient?.contactDetails.addresses?.[0].state,
      pharmacyPhone: undefined,
    },
    mode: 'onBlur',
  })

  const onClear = () => {
    form.reset({
      pharmacyName: '',
      pharmacyAddress: '',
      pharmacyZip: '',
      pharmacyCity: '',
      pharmacyStateCode: patient?.contactDetails.addresses?.[0].state,
      pharmacyPhone: '',
    })

    const payload = transformFormValuesToPayload({
      pharmacyStateCode: patient?.contactDetails.addresses?.[0].state,
    })
    fetchPharmacies(payload)
  }

  const onSubmit: SubmitHandler<FilterSchemaType> = (data) => {
    const payload = transformFormValuesToPayload(data)
    fetchPharmacies(payload)
  }

  useEffect(() => {
    const payload = transformFormValuesToPayload({
      pharmacyStateCode: patient?.contactDetails.addresses?.[0].state,
    })
    fetchPharmacies(payload)
  }, [])

  return (
    <FormContainer
      className="bg-white flex flex-row items-center gap-2 px-2 py-1"
      form={form}
      onSubmit={onSubmit}
    >
      <Flex align="end" gap="3" wrap="wrap" width="100%">
        <NameField />
        <AddressField />
        <ZipCodeField />
        <CityField />
        <StateField />
        <PhoneNumberField />
        <Button
          color="gray"
          className="text-black"
          size="1"
          variant="outline"
          type="button"
          onClick={onClear}
        >
          Clear
        </Button>
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { PharmacyFilterFrom }
