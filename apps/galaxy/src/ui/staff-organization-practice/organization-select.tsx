'use client'

import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { AsyncSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { PermissionAlert } from '@/ui/schedule/shared'
import { getOrganizationOptionsAction } from './actions'
import { useStore } from './store'

const OrganizationSelect = () => {
  const form = useFormContext()
  const staffOrganizations = useStore((state) => state.staffOrganizations)
  const [isOpen, setIsOpen] = useState(false)

  const onValueChange = (value: string) => {
    if (staffOrganizations?.includes(value)) {
      form.setValue('organizationId', value)
    } else {
      setIsOpen(true)
    }
  }

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <AsyncSelect
        field="organizationId"
        fetchOptions={getOrganizationOptionsAction}
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] w-[200px]"
        onValueChange={onValueChange}
      />

      <PermissionAlert
        message="You do not have permission to select this organization. Please contact your supervisor if you need any further assistance."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
