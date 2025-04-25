'use client'

import { useEffect, useState } from 'react'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { PermissionAlert } from '@/ui/schedule/shared'
import { getOrganizationOptionsAction } from './actions'

interface OrganizationSelectProps {
  userId: string
}

const OrganizationSelect = ({ userId }: OrganizationSelectProps) => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    ;(async () => {
      if (userId) {
        setLoading(true)
        const result = await getOrganizationOptionsAction({
          userId,
        })
        if (result.state === 'success') {
          setOrganizations(result.data)
        }
        setLoading(false)
      }
    })()
  }, [userId])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>

      <SelectInput
        field="organizationId"
        options={organizations}
        placeholder="Select"
        buttonClassName="border-pp-gray-2 h-6 w-full border border-solid !outline-none [box-shadow:none] w-[200px]"
        className="w-full"
        loading={loading}
        disabled={loading}
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
