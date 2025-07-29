'use client'

import { useEffect, useRef, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex } from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import z from 'zod'
import { FormContainer } from '@/components'
import { AlertDialog } from '@/ui/alerts'
import { UpdateMedicationSchema } from '@/ui/medication-orders/medication-order-refill-widget/dialogs/schema'
import {
  handleChangeRequestApproval,
  handleRxApproval,
} from '@/ui/medication-orders/medication-order-refill-widget/utils'
import {
  prescribingSignInAction,
  pushSign,
  selfPollStatus,
} from '../../actions'
import {
  Prescription,
  SelfPollStatusPayloadProps,
  TransmitResult,
} from '../../types'
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
  const [remainingTime, setRemainingTime] = useState(180)
  const isOtp = confirmationMethod === ConfirmationMethod.Otp
  const isAuthenticator =
    confirmationMethod === ConfirmationMethod.Authenticator
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pollingAttemptRef = useRef<number>(0)
  const MAX_ATTEMPTS = 36

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
  ) => {
    if (pollingAttemptRef.current >= MAX_ATTEMPTS) {
      setShowPollingInfo(false)
      setPollingTimedOut(true)
      toast.error('Verification timed out after 1 minute.')
      clearPolling()
      return
    }

    const pollResponse = await selfPollStatus(payload)

    if (pollResponse?.state === 'error') {
      clearPolling()
      toast.error(pollResponse.error)
      setShowPollingInfo(false)
      return
    }

    if (
      pollResponse?.state === 'success' &&
      pollResponse?.data?.pending === false
    ) {
      clearPolling()
      toast.success('Polling verification successful!')
      setShowPollingInfo(false)
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
      pollingAttemptRef.current += 1

      await delay(5000)

      if (pollingAttemptRef.current < MAX_ATTEMPTS) {
        pollAuthenticatorStatus(payload)
      }
    }
  }
  const clearPolling = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
    pollingAttemptRef.current = 0
  }

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms))

  useEffect(() => {
    if (showPollingInfo && !pollingTimedOut) {
      timerRef.current = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current!)
            setShowPollingInfo(false)
            setPollingTimedOut(true)
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current!)
      }
    }
  }, [showPollingInfo])

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    clearPolling()

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
      setPollingTimedOut(false)
      setShowPollingInfo(true)
      setRemainingTime(180)
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
  const timerClass = remainingTime <= 10 ? 'text-red-9' : 'text-2'

  if (isOtp) {
    mainContent = (
      <Flex direction="column" gap="3">
        <OtpInput />
      </Flex>
    )
  } else if (showPollingInfo && remainingTime) {
    mainContent = (
      <IconBlock
        title={`Waiting for your response... This will expire in ${remainingTime} seconds`}
        className={`mt-2 border-0 !py-3 px-14 text-center ${timerClass}`}
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
          {!(pollingTimedOut && isAuthenticator) && (
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
          )}
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
