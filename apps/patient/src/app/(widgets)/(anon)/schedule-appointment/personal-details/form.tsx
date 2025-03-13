'use client'

import { useEffect, useState } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/navigation'
import { zipCodeSchema } from '@psychplus-v2/utils'
import { Flex, Link, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import { sendOtp } from '@psychplus/auth/otp'
import { signup } from '@psychplus/auth/signup'
import {
  Form,
  FormFieldError,
  FormPhoneNumberInput,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { RadioGroup } from '@psychplus/ui/radio-group'
import { usePubsub } from '@psychplus/utils/event'
import { clickTrack } from '@psychplus/utils/tracking'
import { OTP_DIALOG, SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { loginAction } from '@/actions'
import { CrossIcon } from '@/components'
import { WarningIcon } from '@/components/icons/warning-icon'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import { getLoginRedirectUrl } from '@/widgets/schedule-appointment-list/utils'
import { getCodeSet } from '@psychplus/codeset/api.client'
import { Code } from '@psychplus/codeset'
import { Select } from '@psychplus/ui/select'
import { ChevronDownIcon } from 'lucide-react'

const schema = z
  .object({
    firstName: validate.requiredString,
    lastName: validate.requiredString,
    dateOfBirth: validate.requiredString,
    phoneNumber: validate.phoneNumber,
    email: validate.email,
    gender:z.string(),
    password: validate.passwordStrong,
    isParentOrGuardian: z.boolean().default(false),
    guardianFirstName: z.string().optional(),
    guardianLastName: z.string().optional(),
    agreeToTerms: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'Please agree to our terms and conditions',
      }),
  })
  .superRefine(
    (
      { isParentOrGuardian, guardianFirstName, guardianLastName, dateOfBirth },
      ctx,
    ) => {
      const currentDate = new Date()
      const dob = new Date(dateOfBirth)

      if (dob) {
        const ageInYears = currentDate.getFullYear() - dob.getFullYear()

        if (ageInYears <= 5) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Age can't be less than 5 years!",
            path: ['dateOfBirth'],
          })
        }
      }

      if (isParentOrGuardian) {
        if (!guardianFirstName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: ['guardianFirstName'],
          })
        }

        if (!guardianLastName) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Required',
            path: ['guardianLastName'],
          })
        }
      }
    },
  )

type SchemaType = z.infer<typeof schema>

