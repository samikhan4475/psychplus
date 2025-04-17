'use client'

import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getAllOrganizationsOptionsAction } from '../../actions'

const FromOrganizationSelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel>Organization</FormFieldLabel>
      <AsyncSelect
        field="fromOrganizationId"
        fetchOptions={getAllOrganizationsOptionsAction}
        size="1"
        buttonClassName="w-full h-6"
      />
      <FormFieldError name="fromOrganizationId" />
    </FormFieldContainer>
  )
}

export { FromOrganizationSelect }
