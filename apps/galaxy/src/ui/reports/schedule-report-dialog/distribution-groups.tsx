'use client'

import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { TagsMultiSelect } from '../add-template-dialog/tag-multi-select'

const DistributionGroupsSelect = () => {

  return (
    <FormFieldContainer className="w-full">
      <FormFieldLabel className="!text-1 mt-3" required>
        Distribution Groups
      </FormFieldLabel>
      <TagsMultiSelect
        name="distributionGroups"
        codeset="testCodeset"
        placeholder="Select codes"
        disabled
      />
      <FormFieldError name="code" />
    </FormFieldContainer>
  )
}
export { DistributionGroupsSelect }

