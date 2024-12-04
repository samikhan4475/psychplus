'use client'

import { Flex } from '@radix-ui/themes'
import { getProvidersOptionsAction } from '@/actions'
import {
  AsyncSelect,
  FormFieldError,
  FormFieldLabel,
  SelectInput,
} from '@/components'
import { Appointment } from '@/types'

const CosignerDropdown = ({ appointment }: { appointment?: Appointment }) => {
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Cosigner
      </FormFieldLabel>
      <AsyncSelect
        field="cosigner"
        placeholder="Select Cosigner"
        fetchOptions={() =>
          getProvidersOptionsAction(appointment?.providerType)
        }
        buttonClassName={buttonClassName}
      />
      <FormFieldError name="cosigner" />
    </Flex>
  )
}

const buttonClassName =
  'border-pp-gray-2 w-full h-6 border border-solid !outline-none [box-shadow:none]'
export { CosignerDropdown }
