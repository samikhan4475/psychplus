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
import { updatePatientReferralAction } from '../actions'
import { CommentsInput } from './comments-input'
import { ContactStatusSelector } from './contact-status-selector'
import { ProviderSelector } from './provider-selector'
import { ReferralStatusSelector } from './referral-status-selector'
import { ServiceSelect } from './service-select'
import { ServiceStatusSelect } from './service-status-selector'

const schema = z.object({
  service: z.string(),
  servicesStatus: z.string(),
  comments: z.string(),
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

interface EditReferralFormProps {
  onClose?: () => void
  handleCloseDialog: () => void
  referral: PatientReferral
}
const EditReferralForm = ({
  referral,
  onClose,
  handleCloseDialog,
}: EditReferralFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      service: referral.service,
      servicesStatus: referral.servicesStatus,
      contactStatus:
        referral.contactStatus === CODE_NOT_SET
          ? undefined
          : referral.contactStatus,
      resourceStatus: referral.resourceStatus,
      comments: referral.comments,
      referredByName: referral.referredByName,
    },
  })
  const [error, setError] = useState<string>()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)

    const response = await updatePatientReferralAction({ ...referral, ...data })

    if (response.state === 'error') {
      toast.error(response.error)
      return
    }
    toast.success('Updated successfully!')
    onClose?.()
    handleCloseDialog()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <FormError message={error} />
      <Grid columns="2" gap="2">
        <ServiceSelect />
        <ServiceStatusSelect />
        <ProviderSelector />
        <ContactStatusSelector />
        <ReferralStatusSelector />
        <CommentsInput />
      </Grid>
      <Separator
        className="border-pp-grey my-4 w-full"
        orientation="horizontal"
      />
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
    </FormContainer>
  )
}

export { EditReferralForm, type SchemaType }
