'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel, SelectInput } from '@/components'
import { Appointment } from '@/types'
import { CreateNoteSchema } from './schema'

const ProviderDropdown = ({ appointment }: { appointment?: Appointment }) => {
  const form = useFormContext<CreateNoteSchema>()
  const options = [
    {
      label: `${appointment?.providerName}`,
      value: `${appointment?.providerStaffId}`,
    },
  ]

  form.setValue('provider', `${appointment?.providerStaffId}`, {})

  return (
    <Flex direction="column" gap="1" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Provider
      </FormFieldLabel>
      <SelectInput
        placeholder=""
        field="provider"
        options={options}
        defaultValue={`${appointment?.providerStaffId}`}
        value={`${appointment?.providerStaffId}`}
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
