'use client'

import * as React from 'react'
import { useEffect, useState } from 'react'
import { PaymentType } from '@psychplus-v2/constants'
import { cn, getAgeFromDate } from '@psychplus-v2/utils'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Box, Flex, Text } from '@radix-ui/themes'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { PaymentMethod } from '@stripe/stripe-js'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'
import {
  InsurancePayers,
  InsurancePlans,
  InsurancePolicyPriority,
} from '@psychplus/appointments'
import { fetchInsurancePayer } from '@psychplus/appointments/api.client'
import {
  Form,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Select } from '@psychplus/ui/select'
import { ImageUploader } from '@/components'
import { RadioGroupToggle, SSNInput } from '@/components-v2'
import { HipaaComplianceIcon } from '@/components-v2/icons/hipa-compliance-icon'
import { PlacesAutocomplete } from '@/components-v2/places-autocomplete'
import AppointmentDetailCard from '@/components/appointment-detail-card/appointment-detail-card'
import { PSYCHPLUS_LIVE_URL } from '@/constants'
import { changeAppointmentPaymentMethod } from '@/features/appointments/upcoming/actions/change-appointment-payment-method'
import { addCreditCardAction } from '@/features/billing/credit-debit-cards/actions'
import { uploadInsuranceCard } from '@/features/billing/payments/actions'
import {
  addInsuranceAction,
  InsuranceParams,
} from '@/features/billing/payments/actions/add-insurance'
import { useToast } from '@/providers/toast-provider'
import { useStore } from '@/widgets/schedule-appointment-list/store'
import { SECURE_HIPAA_TEXT, VISIT_NOTES } from './constants'

type PaymentOptionType = 'insurance' | 'selfPay' | 'skip' | null

