'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Flex } from '@radix-ui/themes'
import { Box } from 'lucide-react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { Organization, PracticeResource } from '@/types'
import { sanitizeFormData, zipLast4Schema } from '@/utils'
import { PracticeSettingsFields } from '../organization-practice/dialogs/practice-dialog/practice-settings-fields'
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
  defaultProviderStaffId: z.string().optional(),
  defaultClearinghouseReceiverId: z.string().min(1, 'Required'),
  practicePhone: z.string().optional(),
  practiceFax: z.string().optional(),
  address1: z.string().min(1, { message: 'Address is required' }),
  address2: z.string().optional(),
  city: z.string().min(1, { message: 'City is required' }),
  state: z.string().min(1, { message: 'State is required' }),
  zip: z.string().min(1, { message: 'Zip is required' }),
  postalPlus4Code: zipLast4Schema,
  payer: z.object({
    street1: z.string().min(1, { message: 'Address is required' }),
    street2: z.string().optional(),
    city: z.string().min(1, { message: 'City is required' }),
    state: z.string().min(1, { message: 'State is required' }),
    postalCode: z.string().min(1, { message: 'Zip is required' }),
    postalPlus4Code: zipLast4Schema,
  }),
  recordStatus: z.string().optional(),
  sameAsOrganizationAddress: z.boolean().optional().default(true),
  sameAsPrimaryAddress: z.boolean().optional().default(true),
  isMailingAddressSameAsOrganization: z.string().optional(),
  isMailingAddressSameAsPrimary: z.string().optional(),
  isAutoSubmissionEnabled: z.string().min(1, 'Required'),
  isAutoPaymentPostingEnabled: z.string().min(1, 'Required'),
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
      defaultProviderStaffId: formData.defaultProviderStaffId
        ? +formData.defaultProviderStaffId
        : undefined,
      displayName: formData.name,
      shortName: formData.name,
      practiceAddress: {
        street1: formData.address1,
        street2: formData.address2 ?? '',
        city: formData.city,
        state: formData.state,
        postalCode: formData.zip,
        postalPlus4Code: formData.postalPlus4Code,
        type: 'Business',
      },
      practicePaymentAddress: {
        street1: formData.payer.street1 ?? '',
        street2: formData.payer.street2 ?? '',
        city: formData.payer.city,
        state: formData.payer.state,
        postalCode: formData.payer.postalCode,
        postalPlus4Code: formData.postalPlus4Code,
        type: 'Business',
      },
      practiceAddressId: practice.practiceAddressId,
      paymentAddressId: practice.paymentAddressId,
    }

    const sanitizedPayload = sanitizeFormData(requestPayload)

    const response = await updatePracticeAction(
      {
        ...sanitizedPayload,
        isAutoPaymentPostingEnabled:
          formData.isAutoPaymentPostingEnabled === 'Yes',
        isAutoSubmissionEnabled: formData.isAutoSubmissionEnabled === 'Yes',
      },
      formData.organizationId,
      formData.id,
    )

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    if (response.data) {
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
      <ProfileContentHeading title="Practice Setting" />
      <Flex gap="2" px="2" py="1" className="bg-white w-full">
        <PracticeSettingsFields />
      </Flex>
    </FormContainer>
  )
}

export { ProfileForm, type ProfileSchemaType }
