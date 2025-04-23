'use client'

import { TextField } from '@radix-ui/themes'
import { TextInput } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'
import { SchemaType } from '../schema'

interface CosignerTextFieldProps
  extends React.ComponentProps<typeof TextField.Root> {
  label: string
  field: keyof SchemaType
  isAdminView: boolean
}
const CosignerTextField = ({
  label,
  field,
  isAdminView,
}: CosignerTextFieldProps) => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className={'!text-1'}>{label}</FormFieldLabel>
      <TextInput
        field={field}
        placeHolder="Enter Text"
        disabled={!isAdminView}
        className={
          'border-pp-gray-2 h-7 w-full border border-solid !outline-none [box-shadow:none]'
        }
      />
      <FormFieldError name={field} />
    </FormFieldContainer>
  )
}

export { CosignerTextField }
