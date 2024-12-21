'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid, Separator } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer, FormError } from '@/components'
import { StaffResource } from '@/types'
import { DEFAULT_REFERRAL_SERVICE_STATUS } from '../patient-referrals-widget/constants'
import { isPrescriber } from '../patient-referrals-widget/utils'
import { createPatientReferralAction } from './actions'
import { CancelButton } from './cancel-button'
import { CommentsInput } from './comments-input'
import { ProviderSelector } from './provider-selector'
import { SaveButton } from './save-button'
import { ServiceSelect } from './service-select'
import { ServiceStatusSelect } from './service-status-selector'

const schema = z.object({
  patientId: z.string(),
  service: z.string(),
  servicesStatus: z.string(),
  comments: z.string().max(300, 'Max 300 characters allowed').optional(),
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

interface CreateReferralFormProps {
  patientId?: string
  staff: StaffResource
  onClose?: () => void
  handleCloseDialog: () => void
}
const CreateReferralForm = ({
  staff,
  patientId,
  onClose,
  handleCloseDialog,
}: CreateReferralFormProps) => {
  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: patientId,
      servicesStatus: DEFAULT_REFERRAL_SERVICE_STATUS,
      comments: '',
      referredByName: isPrescriber(staff)
        ? {
            firstName: staff?.legalName.firstName,
            lastName: staff?.legalName.lastName,
            honors: staff?.legalName.honors,
          }
        : undefined,
    },
  })
  const [error, setError] = useState<string>()

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)

    const response = await createPatientReferralAction(data)

    if (response.state === 'error') {
      toast.error(response?.error)
      return
    }

    toast.success('created successfully!')
    onClose?.()
    handleCloseDialog()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
      <FormError message={error} />
      <Grid columns="2" gap="2">
        <ServiceSelect />
        <ServiceStatusSelect />
        <ProviderSelector staff={staff} />
        <CommentsInput />
      </Grid>
      <Separator
        className="border-pp-grey my-4 w-full"
        orientation="horizontal"
      />
      <Flex gap="3" justify="end">
        <CancelButton />
        <SaveButton />
      </Flex>
    </FormContainer>
  )
}

export { CreateReferralForm, type SchemaType }
