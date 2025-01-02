'use client'

import { getProvidersOptionsAction } from '@/actions'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { Appointment } from '@/types'

const CosignerSelect = ({ appointment }: { appointment?: Appointment }) => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="text-1 leading-[16px]">
        Cosigner
      </FormFieldLabel>
      <AsyncSelect
        field="cosignerStaffId"
        placeholder="Select"
        fetchOptions={() =>
          getProvidersOptionsAction(appointment?.providerType)
        }
        buttonClassName="w-[120px] h-6"
        className="h-6 flex-1"
      />
    </FormFieldContainer>
  )
}

export { CosignerSelect }
