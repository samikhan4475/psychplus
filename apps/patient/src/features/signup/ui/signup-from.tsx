'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormContainer } from '@psychplus-v2/components'
import { ConfigurationResponse, SharedCode } from '@psychplus-v2/types'
import {
  getAgeFromDate,
  getCalendarDate,
  getCalendarDateLabel,
} from '@psychplus-v2/utils'
import * as RadioGroup from '@radix-ui/react-radio-group'
import {
  Button,
  Checkbox,
  Flex,
  Heading,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { SubmitHandler, useForm } from 'react-hook-form'
import z from 'zod'
import {
  ConsentView,
  FormError,
  FormField,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  FormSubmitButton,
  PasswordInput,
  PasswordRequirements,
  PhoneNumberInput,
  RadioGroupItem,
} from '@/components-v2'
import { SelectInput } from '@/components-v2/select-input'
import { getPlaceholder } from '@/features/account/profile/utils'
import { useValidateNewPassword } from '@/hooks'
import { preverifySignupAction, sendSignupOtpAction } from '../actions'
import { VerifyOtpForm } from './verify-otp-form'
import { requiredName } from '@/features/utils'


const schema = z
  .object({
    firstName: requiredName,
    lastName: requiredName,
    dateOfBirth: z.string().trim().min(1, 'Required'),
    phoneNumber: z.string().trim().length(10, 'Invalid phone number'),
    email: z.string().email().trim(),
    gender: z.string().trim().min(1, 'Required'),
    newPassword: z
      .string()
      .min(1, 'Required')
      .min(8, 'Password must be at least 8 characters'),
    confirmPassword: z
      .string()
      .min(1, 'Required')
      .min(8, 'Password must be at least 8 characters'),
    userAgreed: z.coerce.boolean().refine((value) => value === true, {
      message: 'You must agree to the policies and conditions',
    }),
    hasGuardian: z.coerce.boolean(),
    guardianFirstname: z.string().trim(),
    guardianLastname: z.string().trim(),
  })
  .superRefine((data, ctx) => {
    if (getAgeFromDate(data.dateOfBirth) < 4) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be at least 4 years of age',
        path: ['dateOfBirth'],
      })
    }
    if (getAgeFromDate(data.dateOfBirth) > 120) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Must be 120 years of age or less',
        path: ['dateOfBirth'],
      })
    }
    if (getAgeFromDate(data.dateOfBirth) < 18 && !data.hasGuardian) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'You must have a guardian if you are under 18',
        path: ['hasGuardian'],
      })
    }
    if (data.hasGuardian) {
      if (!data.guardianFirstname) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['guardianFirstname'],
        })
      }
      if (!data.guardianLastname) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['guardianLastname'],
        })
      }
    }
  })

export type SchemaType = z.infer<typeof schema>

