'use client'

import { useState } from 'react'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { PinCode } from '@psychplus/ui/pin-code'

const schema = z.object({
  email: validate.email,
})

type SchemaType = z.infer<typeof schema>

const SignupForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const [otpDialogOpen, setOtpDialogOpen] = useState(false)

  const onSubmit: SubmitHandler<SchemaType> = async () => {
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
  }

  const resendOTP = async () => {
    // Api implementation in next phase
    console.log('resendOTP pressed')
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <FormTextInput
          type="text"
          label="Email"
          placeholder="Enter your email"
          data-testid="signup-email-input"
          {...form.register('email')}
        />
        <FormSubmitButton data-testid="signup-submit-button">
          Sign up
        </FormSubmitButton>
      </Flex>
      <Dialog.Root open={otpDialogOpen} onOpenChange={setOtpDialogOpen}>
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
              data-testid="signup-otp-input"
            />
            <Flex gap="3" mt="5">
              <Button
                variant="soft"
                data-testid="signup-resend-otp-button"
                color="gray"
                onClick={() => {
                  void resendOTP()
                }}
              >
                Resend code
              </Button>

              <Dialog.Close>
                <Button
                  data-testid="signup-submit-otp-button"
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
    </Form>
  )
}

export { SignupForm }
