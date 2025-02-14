'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionErrorState } from '@psychplus-v2/api'
import { Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { ToggleableForm } from '@/components-v2'
import { addPharmacyAction } from '@/features/pharmacy/actions'
import { PatientPharmacy } from '@/features/pharmacy/types'
import { useToast } from '@/providers'
import { pharmacySchema, PharmacySchemaType } from '../pharmacy-schema'
import {
  AddressBlock,
  CityBlock,
  NameBlock,
  PhoneBlock,
  StateBlock,
  ZipCodeBlock,
} from './blocks'

type AddPharmacyProps = {
  pharmacies: PatientPharmacy[]
  toggleAddPharmacyForm: () => void
}

const AddPharmacy = ({
  pharmacies,
  toggleAddPharmacyForm,
}: AddPharmacyProps) => {
  const form = useForm<PharmacySchemaType>({
    resolver: zodResolver(pharmacySchema),
  })
  const router = useRouter()
  const { toast } = useToast()

  const handleSuccess = () => {
    toast({ type: 'success', title: 'Pharmacy Added' })
    toggleAddPharmacyForm()
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
    <Flex direction="column" gap="2">
      <Text className="mb-3 text-[24px] font-medium">Pharmacy</Text>
      <ToggleableForm
        form={form}
        submitAction={(data) => submitAction(data)}
        onSuccess={handleSuccess}
        onFormClose={toggleAddPharmacyForm}
      >
        <Flex gap="2" width="100%">
          <NameBlock />
          <AddressBlock />
          <ZipCodeBlock />
        </Flex>
        <Flex gap="3" width="100%" className="my-3">
          <CityBlock />
          <StateBlock />
          <PhoneBlock />
        </Flex>
      </ToggleableForm>
    </Flex>
  )
}

export { AddPharmacy }
