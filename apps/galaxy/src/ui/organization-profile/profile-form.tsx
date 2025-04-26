'use client'

import { useParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { sanitizeFormData } from '@/utils'
import { updateOrganizationAction } from '../organization-practice/actions'
import { Organization } from '../organization-practice/types'
import { AddressGroup } from './address-group'
import { OrganizationInfoFields } from './organization-info-fields'
import { ProfileContentHeading } from './profile-content-heading'
import { ProfileHeader } from './profile-header'

const ProfileSchema = z.object({
  id: z.string(),
  contactName: z.string().optional(),
  shortName: z.string().optional(),
  displayName: z.string().min(1, { message: 'Organization name is required' }),
  recordStatus: z.string().min(1, { message: 'Required' }),
  postalCode: z.string().optional(),
  contactPhone: z.string().optional(),
  locationId: z.string().optional(),
  contactEmail: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'Required' }),
  state: z.string().min(1, { message: 'Required' }),
  zip: z.string().min(1, { message: 'Required' }),
})

type ProfileSchemaType = z.infer<typeof ProfileSchema>
interface ProfileFormProps {
  defaultValues: Organization
}

const ProfileForm = ({ defaultValues }: ProfileFormProps) => {
  const { id } = useParams<{ id: string }>()

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    reValidateMode: 'onSubmit',
    defaultValues: {
      ...defaultValues,
      displayName: defaultValues.displayName ?? '',
      address1: defaultValues.organizationAddress
        ? defaultValues.organizationAddress.street1
        : '',
      address2: defaultValues.organizationAddress?.street2 ?? '',
      zip: defaultValues.organizationAddress?.postalCode ?? '',
      state: defaultValues.organizationAddress?.state ?? '',
      city: defaultValues.organizationAddress?.city ?? '',
    },
    mode: 'onChange',
  })

  const onSubmit = async (data: ProfileSchemaType) => {
    const reqPayload: Partial<Organization> = {
      ...data,
      id,
      organizationAddress: {
        street1: data.address1,
        street2: data.address2 ?? '',
        city: data.city,
        state: data.state,
        postalCode: data.zip,
        type: 'Business',
      },
    }
    const sanitizedPayload = sanitizeFormData(reqPayload)
    const response = await updateOrganizationAction(sanitizedPayload, id)

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.data) {
      toast.success('Record has been saved successfully')
    } else {
      toast.error('Unable to update record')
    }
  }

  return (
    <FormContainer
      form={form}
      className="bg-white mb-4 w-full overflow-hidden rounded-1 shadow-2"
      onSubmit={onSubmit}
    >
      <ProfileHeader />
      <ProfileContentHeading title="Organization Info" />
      <OrganizationInfoFields />
      <ProfileContentHeading title="Address" />
      <AddressGroup />
    </FormContainer>
  )
}

export { ProfileForm, type ProfileSchemaType }