const SignupForm = ({
  genderCodes,
  configuration,
}: {
  genderCodes: SharedCode[]
  configuration: ConfigurationResponse
}) => {
  const [error, setError] = useState<string>()
  const [openVerifyDialog, setOpenVerifyDialog] = useState(false)
  const [showConsentView, setShowConsentView] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    const mid = searchParams.get('mid')
    if (mid) {
      localStorage.setItem('mid', mid)
    }
  }, [searchParams.get('mid')])

  const today = getCalendarDate()

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      phoneNumber: '',
      email: '',
      gender: '',
      newPassword: '',
      confirmPassword: '',
      userAgreed: false,
      hasGuardian: false,
      guardianFirstname: '',
      guardianLastname: '',
    },
  })

  const dobFormValue = form.watch('dateOfBirth')
  const hasGuardian = form.watch('hasGuardian')

  useEffect(() => {
    if (dobFormValue && getAgeFromDate(dobFormValue) < 18) {
      form.setValue('hasGuardian', true)
    } else {
      form.setValue('hasGuardian', false)
    }
  }, [form, dobFormValue])

  useEffect(() => {
    if (hasGuardian) {
      form.setValue('guardianFirstname', '')
      form.setValue('guardianLastname', '')
    }

    if (form.formState.isSubmitted) form.trigger('hasGuardian')
  }, [form, hasGuardian])

  const { isValid } = useValidateNewPassword({
    newPassword: form.watch('newPassword'),
    confirmPassword: form.watch('confirmPassword'),
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data: SchemaType) => {
    setError(undefined)

    const preverifyResponse = await preverifySignupAction({
      legalName: {
        firstName: data.firstName,
        lastName: data.lastName,
      },
      contactInfo: {
        email: data.email,
      },
      dateOfBirth: data.dateOfBirth,
    })

    if (preverifyResponse.state === 'error') {
      setError(preverifyResponse.error)
      return
    }

    const sendSignupOtpResponse = await sendSignupOtpAction({
      emailAddress: data.email,
    })

    if (sendSignupOtpResponse.state === 'error') {
      setError(sendSignupOtpResponse.error)
      return
    }

    setOpenVerifyDialog(true)
  }

  return (
    <Flex
      direction="column"
      className="bg-white w-full max-w-[500px] rounded-3 px-6 py-8 shadow-3 sm:p-12"
    >
      <VerifyOtpForm
        formData={form.getValues()}
        dialogOpen={openVerifyDialog}
        setDialogOpen={setOpenVerifyDialog}
      />
      <ConsentView
        open={showConsentView}
        setOpen={(open) => {
          setShowConsentView(open)
        }}
      />
      <Heading weight="medium" className="text-[36px] text-accent-12" mb="4">
        Create Account
      </Heading>
      <FormError message={error} />
      <FormContainer form={form} onSubmit={onSubmit}>
        <Flex direction="column" gap="3">
          <FormField name="firstName" label="First Name">
            <TextFieldInput
              {...form.register('firstName')}
              placeholder={getPlaceholder('firstName')}
            />
          </FormField>
          <FormField name="lastName" label="Last Name">
            <TextFieldInput
              {...form.register('lastName')}
              placeholder={getPlaceholder('lastName')}
            />
          </FormField>
          <Flex direction="row" justify="between" gap="2">
            <FormField
              containerClassName="flex-1"
              name="dateOfBirth"
              label="Date of Birth"
            >
              <TextFieldInput
                type="date"
                className="mr-4"
                min={getCalendarDateLabel(today.subtract({ years: 120 }))}
                max={getCalendarDateLabel(today.subtract({ years: 4 }))}
                {...form.register('dateOfBirth')}
              />
            </FormField>
            <FormField
              containerClassName="flex-1"
              name="phoneNumber"
              label="Phone Number"
            >
              <PhoneNumberInput
                size="2"
                name="phoneNumber"
                placeholder={getPlaceholder('phoneNumber')}
              />
            </FormField>
          </Flex>
          <FormField name="gender" label="Gender" containerClassName="flex-1">
            <SelectInput
              size="3"
              field="gender"
              placeholder={'Select gender'}
              buttonClassName="font-[400] text-gray-12 h-[30px] 
              text-[14px] w-full [&_span]:bg-red-500 bg-[white] outline outline-1 outline-gray-7"
              options={genderCodes.map((code) => ({
                label: code.display,
                value: code.value,
              }))}
              variant="soft"
            />
          </FormField>
          <FormField name="email" label="Email">
            <TextFieldInput
              {...form.register('email')}
              placeholder={getPlaceholder('email')}
            />
          </FormField>
          <FormField name="newPassword" label="Password">
            <PasswordInput
              {...form.register('newPassword')}
              value={form.watch('newPassword')}
              placeholder={getPlaceholder('password')}
            />
          </FormField>
          <FormField name="confirmPassword" label="Confirm Password">
            <PasswordInput
              {...form.register('confirmPassword')}
              value={form.watch('confirmPassword')}
              placeholder={getPlaceholder('confirmPassword')}
            />
          </FormField>
          <PasswordRequirements
            newPassword={form.watch('newPassword')}
            confirmPassword={form.watch('confirmPassword')}
            configuration={configuration}
          />

          <FormFieldContainer>
            <FormFieldLabel>Do you have a Parent/Guardian?</FormFieldLabel>
            <RadioGroup.Root
              name="hasGuardian"
              value={String(form.watch('hasGuardian'))}
              onValueChange={(value) =>
                form.setValue('hasGuardian', value === 'true')
              }
            >
              <Flex gap="2">
                <RadioGroupItem id="true" value="true">
                  Yes
                </RadioGroupItem>
                <RadioGroupItem id="false" value="false">
                  No
                </RadioGroupItem>
              </Flex>
            </RadioGroup.Root>
          </FormFieldContainer>

          {
            // Show guardian form if user is under 18 and has no guardian
            form.watch('hasGuardian') === true && (
              <Flex direction="column" gap="3">
                <FormField name="guardianFirstname" label="First Name">
                  <TextFieldInput
                    {...form.register('guardianFirstname')}
                    placeholder={getPlaceholder('firstName')}
                  />
                </FormField>
                <FormField name="guardianLastname" label="Last Name">
                  <TextFieldInput
                    {...form.register('guardianLastname')}
                    placeholder={getPlaceholder('lastName')}
                  />
                </FormField>
              </Flex>
            )
          }
          <FormFieldError name="hasGuardian" />
          <FormFieldContainer>
            <Flex direction="row" gap="2" align="center">
              <Checkbox
                id="terms-and-conditions-checkbox"
                size="3"
                onCheckedChange={(checked: boolean) => {
                  form.setValue('userAgreed', checked)
                  if (form.formState.isSubmitted) form.trigger('userAgreed')
                }}
                {...form.register('userAgreed')}
                highContrast
              />
              <FormFieldLabel className="text-[14px] font-[400]">
                I agree to electronically sign all the {' '}
                <Button
                  className="bg-transparent px-2 pt-[5px]"
                  type='button'
                  variant="ghost"
                  onClick={() =>
                    setShowConsentView(true)
                  }
                >
                  Policies
                </Button>
              </FormFieldLabel>
            </Flex>
            <FormFieldError name="userAgreed" />
          </FormFieldContainer>
          <FormSubmitButton size="4" className="mt-4" disabled={!isValid}>
            Submit
          </FormSubmitButton>
        </Flex>
      </FormContainer>
      <Text align="center" size="2" className="mt-8">
        Already have an account?
        <NextLink
          href="/login"
          className="ml-1 text-accent-11 underline-offset-2 transition-colors hover:text-accent-12 hover:underline"
        >
          Login
        </NextLink>
      </Text>
    </Flex>
  )
}

export { SignupForm }
