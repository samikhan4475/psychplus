'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import { FormContainer, PhoneNumberInput } from '@/components'
import { sanitizeFormData } from '@/utils'
import { Address } from './address-input'
import { CitySelect } from './city-select'
import { PharmacyName } from './pharmacy-input'
import { StateSelect } from './states-select'
import { useStore } from './store'

const schema = z.object({
  pharmacyName: z.string().optional(),
  pharmacyAddress: z.string().optional(),
  pharmacyZip: z.string().optional(),
  pharmacyCity: z.string().optional(),
  pharmacyStateCode: z.string().optional(),
  pharmacyPhone: z.string().optional(),
})
type FilterSchemaType = z.infer<typeof schema>

interface PharmacyFilterFormProps {
  patientId: string
}
const PharmacyFilterForm = ({ patientId }: PharmacyFilterFormProps) => {
  const { fetchPatientPharmacies } = useStore((state) => ({
    fetchPatientPharmacies: state.fetchPatientPharmacies,
    formValues: state.formValues,
  }))
  const form = useForm<FilterSchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      pharmacyName: '',
      pharmacyAddress: '',
      pharmacyZip: undefined,
      pharmacyCity: '',
      pharmacyStateCode: '',
      pharmacyPhone: undefined,
    },
    mode: 'onBlur',
  })

  const { isDirty } = form.formState

  const onSubmit: SubmitHandler<FilterSchemaType> = (data) => {
    if (!isDirty) {
      return
    }
    const sanitizedData = sanitizeFormData({
      ...data,
    })
    return fetchPatientPharmacies(patientId, sanitizedData)
  }
  const handleReset = () => {
    form.reset({
      pharmacyName: '',
      pharmacyAddress: '',
      pharmacyZip: '',
      pharmacyCity: '',
      pharmacyStateCode: '',
      pharmacyPhone: '',
    })
    fetchPatientPharmacies(patientId)
  }
  return (
    <FormContainer
      form={form}
      onSubmit={onSubmit}
      className="bg-white rounded-bl-1 rounded-br-1 p-2"
    >
      <Flex align="center" gap="2">
        <PharmacyName />
        <Address />
        <PhoneNumberInput
          field="pharmacyZip"
          label="ZIP Code"
          placeholder="ZIP Code"
          format="#####"
        />
        <CitySelect />
        <StateSelect />
        <PhoneNumberInput
          field="pharmacyPhone"
          label="Phone Number"
          placeholder="Add Phone"
        />
        <Button
          size="1"
          color="gray"
          className="text-black"
          variant="outline"
          type="button"
          onClick={handleReset}
        >
          Clear
        </Button>
        <Button type="submit" size="1" highContrast>
          <MagnifyingGlassIcon width="14px" height="14px" />
        </Button>
      </Flex>
    </FormContainer>
  )
}

export { PharmacyFilterForm, schema, type FilterSchemaType }
