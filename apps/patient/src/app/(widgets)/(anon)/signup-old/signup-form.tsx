'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { Cross2Icon } from '@radix-ui/react-icons'
import { Box, Flex, Link, Text } from '@radix-ui/themes'
import { format } from 'date-fns'
import { type SubmitHandler } from 'react-hook-form'
import { OTPDialog, sendOtp, type OTPSendStatus } from '@psychplus/auth/otp'
import { signup } from '@psychplus/auth/signup'
import {
  Form,
  FormFieldError,
  FormPhoneNumberInput,
  FormSubmitButton,
  FormTextInput,
  useForm,
} from '@psychplus/form'
import { RadioGroup } from '@psychplus/ui/radio-group'
import { schema, type SchemaType } from './schema'

const SignupForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const [alertError, setAlertError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [otpDialogOpen, setOTPDialogOpen] = useState(false)
  const [otpSendStatus, setOTPSendStatus] = useState<OTPSendStatus>('none')
  const [customStatusMessage, setCustomStatusMessage] = useState<
    string | undefined
  >(undefined)

  const router = useRouter()

  const sendOtpHandler = async (email: string, phoneNumber: string) => {
    setOTPSendStatus('sending')
    setCustomStatusMessage(undefined)
    try {
      await sendOtp({
        emailAddress: email,
        phoneNumber: phoneNumber,
      })
      setOTPDialogOpen(true)
      setOTPSendStatus('sent')
    } catch (error: any) {
      const { message } = error
      if (message.toLowerCase().includes('otp')) {
        setOTPSendStatus('error')
        setCustomStatusMessage(message)
        return
      }
      setOTPDialogOpen(false)
      setAlertError(message)
      setOTPSendStatus('error')
    } finally {
      setIsLoading(false)
    }
  }

  const OTPHandler = (code: string) => {
    setIsLoading(true)
    setCustomStatusMessage(undefined)
    setOTPSendStatus('none')
    const guardianField = form.getValues().isParentOrGuardian
      ? {
          guardian: {
            name: {
              firstName: form.getValues().guardianFirstName || '',
              lastName: form.getValues().guardianLastName || '',
            },
          },
        }
      : {}
    signup({
      otpCode: code,
      legalName: {
        firstName: form.getValues().firstName,
        lastName: form.getValues().lastName,
      },
      contactInfo: {
        phoneNumbers: [
          {
            number: form.getValues().phoneNumber,
            type: 'Home',
          },
        ],
        email: form.getValues().email,
      },
      language: 'English',
      preferredLanguage: 'English',
      dateOfBirth: form.getValues().dateOfBirth,
      password: form.getValues().password,
      passwordConfirm: form.getValues().password,
      ...guardianField,
    })
      .then((res) => {
        setIsLoading(false)
        setOTPDialogOpen(false)
        setOTPSendStatus('error')
        router.push('/login')
      })
      .catch((error) => {
        const { message } = error
        if (message.toLowerCase().includes('otp')) {
          setOTPSendStatus('error')
          setCustomStatusMessage(message)
          return
        }

        setOTPDialogOpen(false)
        setAlertError(message)
      })
  }

  const resendOTP = async () => {
    sendOtpHandler(form.getValues().email, form.getValues().phoneNumber)
  }

  const isLessThen18 = (dateOfBirth: string) => {
    const currentDate = new Date()
    const dob = new Date(dateOfBirth)

    if (!dob) return false

    const ageInYears = currentDate.getFullYear() - dob.getFullYear()

    return ageInYears < 18
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setIsLoading(true)
    sendOtpHandler(data.email, data.phoneNumber)
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        {alertError && (
          <Flex className="bg-[#FFE5E8]" role="alert" p="4">
            <Text color="red">{alertError}</Text>
            <Cross2Icon onClick={() => setAlertError('')} />
          </Flex>
        )}
        <FormTextInput
          type="text"
          label="First Name"
          placeholder="First Name"
          data-testid="signup-first-name-input"
          {...form.register('firstName')}
        />
        <FormTextInput
          type="text"
          label="Last Name"
          placeholder="Last Name"
          data-testid="signup-last-name-input"
          {...form.register('lastName')}
        />
        <FormTextInput
          type="date"
          max={format(new Date(), 'yyyy-MM-dd')}
          label="Date of Birth"
          data-testid="signup-date-of-birth-input"
          {...form.register('dateOfBirth')}
          style={{ marginLeft: -12 }}
          onChange={(e) => {
            form.setValue('dateOfBirth', e.target.value)
            if (form.formState.isSubmitted) {
              form.trigger('dateOfBirth')
            }
            if (isLessThen18(e.target.value)) {
              form.setValue('isParentOrGuardian', true)
            } else {
              form.setValue('isParentOrGuardian', false)
            }
          }}
        />
        <FormPhoneNumberInput
          label="Phone Number"
          data-testid="signup-phone-number-input"
          {...form.register('phoneNumber')}
        />
        <FormTextInput
          type="text"
          label="Email"
          placeholder="Enter your email"
          data-testid="signup-email-input"
          {...form.register('email')}
        />
        <FormTextInput
          type="password"
          label="Password"
          placeholder="***********"
          data-testid="signup-password-input"
          {...form.register('password')}
        />

        <FormTextInput
          type="password"
          label="Confirm Password"
          placeholder="***********"
          data-testid="signup-confirm-password-input"
          {...form.register('confirmPassword')}
        />

        <Flex direction="column" gap="2">
          <Text as="div" size="2" mb="1" weight="bold">
            Do you have a parent/guardian?
          </Text>

          <RadioGroup.Root
            value={form.watch('isParentOrGuardian') ? 'Yes' : 'No'}
            data-testid="signup-is-parent-or-guardian-input"
            onValueChange={(value) => {
              form.setValue('isParentOrGuardian', value === 'Yes')
            }}
          >
            <Flex gap="4">
              {['No', 'Yes'].map((option) => (
                <Text as="label" key={option} size="2">
                  <Flex gap="1">
                    <RadioGroup.Item value={option} />
                    {option}
                  </Flex>
                </Text>
              ))}
            </Flex>
          </RadioGroup.Root>
        </Flex>

        {form.watch('isParentOrGuardian') && (
          <>
            <FormTextInput
              type="text"
              label="Guardian First Name"
              placeholder="First Name"
              data-testid="signup-guardian-first-name-input"
              {...form.register('guardianFirstName')}
            />
            <FormTextInput
              type="text"
              label="Guardian Last Name"
              placeholder="Last Name"
              data-testid="signup-guardian-last-name-input"
              {...form.register('guardianLastName')}
            />
          </>
        )}
        <Box>
          <Flex mt="3">
            <Flex gap="2" align="start">
              <input
                type="checkbox"
                data-testid="agreeToTerms-checkbox"
                {...form.register('agreeToTerms')}
                className="mt-1"
              />
              <Text htmlFor="signup-agreeToTerms-checkbox" size="2">
                I agree to electronically sign the{' '}
                <Link size="2" asChild data-testid="signup-terms-link">
                  <NextLink href="#">Terms of Service </NextLink>
                </Link>
                and{' '}
                <Link size="2" asChild data-testid="signup-privacy-link">
                  <NextLink href="#">Privacy Policy</NextLink>
                </Link>
              </Text>
            </Flex>
          </Flex>
          <FormFieldError
            message={form.formState.errors.agreeToTerms?.message}
          />
        </Box>
        <FormSubmitButton data-testid="signup-submit-button">
          {isLoading ? 'Loading...' : 'Create Account'}{' '}
        </FormSubmitButton>
      </Flex>
      <OTPDialog
        email={form.getValues().email}
        isOpen={otpDialogOpen}
        setIsOpen={setOTPDialogOpen}
        onSubmit={OTPHandler}
        onResend={resendOTP}
        sendStatus={otpSendStatus}
        customStatusMessage={customStatusMessage}
      />
    </Form>
  )
}

export { SignupForm }
