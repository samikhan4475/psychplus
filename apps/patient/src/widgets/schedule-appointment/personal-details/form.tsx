'use client'

import { useState } from 'react'
import NextLink from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Box, Flex, Text, TextField } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormFieldError,
  FormPhoneNumberInput,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { usePubsub } from '@psychplus/utils/event'
import { clickTrack } from '@psychplus/utils/tracking'
import { SCHEDULE_APPOINTMENT_LIST } from '@psychplus/widgets'
import { webPatientSignupAction } from '@/features/signup/actions/web-signup'
import { PhoneNumberEnum } from '@psychplus-v2/types'
import { enums, PSYCHPLUS_TEST_SITE_URL } from '@/constants'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import { getLoginRedirectUrl } from '@/widgets/schedule-appointment-list/utils'
import { useToast } from '@/providers/toast-provider'
import { BookAppointmentPayload } from '@psychplus/appointments'
import { ProviderType } from '@psychplus-v2/constants'
import { bookAppointmentAction } from '@/api/book-appointment'
import { RadioGroupToggle } from '@/components-v2'
import { UserFillIcon } from '@/components-v2/icons/user-fill-icon'
import { cn } from '@psychplus/ui/cn'
import { Checkbox } from '@psychplus/ui/checkbox'
import { HipaaComplianceIcon } from '@/components-v2/icons/hipa-compliance-icon'
import { PersonIcon } from '@/components-v2/icons/person-icon'