type InsuranceSchemaType = z.infer<typeof baseSchema>
const baseSchema = z
  .object({
    insurancePayerId: validate.requiredString,
    insurancePlanId: validate.requiredString,
    memberId: validate.nullableString,
    groupNumber: validate.nullableString,
    effectiveDate: validate.nullableString,
    terminationDate: validate.nullableString,
    isPatientPolicyHolder: z.boolean(),
    policyHolderFirstName: z
      .string()
      .max(28, 'Max 28 characters are allowed')
      .optional(),
    policyHolderMiddleName: z
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
    // Only validate date of birth if it's provided and user is not the policy holder
    if (!data.isPatientPolicyHolder && data.policyHolderDateOfBirth) {
      if (getAgeFromDate(data.policyHolderDateOfBirth) < 18) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Must be at least 18 years of age',
          fatal: true,
          path: ['policyHolderDateOfBirth'],
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
  onClose: () => void
}

const DropdownHeader = ({
  title,
  isOpen,
  onClick,
}: {
  title: string
  isOpen: boolean
  onClick: () => void
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'flex w-full items-center justify-between bg-[#F3F4F6] px-2 py-[6px] text-[20px] font-medium transition-colors hover:bg-[#E5E7EB]',
      {
        'rounded-b-0 rounded-t-2': isOpen,
        'rounded-2': !isOpen,
      },
    )}
  >
    <Text className="text-lg font-medium">{title}</Text>
    <svg
      className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 9l-7 7-7-7"
      />
    </svg>
  </button>
)

const FieldLabel = ({
  label,
  required = false,
}: {
  label: string
  required?: boolean
}) => (
  <Text as="p" className="text-[12px] font-medium md:text-[14px]">
    <Text>{label}</Text>
    {required && <Text className="text-[#f14545]">*</Text>}
  </Text>
)

const FormField = ({ children }: { children: React.ReactNode }) => (
  <Flex direction="column" gap="1">
    {children}
  </Flex>
)

const FormErrorText = ({ error }: { error?: string }) =>
  error ? (
    <Text size="2" color="red">
      {error}
    </Text>
  ) : null

const FormSelect = ({
  name,
  placeholder,
  value,
  onValueChange,
  options,
  error,
}: {
  name: string
  placeholder: string
  value: string
  onValueChange: (value: string) => void
  options: Array<{ id: string; name: string }>
  error?: string
}) => (
  <>
    <Select.Root
      size="3"
      name={name}
      value={value}
      onValueChange={onValueChange}
    >
      <Select.Trigger
        placeholder={placeholder}
        className="w-full rounded-[1000px]"
      />

      <Select.Content
        position="popper"
        className="max-h-[275px] overflow-y-scroll"
        highContrast
      >
        {options.map((option) => (
          <Select.Item value={option.id} key={option.id}>
            {option.name}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
    <FormErrorText error={error} />
  </>
)

const FormTextInputField = ({
  type = 'text',
  placeholder,
  className,
  testId,
  register,
  value,
  onChange,
  name,
  max,
}: {
  type?: string
  placeholder: string
  className: string
  testId?: string
  register?: any
  value?: string
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  name?: string
  max?: string
}) => (
  <FormTextInput
    type={type}
    label=""
    placeholder={placeholder}
    className={className}
    data-testid={testId}
    value={value}
    onChange={onChange}
    name={name}
    max={max}
    {...register}
  />
)

const GENDER_OPTIONS = [
  { id: 'NotSpecified', name: 'Not specified' },
  { id: 'Male', name: 'Male' },
  { id: 'Female', name: 'Female' },
  { id: 'Undetermined', name: 'Undetermined' },
]

const RELATIONSHIP_OPTIONS = [
  { id: 'Spouse', name: 'Spouse' },
  { id: 'Child', name: 'Child' },
  { id: 'OtherAdult', name: 'Other Adult' },
  { id: 'Guardian', name: 'Guardian' },
]
const ALLOWED_CARDS = ['amex', 'discover', 'mastercard', 'visa']
const INSURANCE_POLICY_PRIORITY_OPTIONS = Object.values(
  InsurancePolicyPriority,
).map((priority) => ({ id: priority, name: priority }))

const PaymentOptionButton = ({
  isSelected,
  onClick,
  children,
}: {
  isSelected: boolean
  onClick: () => void
  children: React.ReactNode
}) => (
  <button
    type="button"
    className={`w-full rounded-[1000px] px-4 py-[10px] font-medium transition-all duration-200 ${isSelected
      ? 'text-white border border-[#194595] bg-[#194595]'
      : 'border-pp-gray-2 bg-white text-black hover:border-gray-400 border'
      }`}
    onClick={onClick}
  >
    <Text className="text-base font-medium">{children}</Text>
  </button>
)

const PaymentDetailsSection = ({
  selectedPaymentOption,
  onClose,
}: {
  selectedPaymentOption: PaymentOptionType
  onClose: () => void
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const { patient, accessToken, appointmentId } = useStore()
  const { toast } = useToast()

  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState('')

  const PaymentFormSchema = z.object({
    cardName: validate.requiredString,
    Street1: validate.optionalString,
    Street2: validate.optionalString,
    City: validate.optionalString,
    State: validate.optionalString,
    PostalCode: validate.optionalString,
    PostalPlus4Code: validate.optionalString,
  })

  const form = useForm({
    schema: PaymentFormSchema,
    defaultValues: {
      cardName: '',
    },
  })

  const validatePaymentMethod = (result: any) => {
    if (result.error) {
      setFormError(result.error.message)
      return false
    }

    if (result.paymentMethod?.type !== 'card' || !result.paymentMethod?.card) {
      setFormError('Could not collect credit card info')
      return false
    }
    return true
  }

  const validateCardBrand = (cardBrand: string) => {
    if (!cardBrand || !ALLOWED_CARDS.includes(cardBrand)) {
      setFormError('This card type is not allowed.')
      return false
    }
    return cardBrand === 'amex' ? 'AmericanExpress' : cardBrand
  }

  const createBillingAddress = (
    formData: z.infer<typeof PaymentFormSchema>,
  ) => ({
    type: 'Billing',
    street1: formData.Street1,
    street2: formData.Street2,
    city: formData.City,
    state: formData.State,
    country: 'US',
    postalCode: formData.PostalCode,
  })

  const processStripePaymentMethod = async () => {
    const result = await stripe!.createPaymentMethod({
      elements: elements!,
    })

    if (!validatePaymentMethod(result)) {
      return null
    }

    const { paymentMethod } = result
    if (!paymentMethod) {
      setFormError('Could not collect credit card info')
      return null
    }

    const cardBrand = validateCardBrand(paymentMethod.card?.brand ?? '')
    if (!cardBrand) {
      return null
    }

    return { paymentMethod, cardBrand }
  }

  const addCreditCardToSystem = async (
    paymentMethod: PaymentMethod,
    cardBrand: string,
  ) => {
    const formData = form.getValues()
    const billingAddress = createBillingAddress(formData)

    const result = await addCreditCardAction({
      payload: {
        name:
          formData.cardName ||
          patient?.legalName?.firstName + ' ' + patient?.legalName?.lastName,
        cardKey: paymentMethod?.id ?? '',
        cardType: cardBrand,
        numberLastFour: paymentMethod?.card?.last4 ?? '',
        expireMonth: paymentMethod?.card?.exp_month ?? 0,
        expireYear: paymentMethod?.card?.exp_year ?? 0,
        isActive: true,
        patientId: patient?.id ?? 0,
        isPrimary: true,
        billingAddress,
      },
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })

    if (result.state === 'error') {
      toast({
        type: 'error',
        title: result.error,
      })
    } else {
      await changeAppointmentPaymentMethod({
        appointmentId,
        paymentMethod:
          selectedPaymentOption === 'insurance'
            ? (PaymentType.Insurance as string)
            : (PaymentType.SelfPay as string).split(' ').join(''),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      toast({
        type: 'success',
        title: 'Payment card added successfully',
      })
    }
  }

  const validateStripeSetup = () => {
    if (!stripe || !elements) {
      alert("Stripe.js hasn't loaded yet.")
      return false
    }
    return true
  }

  const onSubmit = async () => {
    if (!validateStripeSetup()) {
      return
    }

    const paymentData = await processStripePaymentMethod()

    if (!paymentData) {
      return
    }

    try {
      setIsLoading(true)
      await addCreditCardToSystem(
        paymentData.paymentMethod,
        paymentData.cardBrand,
      )
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : (err as { message: string }).message
      setFormError(message)
    } finally {
      setIsLoading(false)
      onClose()
    }
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Box className="space-y-4">
        <FormField>
          <FieldLabel label="Name on card" required />
          <FormTextInputField
            placeholder="Full name on card"
            className="border-gray-200 focus:border-gray-200 !border-gray-200 w-full rounded-[1000px] px-3 focus:outline-none focus:ring-0"
            testId="card-name"
            register={form.register('cardName')}
          />
        </FormField>

        <FormField>
          <FieldLabel label="Credit card number" required />
          <div className={cn('p-2 h-10 border rounded-[1000px] border-gray-6')}>
            <CardElement
              options={{
                style: {
                  base: {
                    fontWeight: '500',
                    fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
                    fontSize: '16px',
                    fontSmoothing: 'antialiased',
                  },
                },
                hidePostalCode: true,
              }}
            />
          </div>

          {formError ? (
            <Text size="2" color="red">
              {formError}
            </Text>
          ) : null}
        </FormField>

        <PlacesAutocomplete
          name=""
          label=""
          className="rounded-[1000px]"
          isSelfScheduling={true}
          editable={false}
          isFieldsRequired={true}
        />

        <FormSubmitButton
          className="text-white bg-pp-blue-3 mt-8 w-full cursor-pointer rounded-[1000px]"
          data-testid="submit-button"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Save'}
        </FormSubmitButton>
      </Box>
    </Form>
  )
}

const PolicyHolderRadioSection = () => {
  const form = useFormContext()
  const isPatientPolicyHolder = form.watch('isPatientPolicyHolder')

  return (
    <Box className="bg-pp-blue-1 rounded-3 px-3 py-[6px]">
      <FieldLabel label="Are you the primary insurance holder?" required />
      <RadioGroup.Root
        id="isPatientPolicyHolder"
        value={String(isPatientPolicyHolder)}
        data-testid="signup-is-parent-or-guardian-input"
        defaultValue={String(true)}
        onValueChange={(value) =>
          form.setValue('isPatientPolicyHolder', value === 'true')
        }
      >
        <Flex gap="2">
          {['true', 'false'].map((option) => (
            <RadioGroupToggle
              value={isPatientPolicyHolder}
              option={option}
              key={option}
              className={cn('bg-transparent border-none')}
            />
          ))}
        </Flex>
      </RadioGroup.Root>
    </Box>
  )
}

const PolicyHolderDetailsSection = ({
  handleDateChange,
}: {
  handleDateChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: 'effectiveDate' | 'terminationDate' | 'policyHolderDateOfBirth',
  ) => void
}) => {
  const form = useFormContext()

  return (
    <Box className="space-y-4">
      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="First Name" />
          <FormTextInputField
            placeholder="ABC"
            className="w-full rounded-[1000px]"
            testId="policy-holder-first-name"
            register={form.register('policyHolderFirstName')}
          />
        </Box>

        <Box className="basis-1/2">
          <FieldLabel label="Middle Name" />
          <FormTextInputField
            placeholder="JKL"
            className="w-full rounded-[1000px]"
            testId="policy-holder-last-name"
            register={form.register('policyHolderLastName')}
          />
        </Box>
      </Flex>

      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="Last Name" />
          <FormTextInputField
            placeholder="Last name"
            className="w-full rounded-[1000px]"
            testId="policy-holder-last-name"
            register={form.register('policyHolderLastName')}
          />
        </Box>

        <Box className="basis-1/2">
          <FieldLabel label="Gender" />
          <FormSelect
            name="policyHolderGender"
            placeholder="Select gender"
            value={form.watch('policyHolderGender') ?? ''}
            onValueChange={(value) => {
              form.setValue('policyHolderGender', value)
              form.trigger('policyHolderGender')
            }}
            options={GENDER_OPTIONS}
            error={String(
              form.formState.errors.policyHolderGender?.message || '',
            )}
          />
        </Box>
      </Flex>

      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="Date of Birth" />
          <FormTextInputField
            type="date"
            placeholder=""
            className="w-full rounded-[1000px] text-3 font-regular"
            testId="policy-holder-date-of-birth"
            name="policyHolderDateOfBirth"
            value={form.watch('policyHolderDateOfBirth') ?? ''}
            max="9999-12-31"
            onChange={(event) =>
              handleDateChange(event, 'policyHolderDateOfBirth')
            }
          />
        </Box>

        <Box className="basis-1/2">
          <FieldLabel label="SSN" />
          <SSNInput
            name="policyHolderSocialSecurityNumber"
            size="2"
            placeholder="123456789"
            className="border-pp-gray-2 w-full rounded-[1000px] border px-2 py-[6px]"
          />
        </Box>
      </Flex>

      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="Relationship" />
          <FormSelect
            name="policyHolderRelationship"
            placeholder="Father"
            value={form.watch('policyHolderRelationship') ?? ''}
            onValueChange={(value) => {
              form.setValue('policyHolderRelationship', value)
              form.trigger('policyHolderRelationship')
            }}
            options={RELATIONSHIP_OPTIONS}
            error={String(
              form.formState.errors.policyHolderRelationship?.message || '',
            )}
          />
        </Box>
      </Flex>
    </Box>
  )
}

const InsuranceDetailsSection = ({
  insurancePayers,
  insurancePlans,
  changePayerHandler,
  handleDateChange,
}: {
  insurancePayers: InsurancePayers
  insurancePlans: InsurancePlans
  changePayerHandler: (payerId: string) => void
  handleDateChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: 'effectiveDate' | 'terminationDate' | 'policyHolderDateOfBirth',
  ) => void
}) => {
  const form = useFormContext()
  const isPatientPolicyHolder = form.watch('isPatientPolicyHolder')

  return (
    <Box className="space-y-4">
      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="Priority" />
          <FormSelect
            name="insurancePolicyPriority"
            placeholder="Primary"
            value={form.watch('insurancePolicyPriority') ?? ''}
            onValueChange={(value) =>
              form.setValue('insurancePolicyPriority', value)
            }
            options={INSURANCE_POLICY_PRIORITY_OPTIONS}
            error={String(
              form.formState.errors.insurancePolicyPriority?.message || '',
            )}
          />
        </Box>

        <Box className="basis-1/2">
          <FieldLabel label="Payer" required />
          <FormSelect
            name="insurancePayerId"
            placeholder="Ambetter"
            value={form.watch('insurancePayerId') ?? ''}
            onValueChange={changePayerHandler}
            options={insurancePayers}
            error={String(
              form.formState.errors.insurancePayerId?.message || '',
            )}
          />
        </Box>
      </Flex>

      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="Insurance Plan" required />
          <FormSelect
            name="insurancePlanId"
            placeholder="Super Health Plan"
            value={form.watch('insurancePlanId') ?? ''}
            onValueChange={(value) => {
              form.setValue('insurancePlanId', value)
              form.trigger('insurancePlanId')
            }}
            options={insurancePlans}
            error={String(form.formState.errors.insurancePlanId?.message || '')}
          />
        </Box>

        <Box className="basis-1/2">
          <FieldLabel label="Member ID" />
          <FormTextInputField
            placeholder="xxx-xxx-xxx"
            className="w-full rounded-[1000px] px-1"
            testId="insurance-id"
            register={form.register('memberId')}
          />
        </Box>
      </Flex>

      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="Group Number" />
          <FormTextInputField
            placeholder="Group Number"
            className="w-full rounded-[1000px] px-1"
            testId="group-number"
            register={form.register('groupNumber')}
          />
        </Box>

        <Box className="basis-1/2">
          <FieldLabel label="Effective Date" />
          <FormTextInputField
            type="date"
            placeholder=""
            className="w-full rounded-[1000px] text-3 font-regular"
            testId="effective-date"
            name="effectiveDate"
            value={form.watch('effectiveDate') ?? ''}
            max="9999-12-31"
            onChange={(event) => handleDateChange(event, 'effectiveDate')}
          />
        </Box>
      </Flex>

      <Flex gap="3">
        <Box className="basis-1/2">
          <FieldLabel label="Termination Date" />
          <FormTextInputField
            type="date"
            placeholder=""
            className="w-full rounded-[1000px] text-3 font-regular"
            testId="termination-date"
            name="terminationDate"
            value={form.watch('terminationDate') ?? ''}
            max="9999-12-31"
            onChange={(event) => handleDateChange(event, 'terminationDate')}
          />
        </Box>
      </Flex>

      <PolicyHolderRadioSection />

      {!isPatientPolicyHolder ? (
        <PolicyHolderDetailsSection handleDateChange={handleDateChange} />
      ) : null}
    </Box>
  )
}

const ImageUploaderSection = ({
  cardFrontImage,
  setCardFrontImage,
  cardBackImage,
  setCardBackImage,
}: {
  cardFrontImage?: File
  setCardFrontImage: (file: File | undefined) => void
  cardBackImage?: File
  setCardBackImage: (file: File | undefined) => void
}) => (
  <Box className="mb-6">
    <Flex gap="4">
      <Box className="flex-1">
        <ImageUploader
          displayText={`Upload Front Side`}
          onFileChange={setCardFrontImage}
          defaultImage={cardFrontImage ? URL.createObjectURL(cardFrontImage) : null}
        />
      </Box>

      <Box className="flex-1">
        <ImageUploader
          displayText={`Upload Back Side`}
          onFileChange={setCardBackImage}
          defaultImage={cardBackImage ? URL.createObjectURL(cardBackImage) : null}
        />
      </Box>
    </Flex>
  </Box>
)

const InsurancePaymentForm = ({
  insurancePayers,
  onClose,
}: InsurancePaymentFormProps) => {
  const { accessToken, appointmentId } = useStore()
  const { toast } = useToast()

  const [selectedPaymentOption, setSelectedPaymentOption] =
    useState<PaymentOptionType>(null)

  const insuranceForm = useForm({
    schema: baseSchema,
    defaultValues: {
      insurancePlanId: '',
      insurancePayerId: '',
      effectiveDate: '',
      terminationDate: '',
      memberId: '',
      groupNumber: '',
      isPatientPolicyHolder: true,
      policyHolderFirstName: '',
      policyHolderMiddleName: '',
      policyHolderLastName: '',
      policyHolderGender: '',
      policyHolderDateOfBirth: '',
      policyHolderRelationship: '',
      insurancePolicyPriority: 'Primary',
      policyHolderSocialSecurityNumber: '',
    },
  })

  const [isPrimaryInsuranceOpen, setIsPrimaryInsuranceOpen] = useState(false)
  const [isPaymentCardOpen, setIsPaymentCardOpen] = useState(false)
  const [isSelfPayCardOpen, setIsSelfPayCardOpen] = useState(false)
  const [isPrimaryInsuranceDetailsOpen, setIsPrimaryInsuranceDetailsOpen] =
    useState(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [insurancePlans, setInsurancePlans] = useState<InsurancePlans | []>([])
  const [cardFrontImage, setCardFrontImage] = useState<File | undefined>(
    undefined,
  )
  const [cardBackImage, setCardBackImage] = useState<File | undefined>(
    undefined,
  )

  const isPatientPolicyHolder = insuranceForm.watch('isPatientPolicyHolder')

  const onSubmit = async (data: InsuranceSchemaType): Promise<void> => {
    if (!cardFrontImage && !cardBackImage) {
      toast({
        title: 'Please upload both sides of the card',
        description: 'Please upload both sides of the card',
        type: 'error',
      })

      return
    }

    const payer = insurancePayers.find((payer) => payer.id === data.insurancePayerId);

    const filterEmptyValues = (obj: any) => {
      return Object.entries(obj).reduce((acc, [key, value]) => {
        if (value !== '' && value !== null && value !== undefined) {
          acc[key] = value
        }
        return acc
      }, {} as any)
    }

    const payloadData = {
      insurancePlanId: data.insurancePlanId ?? '',
      payerName: payer?.name ?? '',
      effectiveDate: data.effectiveDate ?? '',
      terminationDate: data.terminationDate ?? '',
      memberId: data.memberId ?? '',
      groupNumber: data.groupNumber ?? '',
      isPatientPolicyHolder: data.isPatientPolicyHolder ?? 'Yes',
      insurancePolicyPriority: data.insurancePolicyPriority as InsurancePolicyPriority,
      isActive: true,
      hasCardFrontImage: cardFrontImage !== undefined,
      hasCardBackImage: cardBackImage !== undefined,
      ...(data.isPatientPolicyHolder ? {} : {
        ...(data.policyHolderFirstName?.trim() && {
          policyHolderName: {
            firstName: data.policyHolderFirstName,
            ...(data.policyHolderLastName?.trim() && { lastName: data.policyHolderLastName })
          }
        }),
        ...(data.policyHolderGender?.trim() && { policyHolderGender: data.policyHolderGender }),
        ...(data.policyHolderDateOfBirth?.trim() && { policyHolderDateOfBirth: data.policyHolderDateOfBirth }),
        ...(data.policyHolderRelationship?.trim() && { policyHolderRelationship: data.policyHolderRelationship }),
        ...(data.policyHolderSocialSecurityNumber?.trim() && { policyHolderSocialSecurityNumber: data.policyHolderSocialSecurityNumber })
      })
    }

    const payload = filterEmptyValues(payloadData) as InsuranceParams

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    }

    setIsLoading(true)
    const addInsurance = await addInsuranceAction(payload, headers)

    if (addInsurance.state === 'error') {
      toast({
        title: addInsurance.error,
        type: 'error',
      })

      setIsLoading(false)
      return
    }

    await changeAppointmentPaymentMethod({
      appointmentId,
      paymentMethod: PaymentType.Insurance as string,
      headers,
    })

    const cardPromises = []
    if (cardFrontImage) {
      cardPromises.push(
        uploadInsuranceCard(
          {
            file: cardFrontImage,
            side: 'Front',
            policyId: addInsurance.data.id,
          },
          headers,
        ),
      )
    }

    if (cardBackImage) {
      cardPromises.push(
        uploadInsuranceCard(
          {
            file: cardBackImage,
            side: 'Back',
            policyId: addInsurance.data.id,
          },
          headers,
        ),
      )
    }

    const cardUploadResponse = await Promise.all(cardPromises)

    if (cardUploadResponse.some((r) => !r.ok)) {
      toast({
        title: 'Could not upload insurance card images Please try again later.',
        type: 'error',
      })

      setIsLoading(false)
      return
    }

    toast({
      title: 'Insurance policy added successfully',
      type: 'success',
    })
    setIsLoading(false)
  }

  const changePayerHandler = async (payerId: string) => {
    const payer = await fetchInsurancePayer(payerId)
    insuranceForm.setValue('insurancePayerId', payerId)
    insuranceForm.setValue('insurancePlanId', '')
    const plans = payer.plans ?? []
    setInsurancePlans(plans)
    insuranceForm.trigger('insurancePayerId')
  }

  const handleDateChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    name: 'effectiveDate' | 'terminationDate' | 'policyHolderDateOfBirth',
  ) => {
    const selectedDate = event.target.value

    if (!selectedDate) {
      insuranceForm.setValue(name, '')
    } else {
      const [formattedDate] = new Date(selectedDate).toISOString().split('T')
      insuranceForm.setValue(name, formattedDate)
    }
    
    insuranceForm.trigger(name)
  }

  useEffect(() => {
    if (!isPatientPolicyHolder) {
      insuranceForm.register('policyHolderFirstName')
      insuranceForm.register('policyHolderMiddleName')
      insuranceForm.register('policyHolderLastName')
      insuranceForm.register('policyHolderDateOfBirth')
      insuranceForm.register('policyHolderGender')
      insuranceForm.register('policyHolderRelationship')
      insuranceForm.register('policyHolderSocialSecurityNumber')
    } else {
      insuranceForm.unregister('policyHolderFirstName')
      insuranceForm.unregister('policyHolderMiddleName')
      insuranceForm.unregister('policyHolderLastName')
      insuranceForm.unregister('policyHolderDateOfBirth')
      insuranceForm.unregister('policyHolderGender')
      insuranceForm.unregister('policyHolderRelationship')
      insuranceForm.unregister('policyHolderSocialSecurityNumber')
    }
  }, [insuranceForm.register, insuranceForm.unregister, isPatientPolicyHolder])

  useEffect(() => {
    if (insurancePlans.length > 0) {
      const currentPlanId = insuranceForm.watch('insurancePlanId')
      if (!currentPlanId) {
        insuranceForm.setValue('insurancePlanId', insurancePlans[0].id)
        insuranceForm.trigger('insurancePlanId')
      }
    }
  }, [insurancePlans, insuranceForm])

  return (
    <>
      <Box className="border-pp-gray-2 mb-7 rounded-[12px] border p-6">
        <AppointmentDetailCard showActions />
      </Box>

      <Text className="text-6 font-bold text-[#1C2024]">
        How would you like to pay for this appointment
      </Text>

      <Flex gap="3" className="mt-4">
        <PaymentOptionButton
          isSelected={selectedPaymentOption === 'insurance'}
          onClick={() => setSelectedPaymentOption('insurance')}
        >
          Insurance
        </PaymentOptionButton>

        <PaymentOptionButton
          isSelected={selectedPaymentOption === 'selfPay'}
          onClick={() => setSelectedPaymentOption('selfPay')}
        >
          Self Pay
        </PaymentOptionButton>

        <PaymentOptionButton
          isSelected={selectedPaymentOption === 'skip'}
          onClick={() => onClose()}
        >
          Skip for Now
        </PaymentOptionButton>
      </Flex>

      {selectedPaymentOption === 'insurance' && (
        <>
          <Box className="my-6">
            <DropdownHeader
              title="Add Insurance"
              isOpen={isPrimaryInsuranceOpen}
              onClick={() => setIsPrimaryInsuranceOpen((prev) => !prev)}
            />

            {isPrimaryInsuranceOpen ? (
              <Form form={insuranceForm} onSubmit={onSubmit}>
                <Box className="p-4 bg-gray-50 border border-t-0 border-pp-gray-2 rounded-b-6">
                  <Text as="p" className="mb-2 font-medium text-[#1C2024]">
                    Upload Image of Insurance Card
                  </Text>

                  <ImageUploaderSection
                    cardFrontImage={cardFrontImage}
                    setCardFrontImage={setCardFrontImage}
                    cardBackImage={cardBackImage}
                    setCardBackImage={setCardBackImage}
                  />

                  <Box className="mt-6">
                    <DropdownHeader
                      title="Add Insurance Details"
                      isOpen={isPrimaryInsuranceDetailsOpen}
                      onClick={() =>
                        setIsPrimaryInsuranceDetailsOpen((prev) => !prev)
                      }
                    />

                    {isPrimaryInsuranceDetailsOpen ? (
                      <Box className="p-4 bg-gray-50 border border-t-0 border-pp-gray-2 rounded-b-6">
                        <InsuranceDetailsSection
                          insurancePayers={insurancePayers}
                          insurancePlans={insurancePlans}
                          changePayerHandler={changePayerHandler}
                          handleDateChange={handleDateChange}
                        />
                      </Box>
                    ) : null}
                  </Box>

                  <FormSubmitButton
                    disabled={isLoading}
                    className="bg-pp-blue-3 mt-8 w-full cursor-pointer rounded-[1000px]"
                  >
                    Save
                  </FormSubmitButton>
                </Box>
              </Form>
            ) : null}
          </Box>

          <Box className="mb-6">
            <DropdownHeader
              title="Add Payment Card"
              isOpen={isPaymentCardOpen}
              onClick={() => setIsPaymentCardOpen(!isPaymentCardOpen)}
            />

            {isPaymentCardOpen && (
              <Box className="p-4 bg-gray-50 border border-t-0 border-pp-gray-2 rounded-b-6">
                <PaymentDetailsSection selectedPaymentOption={selectedPaymentOption} onClose={onClose} />
              </Box>
            )}
          </Box>
        </>
      )}

      {selectedPaymentOption === 'selfPay' && (
        <Box className="my-6">
          <DropdownHeader
            title="Add Payment Card"
            isOpen={isSelfPayCardOpen}
            onClick={() => setIsSelfPayCardOpen(!isSelfPayCardOpen)}
          />

          {isSelfPayCardOpen && (
            <Box className="p-4 bg-gray-50 border border-t-0 border-pp-gray-2 rounded-b-6">
              <PaymentDetailsSection selectedPaymentOption={selectedPaymentOption} onClose={onClose} />
            </Box>
          )}
        </Box>
      )}

      <Text
        as="p"
        className={cn('text-[20px] font-medium text-[#151B4A]', {
          'mt-7': !selectedPaymentOption,
        })}
      >
        Notes for your visit
      </Text>

      <Box className="mb-7">
        {VISIT_NOTES.map((note, index) => (
          <Flex
            key={`visit-note-${index}-${note.substring(0, 20)}`}
            align="start"
            gap="3"
          >
            <Text className="mt-1 font-medium text-gray-700">{index + 1}.</Text>

            <Text className="text-sm leading-relaxed text-gray-700">
              {note.includes('psychplus.com') ? (
                <>
                  {note.split('psychplus.com')[0]}
                  <Text
                    onClick={() => window.open(PSYCHPLUS_LIVE_URL, '_blank')}
                    className="underline cursor-pointer text-pp-blue-3"
                  >
                    psychplus.com
                  </Text>
                  {note.split('psychplus.com')[1]}
                </>
              ) : (
                note
              )}
            </Text>
          </Flex>
        ))}
      </Box>

      <Flex align="center" justify="center" gap="2">
        <HipaaComplianceIcon />

        <Text size="3" className="font-medium text-[#1C2024]">
          {SECURE_HIPAA_TEXT}
        </Text>
      </Flex>
    </>
  )
}

export { InsurancePaymentForm }
