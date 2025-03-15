'use client'

import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { AnonHeader } from '@/components-v2'
import { InitiatePasswordResetForm } from './initiate-password-reset-form'
import { PasswordResetForm } from './password-reset-form'
import { useSearchParams } from 'next/navigation'

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState<string>()

  const searchParams = useSearchParams()

  const reset = searchParams.get('reset')

  return (
    <Flex direction="column" width="100%">
      <AnonHeader />
      <Flex
        direction="column"
        height="100%"
        align="center"
        justify="center"
        gap="4"
        px="5"
        className="flex-1 py-20"
      >
        {!email ? <InitiatePasswordResetForm onSuccess={setEmail} reset={reset} /> : null}
        {email ? <PasswordResetForm email={email} reset={reset} /> : null}
      </Flex>
    </Flex>
  )
}

export default ForgotPasswordPage
