'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { ToggleableForm } from '@/components-v2'
import { pharmacySchema } from '../pharmacy-schema'
import AddressBlock from './blocks/address-block'
import CityBlock from './blocks/city-block'
import NameBlock from './blocks/name-block'
import PhoneBlock from './blocks/phone-block'
import StateBlock from './blocks/state-block'
import ZipCodeBlock from './blocks/zip-code-block'

type AddPharmacyProps = {
  setShouldShowAddView: (value: boolean) => void
}

const AddPharmacy = ({ setShouldShowAddView }: AddPharmacyProps) => {
  const form = useForm({
    resolver: zodResolver(pharmacySchema),
    reValidateMode: 'onChange',
  })
  return (
    <Flex direction={'column'} gap={'2'}>
      <Text className="mb-3 text-[24px] font-medium">Pharmacy</Text>
      <ToggleableForm
        form={form}
        submitAction={async (data) => {
          return {
            state: 'success',
          } as any
        }}
        onSuccess={(data) => {
          console.log('')
        }}
        onFormClose={() => setShouldShowAddView(false)}
      >
        <Flex gap={'2'} width={'100%'}>
          <NameBlock />
          <AddressBlock />
          <ZipCodeBlock />
        </Flex>
        <Flex gap={'3'} width={'100%'} className="my-3">
          <CityBlock />
          <StateBlock />
          <PhoneBlock />
        </Flex>
      </ToggleableForm>
    </Flex>
  )
}

export default AddPharmacy
