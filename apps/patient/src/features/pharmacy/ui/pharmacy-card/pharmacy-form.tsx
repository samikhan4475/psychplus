'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionErrorState } from '@psychplus-v2/api'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { FormHeading, ToggleableForm } from '@/components-v2'
import { addPharmacyAction } from '@/features/pharmacy/actions'
import { PatientPharmacy } from '@/features/pharmacy/types'
import { useToast } from '@/providers'
import {
  AddressField,
  CityField,
  NameField,
  PhoneField,
  StateField,
  ZipCodeField,
} from './form-fields'
import { pharmacySchema, PharmacySchemaType } from './pharmacy-schema'

type AddPharmacyProps = {
  pharmacies: PatientPharmacy[]
  trigger?: React.ReactNode
  triggerClassName?: string
}

const PharmacyForm = ({
  pharmacies,
  trigger,
  triggerClassName,
}: AddPharmacyProps) => {
  const form = useForm<PharmacySchemaType>({
    resolver: zodResolver(pharmacySchema),
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({ type: 'success', title: 'Pharmacy Added' })

    router.refresh()
  }

  const submitAction = async (data: PharmacySchemaType) => {
    const pharmacyAlreadyExists = pharmacies.some(
      (pharmacy) => pharmacy.pharmacyName === data.pharmacyName,
    )

    if (pharmacyAlreadyExists) {
      return {
        state: 'error',
        error: 'Pharmacy already exists',
      } as ActionErrorState
    }

    return addPharmacyAction(data.id)
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={(data) => submitAction(data)}
      onSuccess={handleSuccess}
      trigger={trigger}
      triggerClassName={triggerClassName}
    >
      <FormHeading title="Add Pharmacy" />
      <Flex gap="2" width="100%">
        <NameField />
        <AddressField />
        <ZipCodeField />
      </Flex>
      <Flex gap="3" width="100%" className="my-3">
        <CityField />
        <StateField />
        <PhoneField />
      </Flex>
    </ToggleableForm>
  )
}

export { PharmacyForm }