const PersonalDetailsForm = () => {
  const router = useRouter()
  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const { patient, setPatient, address } = useStore()
  const [alertError, setAlertError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { publish, subscribe } = usePubsub()
  const [genders, setGenders] = useState<Code[]>()

  useEffect(() => {
    getCodeSet('Gender').then((res) => {
      const genders = res.codes
      setGenders(genders)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  useEffect(() => {
    return subscribe<{ code: string }>(`${OTP_DIALOG}:submit`, (data) => {
      if (isLoading) {
        return
      }

      setIsLoading(true)

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
        otpCode: data.code,
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
        language: ['English'],
        preferredLanguage: 'English',
        dateOfBirth: form.getValues().dateOfBirth,
        password: form.getValues().password,
        passwordConfirm: form.getValues().password,
        gender: form.getValues().gender,
        ...guardianField,
      })
        .then((res) => {
          setPatient({
            ...res.user,
            dateOfBirth: form.getValues().dateOfBirth,
          })

          // Login user to generate access token
          loginAction({
            next: null,
            shouldRedirect: false,
            username: form.getValues().email,
            password: form.getValues().password,
          })
            .then((res) => {
              if (res.state === 'error') {
                alert(res.error)
                return
              }

              publish(`${OTP_DIALOG}:closed`)

              clickTrack({
                productArea: 'Patient',
                productPageKey: 'Schedule Appointment - Personal Details',
                clickAction: 'Navigation',
                clickActionData: 'Clicked Next',
              })

              router.push(`/schedule-appointment/insurance-payment`)
            })
            .catch((error: { message: string }) => {
              alert(error.message)
            })
            .finally(() => {
              setIsLoading(false)
            })
        })
        .catch((error) => {
          const { message } = error
          if (message.toLowerCase().includes('otp')) {
            publish(`${OTP_DIALOG}:status`, { status: 'error' })
            publish(`${OTP_DIALOG}:error`, { message })
            return
          }
          publish(`${OTP_DIALOG}:closed`)
          setAlertError(message)
        })
        .finally(() => {
          setIsLoading(false)
        })
    })
  }, [form, subscribe, publish, isLoading, router, setPatient, address])

  const sendOtpHandler = (email: string, phoneNumber: string) => {
    setAlertError(null)
    sendOtp({
      emailAddress: email,
      phoneNumber: phoneNumber,
    })
      .then(() => {
        publish(`${OTP_DIALOG}:opened`, { email })
      })
      .catch((e) => {
        setAlertError(e.message)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setIsLoading(true)
    sendOtpHandler(data.email, data.phoneNumber)
  }

  const isLessThen18 = (dateOfBirth: string) => {
    const currentDate = new Date()
    const dob = new Date(dateOfBirth)

    if (dob) {
      const ageInYears = currentDate.getFullYear() - dob.getFullYear()

      if (
        ageInYears <= 5 &&
        Object.keys(form.formState.touchedFields).length !== 0
      ) {
        form.setError('dateOfBirth', {
          message: `Age can't be less than 5 years!`,
        })
      } else {
        form.clearErrors('dateOfBirth')
      }

      return ageInYears < 18
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex gap="6" className="text-[#151B4A]" direction="column">
        {alertError && (
          <Flex align="center" justify="between" className="bg-[#ffe5e7] p-6">
            <Flex align="center">
              <WarningIcon />
              <Text className="text-psych-blue ml-2 text-[16px]">
                {alertError}
              </Text>
            </Flex>
            <div>
              <button
                className="text-white ml-3 items-end"
                onClick={() => setAlertError(null)}
              >
                <CrossIcon />
              </button>
            </div>
          </Flex>
        )}
        <Flex direction="column" gap="5">
          <Flex direction="column" gap="1" className="w-full">
            <Text>Email address</Text>
            <FormTextInput
              type="text"
              label=""
              className="h-14 w-full"
              data-testid="email-input"
              {...form.register('email')}
            />
          </Flex>

          <Flex className="flex-col sm:flex-row" gap="4">
            <Flex direction="column" gap="1" className="w-full">
              <Text>First name</Text>
              <FormTextInput
                type="text"
                label=""
                className="h-14 w-full"
                data-testid="first-name-input"
                {...form.register('firstName')}
              />
            </Flex>
            <Flex direction="column" gap="1" className="w-full">
              <Text>Last Name</Text>
              <FormTextInput
                type="text"
                label=""
                className="h-14 w-full"
                data-testid="last-name-input"
                {...form.register('lastName')}
              />
            </Flex>
          </Flex>

          <Flex className="flex-col sm:flex-row" gap="4">
          <Flex direction="column" gap="1" className="w-full">
              <Text>Gender</Text>
              <Select.Root
                size="3"
                {...form.register('gender')}
                value={form.watch('gender')}
                onValueChange={(value) => {
                  form.setValue('gender', value)
                }}
              >
                <Select.Trigger
                  placeholder={"Select gender"}
                  className="h-14 w-full whitespace-nowrap rounded-[4px] border border-[#b9bbc6] px-[10px] py-2 text-[16px] font-regular text-[#1c2024] placeholder-[#1C2024]"
                >
                  {form.watch('gender') ? form.watch('gender') : 'Select gender'}
                  <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 transform" />
                </Select.Trigger>
                <Select.Content align="end" position="popper" highContrast>
                  {genders?.map((gender) => (
                    <Select.Item key={gender.code} value={gender.code}>
                      <Text size="4">{gender.display}</Text>
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              {form.formState.errors.gender?.message && (
                <Text size="2" color="red">
                  {form.formState.errors.gender?.message}
                </Text>
              )}
            </Flex>
            <Flex direction="column" gap="1" className="w-full">
              <Text>Date of birth</Text>
              <FormTextInput
                type="date"
                label=""
                max="9999-12-31"
                data-testid="date-of-birth-input"
                {...form.register('dateOfBirth')}
                style={{ marginRight: 12 }}
                className="h-14 w-full"
                defaultValue={patient?.dateOfBirth || ''}
                onChange={(e) => {
                  if (isLessThen18(e.target.value)) {
                    form.setValue('isParentOrGuardian', true)
                  } else {
                    form.setValue('isParentOrGuardian', false)
                  }
                }}
              />
            </Flex>
            <Flex direction="column" gap="1" className="w-full">
              <Text>Phone number</Text>
              <FormPhoneNumberInput
                label=""
                data-testid="phone-number-input"
                {...form.register('phoneNumber')}
                className="h-14 w-full"
              />
            </Flex>
          </Flex>
          <Flex className="flex-col sm:flex-row" gap="4">
            <Flex direction="column" gap="1" className="w-full">
              <Text>Primary Address 1</Text>
              <FormTextInput
                type="text"
                name="primaryAddress"
                label=""
                className="h-14 w-full"
                data-testid="first-name-input"
                defaultValue={address?.primaryStreet1 || ''}
                disabled
              />
            </Flex>
            <Flex direction="column" gap="1" className="w-full">
              <Text>Primary Address 2</Text>
              <FormTextInput
                type="text"
                name="primaryAddress2"
                label=""
                className="h-14 w-full"
                data-testid="last-name-input"
                defaultValue={address?.primaryStreet2 || ''}
                disabled
              />
            </Flex>
          </Flex>
          <Flex className="flex-col sm:flex-row" gap="4">
            <Flex direction="column" gap="1" className="w-full">
              <Text>City</Text>
              <FormTextInput
                type="text"
                name="city"
                label=""
                className="h-14 w-full"
                data-testid="first-name-input"
                defaultValue={address?.primaryCity || ''}
                disabled
              />
            </Flex>
            <Flex direction="column" gap="1" className="w-full">
              <Text>State</Text>
              <FormTextInput
                type="text"
                name="state"
                label=""
                className="h-14 w-full"
                data-testid="last-name-input"
                defaultValue={address?.primaryState || ''}
                disabled
              />
            </Flex>
            <Flex direction="column" gap="1" className="w-full">
              <Text>Zip</Text>
              <FormTextInput
                type="text"
                name="zip"
                label=""
                className="h-14 w-full"
                data-testid="last-name-input"
                defaultValue={address?.primaryPostalCode || ''}
                disabled
              />
            </Flex>
          </Flex>

          <Flex direction="column" gap="1" className="w-full">
            <Text>Password</Text>
            <FormTextInput
              type="password"
              label=""
              className="h-14 w-full"
              data-testid="password-input"
              {...form.register('password')}
            />
          </Flex>
        </Flex>

        <Flex className="flex-col gap-2 sm:flex-row">
          <Text size="4">Do you have a parent/guardian?</Text>

          <Flex className="flex-auto justify-start sm:justify-end">
            <RadioGroup.Root
              value={form.watch('isParentOrGuardian') ? 'Yes' : 'No'}
              data-testid="is-parent-or-guardian-input"
              onValueChange={(value) => {
                form.setValue('isParentOrGuardian', value === 'Yes')
              }}
            >
              <Flex gap="4">
                {['Yes', 'No'].map((option) => (
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
        </Flex>

        {form.watch('isParentOrGuardian') && (
          <Flex gap="4" className="mb-2 flex-col sm:flex-row">
            <Flex direction="column" gap="1" className="w-full">
              <Text>First name</Text>
              <FormTextInput
                type="text"
                label=""
                data-testid="guardian-first-name-input"
                {...form.register('guardianFirstName')}
                className="h-14 w-full"
              />
            </Flex>
            <Flex direction="column" gap="1" className="h-14 w-full">
              <Text>Last name</Text>
              <FormTextInput
                type="text"
                label=""
                data-testid="guardian-last-name-input"
                {...form.register('guardianLastName')}
                className="h-14 w-full"
              />
            </Flex>
          </Flex>
        )}

        <Flex direction="column">
          <Flex align="center">
            <input
              type="checkbox"
              data-testid="agreeToTerms-checkbox"
              {...form.register('agreeToTerms')}
            />
            <Text as="label" size="3" ml="2" htmlFor="agreeToTerms-checkbox">
              Agree to our{' '}
              <Link
                className="font-bold text-[#333333] no-underline"
                href="#"
                onClick={() => {
                  publish(`${SCHEDULE_APPOINTMENT_LIST}:open-tos`)
                }}
              >
                terms and conditions
              </Link>
            </Text>
          </Flex>

          <FormFieldError
            message={form.formState.errors.agreeToTerms?.message}
          />
        </Flex>

        <Flex align="center" className="gap-5 sm:gap-6">
          <FormSubmitButton
            data-testid="signup-submit-button"
            radius="full"
            className="h-8 w-16 bg-[#151B4A] text-[#FFFFFF] sm:h-16 sm:w-40"
          >
            <Text className="text-2 font-bold sm:text-5">
              {isLoading ? 'Loading...' : 'Next'}
            </Text>
          </FormSubmitButton>

          <Flex align="center" gap="2">
            <Text size="4" className="text-[##333333]">
              Already have an account?
            </Text>
            <NextLink
              href={'#'}
              onClick={() => {
                publish(`${SCHEDULE_APPOINTMENT_LIST}:existing-login`, {
                  url: getLoginRedirectUrl(),
                })
              }}
            >
              <Text className="text-[#111111] underline">Log in</Text>
            </NextLink>
          </Flex>
        </Flex>
      </Flex>
    </Form>
  )
}
export { PersonalDetailsForm }
