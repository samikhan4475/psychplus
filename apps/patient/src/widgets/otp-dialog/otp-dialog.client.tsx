'use client'

import { useEffect, useState } from 'react'
import { OTPDialog, sendOtp, type OTPSendStatus } from '@psychplus/auth/otp'
import { usePubsub } from '@psychplus/utils/event'
import { OTP_DIALOG } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { useDialog, usePublishLoaded } from '@psychplus/widgets/hooks'

const OTPDialogClient = () => {
  const { publish, subscribe } = usePubsub()
  const { open, data } = useDialog<{ email: string }>(OTP_DIALOG)
  const [otpSendStatus, setOTPSendStatus] = useState<OTPSendStatus>('none')
  const [statusMessage, setStatusMessage] = useState<string>()

  usePublishLoaded(OTP_DIALOG)

  useEffect(() => {
    return subscribe<{ message: string }>(`${OTP_DIALOG}:error`, (data) => {
      setStatusMessage(data.message)
    })
  }, [])

  useEffect(() => {
    subscribe<{ status: OTPSendStatus }>(`${OTP_DIALOG}:status`, (data) => {
      setOTPSendStatus(data.status)
    })
  }, [])

  const onSubmit = (code: string) => {
    publish(`${OTP_DIALOG}:submit`, { code })
  }

  const onResend = () => {
    if (!data) {
      return
    }

    setStatusMessage(undefined)
    setOTPSendStatus('sending')

    sendOtp({
      emailAddress: data.email,
    })
      .then(() => {
        setOTPSendStatus('sent')
      })
      .catch((e) => {
        setOTPSendStatus('error')
      })
  }

  if (!data) {
    return
  }

  return (
    <OTPDialog
      isOpen={open}
      setIsOpen={(isOpen) => {
        if (!isOpen) {
          publish(`${OTP_DIALOG}:${EventType.Closed}`)
        }
      }}
      email={data.email}
      onSubmit={onSubmit}
      onResend={onResend}
      sendStatus={otpSendStatus}
      customStatusMessage={statusMessage}
    />
  )
}

export { OTPDialogClient }
