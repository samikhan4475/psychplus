'use client'

import { YesNoSelect } from '@/components'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components/form'

const SupportMultipleDirectoriesField = () => {
  return (
    <FormFieldContainer className="flex-1 gap-0">
      <FormFieldLabel>Support Multiple Directories</FormFieldLabel>
      <YesNoSelect field="isSupportMultipleDirectory" className="" />
      <FormFieldError name="website" />
    </FormFieldContainer>
  )
}

export { SupportMultipleDirectoriesField }
