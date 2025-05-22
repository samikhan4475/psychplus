'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { Role } from '@/types'
import { sanitizeFormData } from '@/utils'
import { updateRoleAction } from './actions'
import { OrganizationInfoFields } from './organization-info-fields'
import { ProfileHeader } from './profile-header'

const ProfileSchema = z.object({
  id: z.string(),
  shortName: z.string().min(1, { message: 'Title is required' }),
  recordStatus: z.string().optional(),
  displayName: z.string().min(1, { message: 'Display name is required' }),
  actorCategory: z.string().optional(),
})

type ProfileSchemaType = z.infer<typeof ProfileSchema>
interface ProfileFormProps {
  defaultValues: Role
}

const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const { roleId } = useParams<{ roleId: string }>()

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      ...defaultValues,
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: ProfileSchemaType) => {
    const reqPayload: Partial<Role> = {
      ...data,
      organizationId: defaultValues.organizationId,
      id: roleId,
    }
    const sanitizedPayload = sanitizeFormData(reqPayload)
    const response = await updateRoleAction(sanitizedPayload, roleId)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    toast.success('Record has been saved successfully')
  }

  return (
    <FormContainer
      form={form}
      className="bg-white mb-4 w-full overflow-hidden rounded-1 shadow-2"
      onSubmit={onSubmit}
    >
      <ProfileHeader />
      <OrganizationInfoFields />
    </FormContainer>
  )
}

export { ProfileForm, type ProfileSchemaType }