const INSURANCE_PAYMENT_MODAL = 'INSURANCE_PAYMENT_MODAL'
const schema = z
  .object({
    firstName: validate.requiredString,
    lastName: validate.requiredString,
    dateOfBirth: validate.requiredString,
    phoneNumber: validate.phoneNumber,
    email: validate.email,
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

interface Props {
  patientAppUrl: string
  onCancel: () => void
  openInsurancePaymentModal: () => void
}
const PersonalDetailsForm = ({ patientAppUrl, onCancel, openInsurancePaymentModal }: Props) => {
  const { setPatient, setAccessToken, bookedSlot, setAppointmentId } = useStore()
  const { toast } = useToast()

  const searchParams = useSearchParams()

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirth: '',
      phoneNumber: '',
      isParentOrGuardian: false,
      guardianFirstName: '',
      guardianLastName: '',
      agreeToTerms: false,
    }
  })

  const [isLoading, setIsLoading] = useState(false)
  const { publish } = usePubsub()

  const hasParentOrGuardian = form.watch('isParentOrGuardian');
  const hasAgreedToTerms = form.watch('agreeToTerms');

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    setIsLoading(true)

    try {
      const signupParams = {
        legalName: {
          firstName: data.firstName,
          lastName: data.lastName,
        },
        dateOfBirth: data.dateOfBirth,
        contactInfo: {
          email: data.email,
          phoneNumbers: [
            {
              type: PhoneNumberEnum.CONTACT,
              number: data.phoneNumber,
            },
          ],
        },
        password: 'xxx',
        termsOfServiceConsentOn: new Date().toISOString(),
        hipaaConsentOn: new Date().toISOString(),
        privacyPolicyConsentOn: new Date().toISOString(),
        ...(data.isParentOrGuardian && {
          guardian: {
            name: {
              firstName: data.guardianFirstName ?? '',
              lastName: data.guardianLastName ?? '',
            },
          },
        }),
      }
      const result = await webPatientSignupAction(signupParams)

      if (result.state === 'error') {
        toast?.({
          type: 'error',
          title: result.error || 'Failed to create account',
        })
        return
      }

      setPatient(result.data.user);
      setAccessToken(result.data.accessToken);

      parent.postMessage(
        {
          event: enums.ACCOUNT_CREATED,
          user_data: {
            email_address: data.email,
            phone_number: data.phoneNumber,
            first_name: data.firstName,
            last_name: data.lastName,
            date_of_birth: data.dateOfBirth,
          },
        },
        PSYCHPLUS_TEST_SITE_URL,
      )

      // Book the appointment
      const appointmentTypeMapper: { [key: string]: string } = {
        'In-Person': 'InPerson',
        Virtual: 'TeleVisit',
      }
      const startDate = new Date(
        bookedSlot?.startDate ?? new Date(),
      ).toISOString()

      const patientMid = localStorage.getItem('mid')

      const payload: BookAppointmentPayload = {
        locationId: bookedSlot?.locationId
          ? bookedSlot?.locationId
          : bookedSlot?.clinic?.id ?? 0,
        specialistStaffId: bookedSlot?.specialist?.id ?? 0,
        specialistTypeCode: bookedSlot?.specialistTypeCode ?? 0,
        type: appointmentTypeMapper[bookedSlot?.type ?? ''],
        startDate,
        duration: bookedSlot?.duration || 0,
        isFollowup: true,
        serviceId: bookedSlot?.servicesOffered?.[0],
        providerType:
          bookedSlot?.specialistTypeCode === 1 ? 'Psychiatrist' : 'Therapy',
        isSelfPay: false, // Will be determined in insurance modal
        stateCode: bookedSlot?.state,
      }

      if (patientMid) {
        payload.marketingCampaignId = patientMid;
      }

      try {
        const headers = {
          Authorization: `Bearer ${result.data.accessToken}`,
        };
        const appointmentResponse = await bookAppointmentAction({ payload, headers })

        if (appointmentResponse.state === 'error') {
          toast?.({
            type: 'error',
            title: appointmentResponse.error,
          })
          return
        }

        const providerType =
          bookedSlot?.specialistTypeCode === 1
            ? ProviderType.Psychiatrist
            : ProviderType.Therapist

        clickTrack({
          productArea: 'Patient',
          productPageKey: 'Web appointmentBooked',
          clickAction: 'Accepted',
          clickActionData: `${providerType}|${appointmentTypeMapper[bookedSlot?.type ?? '']}`,
        })

        clickTrack({
          productArea: 'Patient',
          productPageKey: 'Schedule Appointment - Personal Details',
          clickAction: 'Navigation',
          clickActionData: 'Clicked Next',
        })

        onCancel()
        setAppointmentId(
          Number(appointmentResponse?.data && appointmentResponse?.data?.appointments?.[0]?.id)
        )
        openInsurancePaymentModal()
      } catch {
        toast?.({
          type: 'error',
          title: 'Failed to book appointment. Please try again.',
        })
        return
      }
    } catch {
      toast?.({
        type: 'error',
        title: 'An unexpected error occurred. Please try again.',
      })
    } finally {
      setIsLoading(false)
    }
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
      <Flex direction="column" gap="4">
        <Flex className="flex-col sm:flex-row" gap="4">
          <Flex direction="column" gap="1" className="w-full">
            <Text as="p" className="text-[14px] font-medium text-[#1C2024]">
              <Text>First Name</Text>
              <Text className="text-[#f14545]">*</Text>
            </Text>

            <FormTextInput
              type="text"
              label=""
              placeholder="Jade"
              size="3"
              maxLength={16}
              radius="full"
              className="font-[400]"
              data-testid="first-name-input"
              {...form.register('firstName')}
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </FormTextInput>
          </Flex>

          <Flex direction="column" gap="1" className="w-full">
            <Text as="p" className="text-[14px] font-medium text-[#1C2024]">
              <Text>Last Name</Text>
              <Text className="text-[#f14545]">*</Text>
            </Text>

            <FormTextInput
              type="text"
              label=""
              placeholder="Brown"
              size="3"
              maxLength={16}
              radius="full"
              className="font-[400]"
              data-testid="last-name-input"
              {...form.register('lastName')}
            >
              <TextField.Slot>
                <PersonIcon />
              </TextField.Slot>
            </FormTextInput>
          </Flex>
        </Flex>

        <Flex className="flex-col sm:flex-row" gap="4">
          <Flex direction="column" gap="1" className="w-full">
            <Text as="p" className="text-[14px] font-medium text-[#1C2024]">
              <Text>Date of Birth</Text>
              <Text className="text-[#f14545]">*</Text>
            </Text>

            <FormTextInput
              type="date"
              label=""
              max="9999-12-31"
              size="3"
              radius="full"
              data-testid="date-of-birth-input"
              {...form.register('dateOfBirth')}
              defaultValue={searchParams.get('dateOfBirth') ?? ''}
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
            <Text as="p" className="text-[14px] font-medium text-[#1C2024]">
              <Text>Phone Number</Text>
              <Text className="text-[#f14545]">*</Text>
            </Text>

            <FormPhoneNumberInput
              label=""
              size="3"
              radius="full"
              placeholder="(123) 123 1234"
              data-testid="phone-number-input"
              {...form.register('phoneNumber')}
            />
          </Flex>
        </Flex>

        <Flex direction="column" gap="1" className="w-full">
          <Text as="p" className="text-[14px] font-medium text-[#1C2024]">
            <Text>Email Address</Text>
            <Text className="text-[#f14545]">*</Text>
          </Text>

          <FormTextInput
            type="text"
            label=""
            placeholder="hello@email.com"
            radius="full"
            data-testid="email-input"
            {...form.register('email')}
          />
        </Flex>


        <Flex gap="4" p="4" direction="column" className='border border-pp-gray-7 rounded-2'>
          <Flex align="center" className="flex-col gap-4 sm:flex-row">
            <Flex align="center" gap="2">
              <UserFillIcon />

              <Box>
                <Text size="3" className='font-medium text-[#1C2024]'>Do you have a parent/guardian?</Text>
                <Text className="text-[#f14545] px-0.5">*</Text>
              </Box>
            </Flex>


            <RadioGroup.Root
              data-testid="is-parent-or-guardian-input"
              name="isParentOrGuardian"
              value={String(form.watch('isParentOrGuardian'))}
              onValueChange={(value) => {
                form.setValue('isParentOrGuardian', value === 'true')
              }}
            >
              <Flex gap="2">
                {['true', 'false'].map((option) => (
                  <RadioGroupToggle
                    value={form.watch('isParentOrGuardian')}
                    option={option}
                    key={option}
                    className={cn('py-2 px-[10px] rounded-[1000px] text-[14px]', {
                      'bg-white': option !== String(form.watch('isParentOrGuardian')),
                      'bg-pp-blue-3 text-white': option === String(form.watch('isParentOrGuardian')),
                    })}
                  />
                ))}
              </Flex>
            </RadioGroup.Root>
          </Flex>

          {hasParentOrGuardian ? (
            <Flex gap="4" className="flex-col sm:flex-row">
              <Flex direction="column" gap="1" className="w-full">
                <Text as="p" className="text-[14px] font-medium text-[#1C2024]">
                  <Text>Guardian First Name</Text>
                  <Text className="text-[#f14545]">*</Text>
                </Text>

                <FormTextInput
                  type="text"
                  label=""
                  placeholder="Jane"
                  size="3"
                  maxLength={16}
                  radius="full"
                  className="font-[400]"
                  data-testid="guardian-first-name-input"
                  {...form.register('guardianFirstName')}
                >
                  <TextField.Slot>
                    <PersonIcon />
                  </TextField.Slot>
                </FormTextInput>
              </Flex>

              <Flex direction="column" gap="1" className="w-full">
                <Text as="p" className="text-[14px] font-medium text-[#1C2024]">
                  <Text>Guardian Last Name</Text>
                  <Text className="text-[#f14545]">*</Text>
                </Text>

                <FormTextInput
                  type="text"
                  label=""
                  placeholder="Brown"
                  size="3"
                  maxLength={16}
                  radius="full"
                  className="font-[400]"
                  data-testid="guardian-last-name-input"
                  {...form.register('guardianLastName')}
                >
                  <TextField.Slot>
                    <PersonIcon />
                  </TextField.Slot>
                </FormTextInput>
              </Flex>
            </Flex>
          ) : null}
        </Flex>

        <Box>
          <Flex gap="2">
            <Checkbox
              className='mt-1 cursor-pointer'
              name='agreeToTerms'
              checked={hasAgreedToTerms}
              onCheckedChange={(checked: boolean) => form.setValue('agreeToTerms', checked)}
            />

            <Text as="label" htmlFor='agreeToTerms'>
              I am the above mentioned patient or guardian of the patient and I agree to electronically sign all{' '}
              <Text
                as="span"
                className="text-[#194595] underline cursor-pointer"
                onClick={() => {
                  publish(`${SCHEDULE_APPOINTMENT_LIST}:open-tos`)
                }}
              >
                policies
              </Text>
            </Text>
          </Flex>

          <FormFieldError
            message={form.formState.errors.agreeToTerms?.message}
          />
        </Box>

        <FormSubmitButton
          data-testid="signup-submit-button"
          radius="full"
          className="w-full text-white cursor-pointer bg-[#151B4A]"
        >
          <Text className="font-bold text-5 md:text-2">
            {isLoading ? 'Loading...' : 'Book Now'}
          </Text>
        </FormSubmitButton>

        <Flex align="center" justify="center" gap="2">
          <Text size="3" className="text-[#1C2024]">
            Already have an account?
          </Text>

          <NextLink
            href={'#'}
            onClick={() => {
              publish(`${SCHEDULE_APPOINTMENT_LIST}:existing-login`, {
                url: getLoginRedirectUrl(patientAppUrl),
              })
            }}
          >
            <Text className="text-[#194595] underline">Login</Text>
          </NextLink>
        </Flex>

        <Flex align="center" justify="center" gap="2">
          <HipaaComplianceIcon />

          <Text size="3" className="text-[#1C2024] font-medium">
            Secure & HIPAA Compliant
          </Text>
        </Flex>
      </Flex>
    </Form>
  )
}
export { PersonalDetailsForm, INSURANCE_PAYMENT_MODAL }
