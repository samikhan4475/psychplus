'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  INSURANCE_INFO,
  ProviderType,
  SELF_PAY_INFO,
} from '@psychplus-v2/constants'
import { cn, getAgeFromDate, getProviderTypeLabel } from '@psychplus-v2/utils'
import { Box, Flex, RadioGroup, Text } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { z } from 'zod'
import {
  BookAppointmentPayload,
  CardSide,
  InsurancePayers,
  InsurancePlans,
  InsurancePolicyPriority,
  PatientPolicy,
} from '@psychplus/appointments'
import {
  addCreditCard,
  bookAppointment,
  fetchCreditCards,
  fetchInsurancePayer,
  submitPatientPolicy,
  submitPatientPolicyCard,
} from '@psychplus/appointments/api.client'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Select } from '@psychplus/ui/select'
import { clickTrack } from '@psychplus/utils/tracking'
import { ImageUploader, psychPlusBlueColor, whiteColor } from '@/components'
import { FormError, SSNInput } from '@/components-v2'
import AppointmentDetailCard from '@/components/appointment-detail-card/appointment-detail-card'
import { BookedSlot, useStore } from '@/widgets/schedule-appointment-list/store'

type SchemaType = z.infer<typeof baseSchema>
const baseSchema = z
  .object({
    insurancePayerId: validate.nullableString,
    insurancePlanId: validate.nullableString,
    memberId: validate.nullableString,
    groupNumber: validate.nullableString,
    effectiveDate: validate.nullableString,
    terminationDate: validate.nullableString,
    isPatientPolicyHolder: z.boolean(),
    policyHolderFirstName: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    policyHolderLastName: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    policyHolderGender: z.string().optional().optional(),
    policyHolderRelationship: z.string().optional().optional(),
    insurancePolicyPriority: z.string().min(1, 'Required'),
    policyHolderDateOfBirth: z.string().optional(),
    policyHolderSocialSecurityNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.isPatientPolicyHolder) {
      if (!data.policyHolderFirstName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderFirstName'],
        })
      }

      if (!data.policyHolderLastName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderLastName'],
        })
      }

      if (
        data.policyHolderDateOfBirth === '' ||
        data.policyHolderDateOfBirth === null ||
        data.policyHolderDateOfBirth === undefined
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          fatal: true,
          path: ['policyHolderDateOfBirth'],
        })
      } else if (getAgeFromDate(data.policyHolderDateOfBirth) < 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Must be at least 18 years of age',
          fatal: true,
          path: ['policyHolderDateOfBirth'],
        })
      }

      if (!data.policyHolderGender) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderGender'],
        })
      }

      if (!data.policyHolderRelationship) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Required',
          path: ['policyHolderRelationship'],
        })
      }
    }
  })

