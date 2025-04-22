'use client'

import {
  AsyncSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { getOrganizationOptionsAction } from '../../actions'

interface OrganizationSelectProps {
  organizationId: string
}

const OrganizationSelect = ({ organizationId }: OrganizationSelectProps) => {
  return (
    <FormFieldContainer className="flex w-full">
      <FormFieldLabel className="pb-[3px]">Organization</FormFieldLabel>
      <AsyncSelect
        field="organizationId"
        placeholder="Select"
        fetchOptions={() =>
          getOrganizationOptionsAction({
            payload: {
              organizationId: organizationId,
            },
          })
        }
        buttonClassName="w-full border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none]"
        tooltip
        disabled
      />
      <FormFieldError name="organizationId" />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
