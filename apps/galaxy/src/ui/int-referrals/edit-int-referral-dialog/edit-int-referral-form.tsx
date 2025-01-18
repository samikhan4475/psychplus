'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Dialog, Flex, Grid, Separator } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer, FormError } from '@/components'
import { CODE_NOT_SET } from '@/constants'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { CommentsInput } from '@/ui/referrals/edit-referral-dialog/comments-input'
import { ContactStatusSelector } from '@/ui/referrals/edit-referral-dialog/contact-status-selector'
import { ProviderSelector } from '@/ui/referrals/edit-referral-dialog/provider-selector'
import { ReferralStatusSelector } from '@/ui/referrals/edit-referral-dialog/referral-status-selector'
import { ServiceSelect } from '@/ui/referrals/edit-referral-dialog/service-select'
import { ServiceStatusSelect } from '@/ui/referrals/edit-referral-dialog/service-status-selector'

const schema = z.object({
  service: z.string(),
  servicesStatus: z.string(),
  comments: z
    .string()
    .max(300, 'Max 300 characters allowed')
    .min(1, 'Required'),
  contactStatus: z.string().optional(),
  resourceStatus: z.string(),
  referredByName: z
    .object({
      avatar: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      honors: z.string().optional(),
    })
    .optional(),
})

type SchemaType = z.infer<typeof schema>

interface EditIntReferralFormProps {
  onClose?: () => void
  handleCloseDialog: () => void
  referral: PatientReferral
}

const EditIntReferralForm = ({
  referral,
  onClose,
  handleCloseDialog,
}: EditIntReferralFormProps) => {
  const defaultFormValues = {
    service: referral.service,
    servicesStatus: referral.servicesStatus,
    contactStatus:
      referral.contactStatus === CODE_NOT_SET
        ? undefined
        : referral.contactStatus,
    resourceStatus: referral.resourceStatus,
    comments: referral.comments,
    referredByName: referral.referredByName,
  }

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: defaultFormValues,
  })

  const [formError, setFormError] = useState<string>()

  const handleSubmit: SubmitHandler<SchemaType> = async (data) => {
    setFormError(undefined)
    const response = await updatePatientReferralAction({ ...referral, ...data })

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }

    toast.success('Updated successfully!')
    onClose?.()
    handleCloseDialog()
  }

  const renderFormFields = () => (
    <Grid columns="2" gap="2">
      <ServiceSelect />
      <ServiceStatusSelect />
      <ProviderSelector />
      <ContactStatusSelector />
      <ReferralStatusSelector />
      <CommentsInput />
    </Grid>
  )

  const renderButtons = () => (
    <Flex gap="3" justify="end">
      <Dialog.Close>
        <Button variant="outline" color="gray" size="2">
          Cancel
        </Button>
      </Dialog.Close>
      <Button highContrast size="2">
        Save
      </Button>
    </Flex>
  )

  return (
    <FormContainer form={form} onSubmit={handleSubmit}>
      <FormError message={formError} />
      {renderFormFields()}
      <Separator
        className="border-pp-grey my-4 w-full"
        orientation="horizontal"
      />
      {renderButtons()}
    </FormContainer>
  )
}

export { EditIntReferralForm, type SchemaType }
