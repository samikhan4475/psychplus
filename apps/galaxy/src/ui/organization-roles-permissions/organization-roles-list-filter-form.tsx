'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Button, Grid } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { ClearButton } from './clear-button'
import { DisplayNameField } from './display-name-field'
import { RoleSelect } from './role-select'
import { StaffTypeSelect } from './staff-type-select'
import { StatusSelect } from './status-select'
import { useStore } from './store'
import { StaffSearchParams } from './types'

const schema = z.object({
  roleId: z.string().optional(),
  recordStatus: z.string().optional(),
  partialDisplayName: z.string().optional(),
  actorCategory: z.string().optional(),
})

type SchemaType = z.infer<typeof schema>

const OrganizationRolesListFilterForm = () => {
  const { id } = useParams<{ id: string }>()
  const { search } = useStore((state) => ({
    search: state.search,
    showFilters: state.showFilters,
  }))

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      roleId: '',
      recordStatus: '',
      partialDisplayName: '',
      actorCategory: '',
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = (data) => {
    const formattedData = {
      ...data,
      roleIds: data.roleId ? [data.roleId] : [],
      organizationId: id ?? '',
      recordStatuses: data.recordStatus ? [data.recordStatus] : undefined,
    }
    const cleanedData = sanitizeFormData(formattedData) as StaffSearchParams
    return search(cleanedData)
  }

  return (
    <FormContainer
      className="bg-white flex flex-wrap gap-4 rounded-b-2 rounded-t-1 px-2 py-1 shadow-2"
      form={form}
      onSubmit={onSubmit}
    >
      <Grid columns="12" gap="2" className="flex">
        <RoleSelect />
        <StaffTypeSelect />
        <DisplayNameField />
        <StatusSelect />
        <ClearButton />
        <Button highContrast size="1" type="submit">
          <MagnifyingGlassIcon strokeWidth={2} />
        </Button>
      </Grid>
    </FormContainer>
  )
}

export { OrganizationRolesListFilterForm, type SchemaType }
