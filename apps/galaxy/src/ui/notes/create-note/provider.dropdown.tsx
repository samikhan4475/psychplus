'use client'

import { Flex } from '@radix-ui/themes'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const ProviderDropdown = () => {
  const { appointment } = useStore()

  const options = [
    {
      label: appointment?.providerName as string,
      value: appointment?.physicianStaffId as string,
    },
  ]

  return (
    <Flex direction="column" gap="1" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Provider
      </FormFieldLabel>
      <SelectInput
        placeholder=""
        field="provider"
        options={options}
        value={appointment?.physicianStaffId as string}
        disabled
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="provider" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { ProviderDropdown }
