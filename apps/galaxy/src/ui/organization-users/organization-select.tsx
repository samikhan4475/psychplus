'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SelectOptionType } from '@/types'
import { getAllOrganizationsListAction } from '../organization-practice/actions'

const OrganizationSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const [loading, setLoading] = useState(true)
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getAllOrganizationsListAction({
        payload: {
          organizationId: id,
        },
      })

      if (response.state === 'error') {
        toast.error(response.error)
        setLoading(false)
        return
      }
      const organizationSelect = response.data?.organizations.map((org) => ({
        value: org.id,
        label: org.displayName,
      }))
      setOrganizations(organizationSelect)
      setLoading(false)
    })()
  }, [id])

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <SelectInput
        options={organizations}
        value={id}
        field="organizations"
        buttonClassName="h-6 min-w-[108px] flex-1"
        disabled
        loading={loading}
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
