'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { AlertDialog } from '@/ui/alerts'
import {
  rxChangeRequestAction,
  rxRenewalAction,
} from '@/ui/medication-orders/medication-order-refill-widget/actions'
import { UpdateMedicationSchema } from '@/ui/medication-orders/medication-order-refill-widget/dialogs/schema'
import { RenewalResponseTypeEnum } from '@/ui/medication-orders/medication-order-refill-widget/types'
import {
  handleChangeRequestApproval,
  handleRxApproval,
} from '@/ui/medication-orders/medication-order-refill-widget/utils'
import { sanitizeFormData } from '@/utils'
import {
  prescribingSignInAction,
  pushSign,
  selfPollStatus,
} from '../../actions'
import { SelfPollStatusPayloadProps, TransmitResult, Prescription } from '../../types'
import { IconBlock } from '../shared'
import { ConfirmationMethod, StepContext } from '../types'
import { OtpInput } from './otp-input'

const otpSchemaRequired = z.object({
  otp: z.string().optional(),
})

const otpSchemaOptional = z.object({
  otp: z.string().optional(),
})

type SchemaType = z.infer<typeof otpSchemaRequired>
interface MobileConfirmOtpProps {
  onPrev: () => void
  onNext: () => void
  confirmationMethod?: ConfirmationMethod.Otp | ConfirmationMethod.Authenticator
  prescriptionDrugIds: string[]
  controlledPrescriptionIds?: string[]
  isRefillTab?: boolean
  isRefillAndChangeRequest?: boolean
  prescriptions?: Prescription[]
  onClose?: (open: boolean) => void
  setStepContext?: React.Dispatch<React.SetStateAction<StepContext>>
}

const MobileConfirmOtp = ({
  onPrev,
  onNext,
  confirmationMethod,
  prescriptionDrugIds,
  controlledPrescriptionIds,
  isRefillTab,
  isRefillAndChangeRequest,
  prescriptions,
  onClose,
  setStepContext,
}: MobileConfirmOtpProps) => {
  const form = useForm<SchemaType>({
    defaultValues: { otp: '' },
    resolver: zodResolver(
      confirmationMethod === ConfirmationMethod.Otp
        ? otpSchemaRequired
        : otpSchemaOptional,
    ),
    reValidateMode: 'onChange',
  })
  const [showPollingInfo, setShowPollingInfo] = useState(false)
  const [pollingTimedOut, setPollingTimedOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const isOtp = confirmationMethod === ConfirmationMethod.Otp
  const isAuthenticator =
    confirmationMethod === ConfirmationMethod.Authenticator
  const handleControlledPrescriptions = async () => {
    if (!controlledPrescriptionIds?.length) return true
    const resp = await prescribingSignInAction(controlledPrescriptionIds)

    if (resp?.state === 'error') {
      toast.error(resp.error)
      return false
    }

    const validationErrors = resp?.data?.find(
      (item) => item?.validationErrors?.length,
    )?.validationErrors
    if (validationErrors) {
      setErrorMessage(validationErrors.join('\n') ?? '')
      setIsOpen(true)
      return false
    }
    toast.success('Transmitted Successfully')

    if (resp?.data && setStepContext) {
      setStepContext((prev) => ({
        ...prev,
        transmissionResult: resp.data as TransmitResult[],
      }))
    }
    return true
  }
  const pollAuthenticatorStatus = async (
    payload: SelfPollStatusPayloadProps,
    attempt = 0,
    maxAttempts = 12,
  ) => {
    if (attempt >= maxAttempts) {
      setShowPollingInfo(false)
      setPollingTimedOut(true)
      toast.error('Verification timed out after 1 minute.')
      return
    }

    const pollResponse = await selfPollStatus(payload)

    if (pollResponse?.state === 'error') {
      toast.error(pollResponse.error)
      setShowPollingInfo(false)
      return
    }

    if (
      pollResponse?.state === 'success' &&
      pollResponse?.data?.pending === false
    ) {
      setShowPollingInfo(false)
      toast.success('Polling verification successful!')
      if (isRefillAndChangeRequest) {
        if (!prescriptions?.length) return

        const data = prescriptions[0] as unknown as UpdateMedicationSchema
        if (isRefillTab) {
          const approvalResponse = await handleRxApproval(data)
          if (approvalResponse) {
            onClose?.(false)
          }
        } else {
          const changeResponse = await handleChangeRequestApproval(data)
          if (changeResponse) {
            onClose?.(false)
          }
        }
      } else {
        const shouldProceed = await handleControlledPrescriptions()
        if (shouldProceed) onNext()
      }
    } else {
      setTimeout(
        () => pollAuthenticatorStatus(payload, attempt + 1, maxAttempts),
        5000,
      )
    }
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setPollingTimedOut(false)
    const payload = {
      prescriptionDrugIds,
      isSourcePharmacyNotification: !!isRefillAndChangeRequest,
      ...(isOtp && { otpCode: data.otp }),
    }
    const response = await pushSign(payload)
    if (response?.state === 'error') {
      return toast.error(response?.error)
    }

    toast.success('Initial verification successful!')

    if (isAuthenticator) {
      setShowPollingInfo(true)
      pollAuthenticatorStatus(payload)
    } else if (isRefillAndChangeRequest) {
      if (!prescriptions?.length) return
      const data = prescriptions[0] as unknown as UpdateMedicationSchema
      if (isRefillTab) {
        const approvalResponse = await handleRxApproval(data)
        if (approvalResponse) {
          onClose?.(false)
        }
      } else {
        const changeResponse = await handleChangeRequestApproval(data)
        if (changeResponse) {
          onClose?.(false)
        }
      }
    } else {
      const shouldProceed = await handleControlledPrescriptions()
      if (shouldProceed) onNext()
    }
  }

  let mainContent: React.ReactNode = null

  if (isOtp) {
    mainContent = (
      <Flex direction="column" gap="3">
        <OtpInput />
      </Flex>
    )
  } else if (showPollingInfo) {
    mainContent = (
      <IconBlock
        title="Waiting for your response... This will expire in 1 minute"
        className="mt-2 border-0 !py-3 px-14 text-center"
        textClassName="text-2"
      />
    )
  } else if (pollingTimedOut && isAuthenticator) {
    mainContent = (
      <Button
        variant="outline"
        onClick={form.handleSubmit(onSubmit)}
        className="mt-2 self-center"
      >
        Send Again
      </Button>
    )
  }

  return (
    <FormContainer
      disabled={form.formState.isSubmitting}
      form={form}
      onSubmit={onSubmit}
    >
      <Flex direction="column" justify="between" className="min-h-[262px]">
        <Flex direction="column" gap="3">
          {mainContent}
        </Flex>
        <Flex gap="2" justify="end">
          <Button
            size="2"
            variant="outline"
            color="gray"
            type="button"
            className="text-black"
            onClick={onPrev}
          >
            Back
          </Button>
          <Button
            type="button"
            size="2"
            highContrast
            loading={form.formState.isSubmitting}
            disabled={showPollingInfo}
            onClick={form.handleSubmit(onSubmit)}
          >
            Verify and Submit
          </Button>
        </Flex>
      </Flex>
      <AlertDialog
        title="Validation Error"
        message={errorMessage}
        open={isOpen}
        onOpenChange={setIsOpen}
        disableClose
      />
    </FormContainer>
  )
}

export { MobileConfirmOtp, type SchemaType }
