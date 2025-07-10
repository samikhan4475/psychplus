'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ConfigurationResponse } from '@psychplus-v2/types'
import { InitiatePasswordResetForm } from './initiate-password-reset-form'
import { PasswordResetForm } from './password-reset-form'

const ForgotPasswordView = ({
  configuration,
}: {
  configuration: ConfigurationResponse
}) => {
  const [email, setEmail] = useState<string>()
  const searchParams = useSearchParams()
  const reset = searchParams.get('reset')

  return (
    <>
      {!email ? (
        <InitiatePasswordResetForm onSuccess={setEmail} reset={reset} />
      ) : (
        <PasswordResetForm
          email={email}
          reset={reset}
          configuration={configuration}
        />
      )}
    </>
  )
}

export default ForgotPasswordView
