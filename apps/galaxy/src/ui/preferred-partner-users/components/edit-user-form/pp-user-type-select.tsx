'use client'

import { useFormContext } from 'react-hook-form'
import {
  DropdownSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { EditUserSchemaType } from '../edit-user-schema'
import { PP_USER_TYPES, PP_USER_TYPE_OPTIONS } from '../../constants'

interface PPUserTypeSelectProps {
  options?: typeof PP_USER_TYPE_OPTIONS
}

const PPUserTypeSelect = ({ options = PP_USER_TYPE_OPTIONS }: PPUserTypeSelectProps) => {
  const form = useFormContext<EditUserSchemaType>()

  return (
    <FormFieldContainer className="gap-1">
      <FormFieldLabel required>
        PP User Type
      </FormFieldLabel>
      <DropdownSelect
        field="ppUserType"
        options={options}
        placeholder="Select type"
        buttonClassName="h-6 w-full"
        onValueChange={(value) => {
          form.setValue('ppUserType', value, { shouldDirty: true })
          
          if (value === PP_USER_TYPES.INDIVIDUAL) {
            form.setValue('selectedPartnerId', '', { shouldDirty: true })
          }
        }}
      />
      <FormFieldError name="ppUserType" />
    </FormFieldContainer>
  )
}

export { PPUserTypeSelect }
