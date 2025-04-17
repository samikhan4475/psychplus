'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { Organization, PracticeResource } from '@/types'
import { sanitizeFormData } from '@/utils'
import { updatePracticeAction } from './actions'
import { AddressGroup } from './address-group'
import { defaultValues } from './default-values'
import { PracticeInfoFields } from './practice-info-fields'
import { ProfileContentHeading } from './profile-content-heading'
import { ProfileHeader } from './profile-header'

const ProfileSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Name is required' }),
  npi: z.string().min(1, { message: 'NPI is required' }),
  taxId: z.string().optional(),
  taxonomy: z.string().optional(),
  clia: z.string().optional(),
  organizationId: z.string(),
  practicePhone: z.string().optional(),
  practiceFax: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  payer: z.object({
    street1: z.string().min(1, { message: 'Address is required' }),
    street2: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().min(1, { message: 'Zip is required' }),
  }),
  recordStatus: z.string().optional(),
  sameAsOrganizationAddress: z.boolean().optional().default(true),
  sameAsPrimaryAddress: z.boolean().optional().default(true),
})

type ProfileSchemaType = z.infer<typeof ProfileSchema>

interface ProfileFormProps {
  practice: PracticeResource
  organization?: Organization
}

const ProfileForm = ({ practice, organization }: ProfileFormProps) => {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(ProfileSchema),
    reValidateMode: 'onSubmit',
    defaultValues: defaultValues(practice),
    mode: 'onChange',
  })

  const onSubmit: SubmitHandler<ProfileSchemaType> = async (
    formData: ProfileSchemaType,
  ) => {
    const requestPayload: Partial<PracticeResource> = {
      ...formData,
      displayName: formData.name,
      shortName: formData.name,
      practiceAddress: {
        street1: formData.address1,
        street2: formData.address2 ?? '',
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        type: 'Business',
      },
      practicePaymentAddress: {
        street1: formData.payer.street1 ?? '',
        street2: formData.payer.street2 ?? '',
        city: formData.payer.city,
        state: formData.payer.state,
        postalCode: formData.payer.postalCode,
        type: 'Business',
      },
    }

    const sanitizedPayload = sanitizeFormData(requestPayload)

    const response = await updatePracticeAction(
      sanitizedPayload,
      formData.organizationId,
      formData.id,
    )

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.data) {
      form.reset()
      toast.success('Record has been saved successfully')
    } else {
      toast.error('Unable to save record')
    }
  }
  return (
    <FormContainer
      form={form}
      className="mb-4 w-full overflow-hidden rounded-1 shadow-2"
      onSubmit={onSubmit}
    >
      <ProfileHeader />
      <ProfileContentHeading title="Practice Info" />
      <PracticeInfoFields />
      <ProfileContentHeading title="Address" />
      <AddressGroup organization={organization} />
    </FormContainer>
  )
}

export { ProfileForm, type ProfileSchemaType }
