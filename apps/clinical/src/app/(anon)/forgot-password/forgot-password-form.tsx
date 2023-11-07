'use client'

import { useState } from 'react'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormTextInput } from '@psychplus/components/form'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { PinCode } from '@psychplus/ui/pin-code'

interface ForgotPasswordFormFields {
  email: string
}

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormFields>({
    criteriaMode: 'all',
  })

  const [otpDialogOpen, setOtpDialogOpen] = useState(false)

  const onSubmit: SubmitHandler<ForgotPasswordFormFields> = async () => {
    await new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve()
      }, 1000)
    })

    setOtpDialogOpen(true)
  }

  const submitOTP = async () => {
    // Api implementation in next phase
    console.log('submitOTP pressed')
    location.assign('/update-password')
  }

  const resendOTP = async () => {
    // Api implementation in next phase
    console.log('resendOTP pressed')
  }

  return (
    <Flex direction="column" gap="4" asChild>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormTextInput
          name="email"
          register={register}
          errors={errors}
          placeholder="Email"
          data-testid="forgot-password-email-input"
        />
        <Dialog.Root open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
          <Button data-testid="forgot-password-button" size="3" type="submit">
            Submit
          </Button>
          <Dialog.Content className="w-fit px-24 py-8">
            <Flex direction="column" align="center">
              <Heading size="6" mb="3">
                Verify that it&apos;s you
              </Heading>
              <Flex direction="column" mb="4">
                <Text size="3">Enter the code you recieved at</Text>
                <Text size="3">test*****@gmail.com</Text>
              </Flex>
              <PinCode
                autoFocus
                pinLength={5}
                onChange={(value: string) => {
                  console.log(value)
                }}
                data-testid="forgot-password-otp-input"
              />
              <Flex gap="3" mt="5">
                <Button
                  variant="soft"
                  data-testid="forgot-password-resend-otp-button"
                  color="gray"
                  onClick={() => {
                    void resendOTP()
                  }}
                >
                  Resend code
                </Button>

                <Dialog.Close>
                  <Button
                    data-testid="forgot-password-submit-otp-button"
                    onClick={() => {
                      void submitOTP()
                    }}
                  >
                    Submit
                  </Button>
                </Dialog.Close>
              </Flex>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
      </form>
    </Flex>
  )
}

export { ForgotPasswordForm }
