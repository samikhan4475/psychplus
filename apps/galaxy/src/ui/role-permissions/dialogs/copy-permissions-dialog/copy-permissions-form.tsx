import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { FormContainer } from '@/components'
import { associatePermissionAction, getPracticeAction } from '../../actions'
import { useStore } from '../../store'
import { FromOrganizationSelect } from './from-organization-select'
import { FromPracticeSelect } from './from-practice-select'
import { FromRoleSelect } from './from-role-select'
import { FromStaffSelect } from './from-staff-select'
import { schema, type SchemaType } from './schema'
import { SubmitFormButton } from './submit-form-button'
import { ToOrganizationSelect } from './to-organization-select'
import { ToPracticeSelect } from './to-practice-select'
import { ToRoleSelect } from './to-role-select'
import { ToStaffSelect } from './to-staff-select'

interface FormProps {
  onCloseModal: (open: boolean) => void
}

const RoleForm = ({ onCloseModal }: FormProps) => {
  const { roleProfile } = useStore((state) => ({
    roleProfile: state.roleProfile,
  }))
  const { id, roleId } = useParams<{ id: string; roleId: string }>()
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      toOrganizationId: id ?? '',
      toRoleId: roleId ?? '',
      toPracticeId: 'all',
      toUserId: 'all',
    },
  })

  const onSave = async (formData: SchemaType) => {
    const fromUserId = parseInt(formData.fromUserId)
    const practiceResponse = await getPracticeAction({
      payload: {
        practiceId: formData.fromPracticeId,
        staffuserId: fromUserId,
      },
    })

    if (practiceResponse.state === 'error') {
      toast.error(practiceResponse.error)
      return
    }

    const practice = practiceResponse.data[0]

    const selectedFromUser = practice.users?.find(
      (user) => parseInt(user.id) === fromUserId,
    )

    const selectedRole = selectedFromUser?.userRoles?.find(
      (role) => role.id === formData.fromRoleId,
    )

    if (selectedRole?.rolePermissions?.length) {
      const rolePermissions: string[] = []
      roleProfile?.rolePermissions?.forEach((permission) => {
        rolePermissions.push(permission.userPermissionId)
      })

      const permissionPromises = selectedRole.rolePermissions
        .filter((record) => !rolePermissions.includes(record.userPermissionId))
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
            <FromPracticeSelect />
            <FromStaffSelect />
            <FromRoleSelect />
          </Flex>
          <Flex direction="column" className="gap-2 border border-gray-5 p-2">
            <Flex gap="6">
              <Text className="text-black text-[16px]" weight="medium">
                To
              </Text>
            </Flex>
            <ToOrganizationSelect />
            <ToPracticeSelect />
            <ToStaffSelect />
            <ToRoleSelect />
          </Flex>
        </Grid>
      </Box>
      <SubmitFormButton />
    </FormContainer>
  )
}

export { RoleForm, type SchemaType }
