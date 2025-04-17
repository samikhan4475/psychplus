'use client'

import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  FormFieldContainer,
  FormFieldLabel,
  MultiSelectField,
} from '@/components'
import { SelectOptionType } from '@/types'
import { getAllOrganizationsListAction } from '../organization-practice/actions'
import { SchemaType } from './organization-users-list-filter-form'

const OrganizationSelect = () => {
  const [organizations, setOrganizations] = useState<SelectOptionType[]>([])
  const form = useFormContext<SchemaType>()
  useEffect(() => {
    getAllOrganizationsListAction({}).then((result) => {
      if (result.state === 'success') {
        const organizationSelect = result.data?.organizations.map((org) => ({
          value: org.id,
          label: org.displayName,
        }))
        setOrganizations(organizationSelect)
      } else if (result.state === 'error') {
        toast.error(result.error)
      }
    })
  }, [])
  const organization = form.watch('organizations')

  return (
    <FormFieldContainer className="flex-row items-center gap-2">
      <FormFieldLabel className="!text-1">Organization</FormFieldLabel>
      <MultiSelectField
        options={organizations}
        defaultValues={organization}
        onChange={(values) => form.setValue('organizations', values)}
        className="h-6 min-w-[108px] flex-1"
      />
    </FormFieldContainer>
  )
}

export { OrganizationSelect }
