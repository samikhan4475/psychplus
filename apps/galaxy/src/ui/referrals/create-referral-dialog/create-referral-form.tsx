'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Flex, Grid, Separator } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { FormContainer, FormError } from '@/components'
import { StaffResource } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { sanitizeFormData, sendEvent } from '@/utils'
import { DEFAULT_REFERRAL_SERVICE_STATUS } from '../patient-referrals-widget/constants'
import { isPrescriber } from '../patient-referrals-widget/utils'
import { createPatientReferralAction } from './actions'
import { CancelButton } from './cancel-button'
import { CommentsInput } from './comments-input'
import { ConfirmDialog } from './confirm-dialog'
import { ProviderSelector } from './provider-selector'
import { SaveButton } from './save-button'
import { ServiceSelect } from './service-select'
import { ServiceStatusSelect } from './service-status-selector'

const REFERRAL_90_DAYS_ERROR = 'already exist'

const schema = z.object({
  patientId: z.string(),
  appointmentId: z.string().optional(),
  service: z.string(),
  servicesStatus: z.string(),
  isByPass90DayRule: z.boolean().optional(),
  comments: z
    .string()
    .max(300, 'Max 300 characters allowed')
    .min(1, 'Required'),
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
  appointmentId?: string
  staff: StaffResource
  onClose?: () => void
  handleCloseDialog: () => void
}
const CreateReferralForm = ({
  staff,
  patientId,
  onClose,
  appointmentId,
  handleCloseDialog,
}: CreateReferralFormProps) => {
  const { isQuickNoteView } = useQuickNoteUpdate()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    defaultValues: {
      patientId: patientId,
      appointmentId: appointmentId ?? undefined,
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
  const [confirm, setConfirm] =
    useState<(confirm: boolean) => void | undefined>()

  const handleError = async (error: string, data: SchemaType) => {
    if (!error.includes(REFERRAL_90_DAYS_ERROR)) {
      toast.error(error)
      return
    }
    setError(error)
    const confirmed = await new Promise<boolean>((resolve) => {
      setConfirm(() => resolve)
    })
    setConfirm(undefined)
    setError(undefined)
    if (!confirmed) {
      return
    }
    const retryResponse = await createPatientReferralAction({
      ...data,
      isByPass90DayRule: true,
    })
    if (retryResponse.state === 'error') {
      toast.error(retryResponse.error)
      return
    }
    toast.success('Created successfully!')
    onClose?.()
    sendEvent({
      widgetId: QuickNoteSectionName.QuicknoteSectionReferrals,
      eventType: 'widget:save',
    })
    handleCloseDialog()
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setError(undefined)

    const sanitizedData = sanitizeFormData(data)
    const response = await createPatientReferralAction(sanitizedData)

    if (response.state === 'error') {
      await handleError(response.error, sanitizedData)
      return
    }
    toast.success('Created successfully!')
    onClose?.()
    if (isQuickNoteView) {
      sendEvent({
        widgetId: QuickNoteSectionName.QuicknoteSectionReferrals,
        eventType: 'widget:save',
      })
    }
    handleCloseDialog()
  }

  return (
    <FormContainer form={form} onSubmit={onSubmit}>
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
      <ConfirmDialog confirm={confirm} error={error} />
    </FormContainer>
  )
}

export { CreateReferralForm, type SchemaType }
