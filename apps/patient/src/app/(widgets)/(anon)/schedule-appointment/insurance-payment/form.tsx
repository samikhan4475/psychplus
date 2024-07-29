'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ProviderType } from '@psychplus-v2/constants'
import { cn, getProviderTypeLabel } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { z } from 'zod'
import {
  CardSide,
  InsurancePayers,
  InsurancePlans,
  InsurancePolicyPriority,
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
import { FormError } from '@/components-v2'
import AppointmentDetailCard from '@/components/appointment-detail-card/appointment-detail-card'
import { BookedSlot, useStore } from '@/widgets/schedule-appointment-list/store'

type SchemaType = z.infer<typeof baseSchema>
const baseSchema = z.object({
  cardHolderName: validate.nullableString,
  insurancePayerId: validate.nullableString,
  insurancePlanId: validate.nullableString,
  memberId: validate.nullableString,
  groupNumber: validate.nullableString,
  effectiveDate: validate.nullableString,
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

  const cardSchema = z.object({
    cardHolderName: isCreditCardRequired
      ? validate.requiredString
      : validate.nullableString,
  })

  const schema = baseSchema.merge(insuranceSchema).merge(cardSchema)

  const form = useForm({ schema })

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

    if (data.cardHolderName) {
      const cardSubmitted = await handleCardSubmit(data)
      if (!cardSubmitted) {
        setIsLoading(false)
        return
      }
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

    bookAppointment({
      locationId: bookSlotState?.clinic?.id ?? 0,
      specialistStaffId: bookSlotState?.specialist?.id ?? 0,
      specialistTypeCode: bookSlotState?.specialistTypeCode ?? 0,
      type: appointmentTypeMapper[bookSlotState?.type ?? ''],
      startDate,
      duration: bookSlotState?.duration || 0,
      isFollowup: true,
      serviceId: bookSlotState?.servicesOffered?.[0],
    })
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

  const handleCardSubmit = async (data: SchemaType) => {
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

      if (data.cardHolderName) {
        try {
          await addCreditCard({
            patientId: patient?.id ?? 0,
            cardType: paymentMethod?.card?.brand ?? '',
            name: data.cardHolderName,
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
    }

    return true
  }

  const handlePolicySubmit = (data: SchemaType): Promise<boolean> => {
    return submitPatientPolicy({
      insurancePlanId: data.insurancePlanId ?? '',
      memberId: data.memberId ?? '',
      groupNumber: data.groupNumber ?? '',
      effectiveDate: data.effectiveDate ?? '',
      hasCardFrontImage: !!cardFrontImage,
      hasCardBackImage: !!cardBackImage,
      insurancePolicyPriority: InsurancePolicyPriority.PRIMARY,
      isPatientPolicyHolder: true,
      isActive: true,
    })
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

  return (
    <Form form={form} onSubmit={submitHandler}>
      <AppointmentDetailCard />

      <Text className="my-5 text-6 font-bold sm:text-7 md:text-8">
        Do you want to use your insurance
        <br />
        for this visit?
      </Text>

      <Flex>
        {insuranceOptions.map((option) => (
          <button
            type="button"
            key={option.key}
            className="border-darkblue mr-3 box-border rounded-[40px] border border-solid px-[25px] py-[8px] sm:px-[40px] sm:py-[15px]"
            style={{
              color:
                hasInsurance === option.value ? whiteColor : psychPlusBlueColor,
              background:
                hasInsurance === option.value ? psychPlusBlueColor : whiteColor,
            }}
            onClick={() => setHasInsurance(option.value)}
          >
            <Text className="text-[22px] font-bold leading-[normal]">
              {option.label}
            </Text>
          </button>
        ))}
      </Flex>

      {hasInsurance && (
        <>
          <Flex direction="column" className="mt-10">
            <Text as="p" className="text-[20px]">
              Let’s collect your insurance information
            </Text>
            <Flex gap="5" className="mt-2">
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
              <Text as="p" className="text-[14px] font-medium">
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
                  className="h-[56px] w-full rounded-3"
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
              <Text as="p" className="text-[14px] font-medium">
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
                  className="h-[56px] w-full rounded-3"
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
              <Text as="p" className="text-[14px] font-medium">
                <Text>Member ID</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>
              <FormTextInput
                type="text"
                label=""
                placeholder="Member ID"
                className="h-[56px] w-full px-1"
                data-testid="insurance-id"
                {...form.register('memberId')}
              />
            </Flex>

            <Flex direction="column" gap="1">
              <Text as="p" className="text-[14px] font-medium">
                <Text>Group Number</Text>
                <Text className="text-[#f14545]">*</Text>
              </Text>
              <FormTextInput
                type="text"
                label=""
                placeholder="Group Number"
                className="h-[56px] w-full px-1"
                data-testid="group-number"
                {...form.register('groupNumber')}
              />
            </Flex>

            <Flex direction="column" gap="1">
              <Text as="p" className="text-[14px] font-medium">
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
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  const selectedDate = event.target.value
                  const [effectiveDate] = new Date(selectedDate)
                    .toISOString()
                    .split('T')
                  form.setValue('effectiveDate', effectiveDate)
                  form.trigger('effectiveDate')
                }}
                className="mr-2 mt-2 h-[50px] w-full text-3 font-regular text-gray-10"
              />
            </Flex>
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
        <Text as="p" className="text-[14px] font-medium">
          <Text>Cardholder Name</Text>
          {isCreditCardRequired && <Text className="text-[#f14545]">*</Text>}
        </Text>
        <FormTextInput
          type="text"
          label=""
          placeholder="Cardholder Name"
          className="h-[56px] w-full px-1"
          data-testid="cardholder-name"
          {...form.register('cardHolderName')}
        />

        <Text as="p" className="mt-3 text-[14px] font-medium">
          <Text>Cardholder Details</Text>
          {isCreditCardRequired && <Text className="text-[#f14545]">*</Text>}
        </Text>
        <CardElement
          options={{ hidePostalCode: true }}
          className="mr-3 h-[56px] w-full rounded-3 border border-gray-7 py-[16px] pl-3"
        />
      </Flex>

      <FormError message={formError} className="mt-5" />

      <Flex>
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

export default InsurancePaymentForm
