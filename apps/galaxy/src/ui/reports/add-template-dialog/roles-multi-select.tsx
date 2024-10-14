'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { TagsMultiSelect } from './tag-multi-select'

const RolesMultiSelect = () => {

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1 mt-2">
        Permitted Roles
      </FormFieldLabel>
      <TagsMultiSelect
        name="selectedCodes"
        codeset="testCodeset"
        placeholder="Select codes"
      />
      <FormFieldError name="code" />
    </FormFieldContainer>
  )
}
export { RolesMultiSelect }

