'use client'

import {
  AutoResizeInput,
  FormFieldContainer,
  FormFieldError,
} from '@/components'
import { BlockProps } from '../../types'

const ReferringOrganizationInput = ({ disabled = false }: BlockProps) => {
  return (
    <FormFieldContainer className="flex flex-row gap-2">
      <AutoResizeInput
        field="referringOrganizationOtherDetails"
        className="!min-w-32"
        maxLength={50}
        disabled={disabled}
      />
      <FormFieldError name="referringOrganizationOtherDetails" />
    </FormFieldContainer>
  )
}

export { ReferringOrganizationInput }
