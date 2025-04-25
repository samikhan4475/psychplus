'use client'

import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import z from 'zod'
import { FormContainer, LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import {
  associatePermissionAction,
  disAssociatePermissionAction,
  getRoleProfileAction,
} from './actions'
import { OrganizationInfoFields } from './organization-info-fields'
import { PermissionsListTable } from './permissions-list-table'
import { ProfileHeader } from './profile-header'
import { useStore } from './store'
import { getPermissionSectionTitle } from './utils'

const Schema = z.object({
  permissionSection: z.string().optional(),
  roleId: z.string(),
  organizationId: z.string().optional(),
  practiceId: z.string().optional(),
  staffId: z.string().optional(),
})

type SchemaType = z.infer<typeof Schema>

const ProfileForm = () => {
  const {
    setSelectedPermissions,
    setRoleProfile,
    roleProfile,
    selectedPermissions,
  } = useStore((state) => ({
    setSelectedPermissions: state.setSelectedPermissions,
    setRoleProfile: state.setRoleProfile,
    roleProfile: state.roleProfile,
    selectedPermissions: state.selectedPermissions,
  }))
  const [loading, setLoading] = useState(true)
  const { id, roleId } = useParams<{ id: string; roleId: string }>()
  const codes = useCodesetCodes(CODESETS.PermissionSection)
  const options = useMemo(() => {
    return codes.map((code) => ({
      label: code.display,
      value: code.value,
    }))
  }, [codes])

  const form = useForm<SchemaType>({
    resolver: zodResolver(Schema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      permissionSection: '',
      organizationId: id,
    },
    mode: 'onChange',
  })
  let selectedPermissionsId = form.watch('permissionSection') ?? ''

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getRoleProfileAction({
        payload: {
          roleIds: [roleId],
        },
      })
      if (response.state === 'success') {
        const role = response.data[0]
        setRoleProfile(role)
        form.setValue('roleId', role.id)

        const compiled: Record<string, string[]> = {}
        role.rolePermissions?.forEach((permission) => {
          if (compiled[permission.permission.displaySectionCode]) {
            compiled[permission.permission.displaySectionCode].push(
              permission.permission.id,
            )
          } else {
            compiled[permission.permission.displaySectionCode] = [
              permission.permission.id,
            ]
          }
        })
        setSelectedPermissions(compiled)
        selectedPermissionsId = 'all'
        setLoading(false)
      }
    })()
  }, [roleId])

  const onSubmit = async () => {
    const existingPermissions = new Set(
      roleProfile?.rolePermissions?.map((p) => p.userPermissionId) || [],
    )

    const selected = new Set(Object.values(selectedPermissions).flat())

    const toAssociate = [...selected].filter(
      (id) => !existingPermissions.has(id),
    )
    const toDisassociate = [...existingPermissions].filter(
      (id) => !selected.has(id),
    )

    // No changes – show toast and exit early
    if (toAssociate.length === 0 && toDisassociate.length === 0) {
      toast.success('No permission changes detected')
      return
    }

    const associatePromises = toAssociate.map((id) =>
      associatePermissionAction({
        userRoleId: roleId,
        userPermissionId: id,
      }),
    )

    const disassociatePromises = toDisassociate.map((id) =>
      disAssociatePermissionAction({
        userRoleId: roleId,
        userPermissionId: id,
      }),
    )

    const results = await Promise.all([
      ...associatePromises,
      ...disassociatePromises,
    ])

    const hasError = results.some((res) => res.state === 'error')

    results.forEach((res) => {
      if (res.state === 'error') {
        toast.error(res.error)
      }
    })

    if (!hasError) {
      toast.success('Permissions saved successfully')
    }
    const response = await getRoleProfileAction({
      payload: {
        roleIds: [roleId],
      },
    })

    if (response.state === 'success') {
      setRoleProfile(response.data[0])
    }
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center" className="w-full">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <FormContainer
      form={form}
      className="bg-white mb-4 w-full overflow-hidden rounded-1 shadow-2"
      onSubmit={onSubmit}
    >
      <ProfileHeader />
      <OrganizationInfoFields selectedPermissionsId={selectedPermissionsId} />

      {selectedPermissionsId === 'all' &&
        options.map((option) => (
          <Flex className="mt-4" key={option.value} direction="column">
            <PermissionsListTable
              permissionId={option.value}
              title={option.label}
            />
          </Flex>
        ))}

      {selectedPermissionsId && selectedPermissionsId !== 'all' && (
        <PermissionsListTable
          permissionId={selectedPermissionsId}
          title={getPermissionSectionTitle(selectedPermissionsId, options)}
        />
      )}
    </FormContainer>
  )
}

export { ProfileForm, type SchemaType }