interface InsurancePaymentFormProps {
  insuranceOptions: {
    key: string
    label: string
    value: boolean
  }[]
  insurancePayers: InsurancePayers
}
const InsurancePaymentForm = ({
  insuranceOptions,
  insurancePayers,
}: InsurancePaymentFormProps) => {
  const [hasInsurance, setHasInsurance] = useState(true)
  const { bookedSlot, patient } = useStore()
  const [bookSlotState, setBookSlotState] = useState<BookedSlot>()

  useEffect(() => {
    setBookSlotState(bookedSlot)
  }, [bookedSlot])

  const isCreditCardRequired = bookSlotState?.type === 'Virtual'
  let insuranceSchema = z.object({})
  if (hasInsurance) {
    insuranceSchema = z.object({
      insurancePayerId: validate.requiredString,
      insurancePlanId: validate.requiredString,
      memberId: validate.requiredString,
      groupNumber: validate.requiredString,
      effectiveDate: validate.requiredString,
    })
  }

  const schema = baseSchema.and(insuranceSchema)

  const form = useForm({
    schema,
    defaultValues: {
      insurancePlanId: '',
      effectiveDate: '',
      terminationDate: '',
      memberId: '',
      groupNumber: '',
      isPatientPolicyHolder: true,
      policyHolderFirstName: '',
      policyHolderLastName: '',
      policyHolderGender: '',
      policyHolderDateOfBirth: '',
      policyHolderRelationship: '',
      insurancePolicyPriority: 'Primary',
      policyHolderSocialSecurityNumber: '',
    },
  })

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const stripe = useStripe()
  const elements = useElements()
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlans | []>([])
  const [cardFrontImage, setCardFrontImage] = useState<File | undefined>(
    undefined,
  )
  const [cardBackImage, setCardBackImage] = useState<File | undefined>(
    undefined,
  )
  const [formError, setFormError] = useState<string | undefined>(undefined)

  const router = useRouter()

  const submitHandler = async (data: SchemaType) => {
    setIsLoading(true)
    setFormError(undefined)

    const cardSubmitted = await handleCardSubmit()
    if (!cardSubmitted) {
      setIsLoading(false)
      return
    }

    if (hasInsurance) {
      const policySubmitted = await handlePolicySubmit(data)
      if (!policySubmitted) {
        setIsLoading(false)
        return
      }
    }

    const appointmentTypeMapper: { [key: string]: string } = {
      'In-Person': 'InPerson',
      Virtual: 'TeleVisit',
    }
    const startDate = new Date(
      bookSlotState?.startDate ?? new Date(),
    ).toISOString()

    const patientMid = localStorage.getItem('mid')

    const payload: BookAppointmentPayload = {
      locationId: bookSlotState?.locationId
        ? bookSlotState?.locationId
        : bookSlotState?.clinic?.id ?? 0,
      specialistStaffId: bookSlotState?.specialist?.id ?? 0,
      specialistTypeCode: bookSlotState?.specialistTypeCode ?? 0,
      type: appointmentTypeMapper[bookSlotState?.type ?? ''],
      startDate,
      duration: bookSlotState?.duration || 0,
      isFollowup: true,
      serviceId: bookSlotState?.servicesOffered?.[0],
      providerType:
        bookSlotState?.specialistTypeCode === 1 ? 'Psychiatrist' : 'Therapy',
      isSelfPay: hasInsurance ? false : true,
      stateCode: bookSlotState?.state,
    }

    if (patientMid) {
      payload.marketingCampaignId = patientMid as string
    }

    bookAppointment(payload)
      .then(() => {
        const providerType =
          bookedSlot?.specialistTypeCode === 1
            ? ProviderType.Psychiatrist
            : ProviderType.Therapist
        clickTrack({
          productArea: 'Patient',
          productPageKey: 'Web appointmentBooked',
          clickAction: 'Accepted',
          clickActionData: `${getProviderTypeLabel(providerType)}|${
            appointmentTypeMapper[bookSlotState?.type ?? '']
          }`,
        })

        router.push('/schedule-appointment/confirmation')
      })
      .catch((err) => {
        setFormError(err.message)
        setIsLoading(false)
      })
  }

  const handleCardSubmit = async () => {
    if (!stripe || !elements) {
      alert("Stripe.js hasn't loaded yet.")
      return false
    }

    const cards = await fetchCreditCards()
    if (cards.length === 0) {
      const result = await stripe.createPaymentMethod({
        elements,
      })

      if (result.error) {
        setFormError(result.error.message)
        return false
      }

      const { paymentMethod } = result

      try {
        await addCreditCard({
          patientId: patient?.id ?? 0,
          cardType: paymentMethod?.card?.brand ?? '',
          name:
            patient?.legalName?.firstName + ' ' + patient?.legalName?.lastName,
          numberLastFour: paymentMethod?.card?.last4 ?? '',
          isActive: true,
          isPrimary: true,
          expireMonth: paymentMethod?.card?.exp_month ?? 0,
          expireYear: paymentMethod?.card?.exp_year ?? 0,
          cardKey: paymentMethod?.id ?? '',
        })
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : (err as { message: string }).message
        setFormError(message)

        return false
      }
    }

    return true
  }

  const handlePolicySubmit = (data: SchemaType): Promise<boolean> => {
    const payload: PatientPolicy = {
      insurancePlanId: data.insurancePlanId ?? '',
      effectiveDate: data.effectiveDate ?? '',
      terminationDate: data.terminationDate ?? '',
      memberId: data.memberId ?? '',
      groupNumber: data.groupNumber ?? '',
      isPatientPolicyHolder: data.isPatientPolicyHolder ?? 'Yes',
      insurancePolicyPriority: InsurancePolicyPriority.PRIMARY,
      isActive: true,
      hasCardFrontImage: cardFrontImage !== undefined,
      hasCardBackImage: cardBackImage !== undefined,
    }
    if (!data.isPatientPolicyHolder) {
      payload.policyHolderName = {
        firstName: data?.policyHolderFirstName ?? '',
        lastName: data?.policyHolderLastName ?? '',
      }
      payload.policyHolderGender = data?.policyHolderGender
      payload.policyHolderDateOfBirth = data?.policyHolderDateOfBirth
      payload.policyHolderRelationship = data?.policyHolderRelationship
      payload.policyHolderSocialSecurityNumber =
        data?.policyHolderSocialSecurityNumber
    }

    return submitPatientPolicy(payload)
      .then((res) => {
        if (res.id) {
          if (cardFrontImage) {
            submitPatientPolicyCard({
              policyId: res.id,
              cardSide: CardSide.FRONT,
              image: cardFrontImage,
            })
          }
          if (cardBackImage) {
            submitPatientPolicyCard({
              policyId: res.id,
              cardSide: CardSide.BACK,
              image: cardBackImage,
            })
          }
        }

        return true
      })
      .catch((error) => {
        setFormError(
          error.status === 409
            ? 'Duplicate insurance policy found'
            : 'Something went wrong',
        )
        return false
      })
  }

  const changePayerHandler = async (payerId: string) => {
    const payer = await fetchInsurancePayer(payerId)
    form.setValue('insurancePayerId', payerId)
    setInsurancePlans(payer.plans ?? [])
    form.trigger('insurancePayerId')
  }

  const watchisPatientPolicyHolder = form.watch('isPatientPolicyHolder')

  useEffect(() => {
    if (!watchisPatientPolicyHolder) {
      form.register('policyHolderFirstName')
      form.register('policyHolderLastName')
      form.register('policyHolderDateOfBirth')
      form.register('policyHolderGender')
      form.register('policyHolderRelationship')
    } else {
      form.unregister('policyHolderFirstName')
      form.unregister('policyHolderLastName')
      form.unregister('policyHolderDateOfBirth')
      form.unregister('policyHolderGender')
      form.unregister('policyHolderRelationship')
    }
  }, [form.register, form.unregister, watchisPatientPolicyHolder])

  const onCheckedChange = (isPolicyHolder: boolean) => {
    if (isPolicyHolder) {
      form.clearErrors('policyHolderFirstName')
      form.clearErrors('policyHolderLastName')
      form.clearErrors('policyHolderDateOfBirth')
      form.clearErrors('policyHolderGender')
      form.clearErrors('policyHolderRelationship')
    }
    form.setValue('isPatientPolicyHolder', isPolicyHolder, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: 'effectiveDate' | 'terminationDate' | 'policyHolderDateOfBirth',
  ) => {
    const selectedDate = event.target.value
    const [formattedDate] = new Date(selectedDate).toISOString().split('T')
    form.setValue(name, formattedDate)
    form.trigger(name)
  }

  return (
    <Form form={form} onSubmit={submitHandler}>
      <AppointmentDetailCard />

      <Text className="my-5 text-2 md:text-6 font-bold">
        Do you want to use your insurance
        <br />
        for this visit?
      </Text>

      <Flex>
        {insuranceOptions.map((option) => (
          <button
            type="button"
            key={option.key}
            className="border-darkblue mr-3 box-border rounded-[40px] border border-solid px-[15px] py-[5px] md:px-[25px] md:py-[8px]"
            style={{
              color:
                hasInsurance === option.value ? whiteColor : psychPlusBlueColor,
              background:
                hasInsurance === option.value ? psychPlusBlueColor : whiteColor,
            }}
            onClick={() => setHasInsurance(option.value)}
          >
            <Text className="text-[15px] font-bold leading-[normal] md:text-[22px]">
              {option.label}
            </Text>
          </button>
        ))}
      </Flex>
      <Box className="bg-pp-gray-2 my-3 rounded-3 px-3 py-3 text-3 md:text-4">
        {hasInsurance ? INSURANCE_INFO : SELF_PAY_INFO}
      </Box>

      {hasInsurance && (
        <>
          <Flex direction="column" className="mt-10">
            <Text as="p" className="text-[15px] md:text-[20px]">
              Let’s collect your insurance information
            </Text>
            <Flex gap="5" className="mt-2 flex-col items-center md:flex-row">
              <ImageUploader
                displayText={`Upload Image<br/>Front Side`}
                onFileChange={setCardFrontImage}
                defaultImage={
                  cardFrontImage ? URL.createObjectURL(cardFrontImage) : null
                }
              />
              <ImageUploader
                displayText={`Upload Image<br/>Back Side`}
                onFileChange={setCardBackImage}
                defaultImage={
                  cardBackImage ? URL.createObjectURL(cardBackImage) : null
                }
              />
            </Flex>
          </Flex>

          <Flex direction="column" gap="4" className="mt-10">
            <Text as="p" className="text-[20px] font-bold">
              Insurance Details
            </Text>
            <Flex direction="column" gap="1">
              <Text as="p" className="text-[12px] font-medium md:text-[14px]">
                <Text>Payer</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>

              <Select.Root
                size="3"
                name="insurancePayerId"
                value={form.watch('insurancePayerId') ?? ''}
                onValueChange={changePayerHandler}
              >
                <Select.Trigger
                  placeholder="Select Payer"
                  className="h-[46px] w-full rounded-3 md:h-[56px]"
                />
                <Select.Content
                  position="popper"
                  className="max-h-[275px] overflow-y-scroll"
                  highContrast
                >
                  {insurancePayers.map((insurancePayer) => (
                    <Select.Item
                      value={insurancePayer.id}
                      key={insurancePayer.id}
                    >
                      {insurancePayer.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              {form.formState.errors.insurancePayerId && (
                <Text size="2" color="red">
                  {form.formState.errors.insurancePayerId.message}
                </Text>
              )}
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="p" className="text-[12px] font-medium md:text-[14px]">
                <Text>Insurance Plan</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>

              <Select.Root
                size="3"
                name="insurancePlanId"
                value={form.watch('insurancePlanId') ?? ''}
                onValueChange={(value) => {
                  form.setValue('insurancePlanId', value)
                  form.trigger('insurancePlanId')
                }}
              >
                <Select.Trigger
                  placeholder="Select Insurance Plan"
                  className="h-[46px] w-full rounded-3 md:h-[56px]"
                />
                <Select.Content
                  position="popper"
                  className="max-h-[275px] overflow-y-scroll"
                  highContrast
                >
                  {insurancePlans.map((insurancePlan) => (
                    <Select.Item
                      value={insurancePlan.id}
                      key={insurancePlan.id}
                    >
                      {insurancePlan.name}
                    </Select.Item>
                  ))}
                </Select.Content>
              </Select.Root>
              {form.formState.errors.insurancePlanId && (
                <Text size="2" color="red">
                  {form.formState.errors.insurancePlanId.message}
                </Text>
              )}
            </Flex>

            <Flex direction="column" gap="1">
              <Text as="p" className="text-[12px] font-medium md:text-[14px]">
                <Text>Member ID</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>
              <FormTextInput
                type="text"
                label=""
                placeholder="Member ID"
                className="h-[46px] w-full px-1 md:h-[56px]"
                data-testid="insurance-id"
                {...form.register('memberId')}
              />
            </Flex>

            <Flex direction="column" gap="1">
              <Text as="p" className="text-[12px] font-medium md:text-[14px]">
                <Text>Group Number</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>
              <FormTextInput
                type="text"
                label=""
                placeholder="Group Number"
                className="h-[46px] w-full px-1 md:h-[56px]"
                data-testid="group-number"
                {...form.register('groupNumber')}
              />
            </Flex>

            <Flex direction="column" gap="1">
              <Text as="p" className="text-[12px] font-medium md:text-[14px]">
                <Text>Effective Date</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>

              <FormTextInput
                label=""
                type="date"
                name="effectiveDate"
                data-testid="effective-date"
                value={form.watch('effectiveDate') ?? ''}
                max="9999-12-31"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleDateChange(event, 'effectiveDate')
                }
                className="mr-2 mt-2 h-[40px] w-full text-3 font-regular text-gray-10 md:h-[50px]"
              />
            </Flex>
            <Flex direction="column" gap="1">
              <Text as="p" className="text-[12px] font-medium md:text-[14px]">
                <Text>Termination Date</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>

              <FormTextInput
                label=""
                type="date"
                name="terminationDate"
                data-testid="termination-date"
                value={form.watch('terminationDate') ?? ''}
                max="9999-12-31"
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleDateChange(event, 'terminationDate')
                }
                className="mr-2 mt-2 h-[40px] w-full text-3 font-regular text-gray-10 md:h-[50px]"
              />
            </Flex>
            <Box
              className="mt-2 flex-1 rounded-3 bg-[#F0F4FF] px-3 py-1.5"
              mb="2"
            >
              <Text as="p" className="text-[12px] font-medium md:text-[14px]">
                <Text>Are you the primary insurance holder</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>
              <RadioGroup.Root
                id="isPatientPolicyHolder"
                value={String(form.watch('isPatientPolicyHolder'))}
                data-testid="signup-is-parent-or-guardian-input"
                defaultValue={String(true)}
                onValueChange={(value) => {
                  const isPolicyHolder = value === 'true'
                  onCheckedChange(isPolicyHolder)
                }}
              >
                <Flex gap="4">
                  {[
                    { label: 'Yes', value: true },
                    { label: 'No', value: false },
                  ].map((option) => (
                    <Text as="label" key={option.label} size="2">
                      <Flex gap="1">
                        <RadioGroup.Item
                          value={String(option.value)}
                          className={cn(
                            `rounded-full border-pp-gray-2 relative flex h-5 w-5 items-center justify-center border`,
                            watchisPatientPolicyHolder === option.value &&
                              'bg-pp-blue-3',
                          )}
                        />
                        {watchisPatientPolicyHolder === option.value && (
                          <Box className="rounded-full bg-white absolute ml-[4.5px] mt-[5px] h-2.5 w-2.5" />
                        )}
                        {option.label}
                      </Flex>
                    </Text>
                  ))}
                </Flex>
              </RadioGroup.Root>
            </Box>
            {!watchisPatientPolicyHolder && (
              <>
                <Text className="mb-3 mt-3 text-3 font-bold text-[#151B4A] md:text-5">
                  Primary Insurance Holder Details
                </Text>
                <Flex direction="column" gap="1">
                  <Text
                    as="p"
                    className="text-[12px] font-medium md:text-[14px]"
                  >
                    <Text>First Name</Text>
                    <Text className="text-[#f14545]">*</Text>
                  </Text>
                  <FormTextInput
                    type="text"
                    label=""
                    placeholder="First name"
                    className="h-[46px] w-full px-1 md:h-[56px]"
                    data-testid="policy-holder-first-name"
                    {...form.register('policyHolderFirstName')}
                  />
                </Flex>
                <Flex direction="column" gap="1">
                  <Text
                    as="p"
                    className="text-[12px] font-medium md:text-[14px]"
                  >
                    <Text>Last Name</Text>
                    <Text className="text-[#f14545]">*</Text>
                  </Text>
                  <FormTextInput
                    type="text"
                    label=""
                    placeholder="Last name"
                    className="h-[46px] w-full px-1 md:h-[56px]"
                    data-testid="policy-holder-last-name"
                    {...form.register('policyHolderLastName')}
                  />
                </Flex>
                <Flex direction="column" gap="1">
                  <Text
                    as="p"
                    className="text-[12px] font-medium md:text-[14px]"
                  >
                    <Text>Gender</Text>
                    <Text className="text-[#f14545]">*</Text>
                  </Text>

                  <Select.Root
                    size="3"
                    name="policyHolderGender"
                    value={form.watch('policyHolderGender') ?? ''}
                    onValueChange={(value) => {
                      form.setValue('policyHolderGender', value)
                      form.trigger('policyHolderGender')
                    }}
                  >
                    <Select.Trigger
                      placeholder="Select gender"
                      className="h-[46px] w-full rounded-3 md:h-[56px]"
                    />
                    <Select.Content
                      position="popper"
                      className="max-h-[275px] overflow-y-scroll"
                      highContrast
                    >
                      <Select.Item value="NotSpecified">
                        Not specified
                      </Select.Item>
                      <Select.Item value="Male">Male</Select.Item>
                      <Select.Item value="Female">Female</Select.Item>
                      <Select.Item value="Undetermined">
                        Undetermined
                      </Select.Item>
                    </Select.Content>
                  </Select.Root>
                  {form.formState.errors.policyHolderGender && (
                    <Text size="2" color="red">
                      {form.formState.errors.policyHolderGender.message}
                    </Text>
                  )}
                </Flex>
                <Flex direction="column" gap="1">
                  <Text
                    as="p"
                    className="text-[12px] font-medium md:text-[14px]"
                  >
                    <Text>Date of Birth</Text>
                    <Text className="text-[#f14545]">*</Text>
                  </Text>

                  <FormTextInput
                    label=""
                    type="date"
                    name="policyHolderDateOfBirth"
                    data-testid="policy-holder-date-of-birth"
                    value={form.watch('policyHolderDateOfBirth') ?? ''}
                    max="9999-12-31"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      handleDateChange(event, 'policyHolderDateOfBirth')
                    }
                    className="mr-2 mt-2 h-[40px] w-full text-3 font-regular text-gray-10 md:h-[50px]"
                  />
                </Flex>
                <Flex direction="column" gap="1">
                  <Text
                    as="p"
                    className="text-[12px] font-medium md:text-[14px]"
                  >
                    <Text>SSN</Text>
                    <Text className="text-[#f14545]">*</Text>
                  </Text>
                  <SSNInput
                    name="policyHolderSocialSecurityNumber"
                    size="2"
                    placeholder="Enter SSN"
                    className="border-pp-gray-2 h-[40px] w-full rounded-3 border px-2 md:h-[50px]"
                  />
                </Flex>
                <Flex direction="column" gap="1">
                  <Text
                    as="p"
                    className="text-[12px] font-medium md:text-[14px]"
                  >
                    <Text>Relationship</Text>
                    <Text className="text-[#f14545]">*</Text>
                  </Text>

                  <Select.Root
                    size="3"
                    name="policyHolderRelationship"
                    value={form.watch('policyHolderRelationship') ?? ''}
                    onValueChange={(value) => {
                      form.setValue('policyHolderRelationship', value)
                      form.trigger('policyHolderRelationship')
                    }}
                  >
                    <Select.Trigger
                      placeholder="Select relationship"
                      className="h-[46px] w-full rounded-3 md:h-[56px]"
                    />
                    <Select.Content
                      position="popper"
                      className="max-h-[275px] overflow-y-scroll"
                      highContrast
                    >
                      <Select.Item value="Spouse">Spouse</Select.Item>
                      <Select.Item value="Child">Child</Select.Item>
                      <Select.Item value="OtherAdult">Other Adult</Select.Item>
                      <Select.Item value="Guardian">Guardian</Select.Item>
                    </Select.Content>
                  </Select.Root>
                  {form.formState.errors.policyHolderRelationship && (
                    <Text size="2" color="red">
                      {form.formState.errors.policyHolderRelationship.message}
                    </Text>
                  )}
                </Flex>
              </>
            )}
          </Flex>
        </>
      )}

      <Flex className="mb-5 mt-10">
        <Text as="p" className="text-[20px] font-bold">
          <Text>Credit Card Details</Text>{' '}
          {isCreditCardRequired && <Text>(Required)</Text>}
        </Text>
      </Flex>

      <Flex direction="column" gap="1">
        <Text as="p" className="mt-3 text-[12px] font-medium md:text-[14px]">
          <Text>Cardholder Details</Text>
          {isCreditCardRequired && <Text className="text-[#f14545]">*</Text>}
        </Text>
        <CardElement
          options={{ hidePostalCode: true }}
          className="mr-3 h-[46px] w-full rounded-3 border border-gray-7 py-[16px] pl-3 md:h-[56px]"
        />
      </Flex>

      <FormError message={formError} className="mt-5" />

      <Flex className="items-center md:items-start">
        <FormSubmitButton
          className={cn(
            formError ? 'mt-5' : 'mt-10',
            'cursor-pointer rounded-[40px] px-[56px] py-[25px] font-bold',
          )}
          data-testid="submit-button"
          style={{
            color: whiteColor,
            background: psychPlusBlueColor,
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Book Visit'}
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export  {InsurancePaymentForm}
