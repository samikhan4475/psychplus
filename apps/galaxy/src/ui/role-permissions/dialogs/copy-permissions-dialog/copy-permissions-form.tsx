import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { associatePermissionAction, getRoleProfileAction } from '../../actions'
import { useStore } from '../../store'
import { FromOrganizationSelect } from './from-organization-select'
import { FromRoleSelect } from './from-role-select'
import { schema, type SchemaType } from './schema'
import { SubmitFormButton } from './submit-form-button'
import { ToOrganizationSelect } from './to-organization-select'
import { ToRoleSelect } from './to-role-select'

interface FormProps {
  onCloseModal: (open: boolean) => void
}

const RoleForm = ({ onCloseModal }: FormProps) => {
  const { roleProfile, refresh, setRefresh } = useStore((state) => ({
    roleProfile: state.roleProfile,
    setRefresh: state.setRefresh,
    refresh: state.refresh,
  }))
  const { id, roleId } = useParams<{ id: string; roleId: string }>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      toOrganizationId: id ?? '',
      toRoleId: roleId ?? '',
    },
  })

  const onSave = async (formData: SchemaType) => {
    const response = await getRoleProfileAction({
      payload: {
        roleIds: [formData.fromRoleId],
      },
    })
    if (response.state === 'success') {
      const role = response.data[0]

      if (role?.rolePermissions?.length) {
        const rolePermissions: string[] = []
        roleProfile?.rolePermissions?.forEach((permission) => {
          rolePermissions.push(permission.userPermissionId)
        })

        const permissionPromises = role.rolePermissions
          .filter(
            (record) => !rolePermissions.includes(record.userPermissionId),
          )
          .map((record) =>
            associatePermissionAction({
              userRoleId: roleId,
              userPermissionId: record.userPermissionId,
            }),
          )
        const results = await Promise.all(permissionPromises)
        const hasError = results.some((res) => res?.state === 'error')

        results.forEach((res) => {
          if (res?.state === 'error') {
            toast.error(res.error)
          }
        })

        if (hasError) {
          toast.error('Some permissions could not be copied.')
        } else {
          toast.success('Permissions copied successfully.')
        }
        setRefresh(!refresh)
      }
    }

    onCloseModal(false)
  }

  return (
    <FormContainer onSubmit={onSave} form={form}>
      <Box className="ml-1 mr-1 mt-2 pl-2 pr-2">
        <Grid columns="2" className="mb-2 mt-2 gap-3">
          <Flex direction="column" className="gap-2 border border-gray-5 p-2">
            <Flex gap="6">
              <Text className="text-black text-[16px]" weight="medium">
                From
              </Text>
            </Flex>
            <FromOrganizationSelect />
            <FromRoleSelect />
          </Flex>
          <Flex direction="column" className="gap-2 border border-gray-5 p-2">
            <Flex gap="6">
              <Text className="text-black text-[16px]" weight="medium">
                To
              </Text>
            </Flex>
            <ToOrganizationSelect />
            <ToRoleSelect />
          </Flex>
        </Grid>
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { RoleForm, type SchemaType }
