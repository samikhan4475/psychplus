'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { ToggleableForm } from '@/components-v2'
import { addPharmacyAction } from '@/features/pharmacy/actions'
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
  toggleAddPharmacyForm: () => void
}

const AddPharmacy = ({ toggleAddPharmacyForm }: AddPharmacyProps) => {
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

  return (
    <Flex direction="column" gap="2">
      <Text className="mb-3 text-[24px] font-medium">Pharmacy</Text>
      <ToggleableForm
        form={form}
        submitAction={(data) => addPharmacyAction(data.id)}
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
