import Image from 'next/image'
import { Box, Flex, Text } from '@radix-ui/themes'
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormFieldError,
  FormSubmitButton,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Checkbox } from '@psychplus/ui/checkbox'
import { createPreferredPartnerCreditCard } from '../../api.client'
import { useStore } from '../../store'
import { useAddCreditCard } from './hooks'

const schema = z.object({
  nameOnCard: z.string().min(1).max(30),
  address1: validate.requiredString,
  address2: validate.nullOrString,
  city: validate.requiredString,
  state: validate.requiredString,
  zipCode: validate.requiredString.max(5),
  termsAndConditions: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'Please read and agree to the terms and conditions',
    }),
})

type SchemaType = z.infer<typeof schema>

const AddCreditCardForm = () => {
  const preferredPartnerId = useStore((state) => state.preferredPartnerId)
  const { setIsDialogOpen } = useAddCreditCard()
  const stripe = useStripe()
  const elements = useElements()

  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      nameOnCard: undefined,
      address1: undefined,
      address2: undefined,
      city: undefined,
      state: undefined,
      zipCode: undefined,
      termsAndConditions: false,
    },
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    if (!stripe || !elements) {
      alert("Stripe.js hasn't loaded yet.")
      return false
    }

    const cardNumberElement = elements.getElement(CardNumberElement)
    const cardExpiryElement = elements.getElement(CardExpiryElement)
    const cardCvcElement = elements.getElement(CardCvcElement)

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement) {
      alert('Error: Card information is required!')
      return false
    }

    let payload: any = await stripe.createPaymentMethod({
      type: 'card',
      card: cardNumberElement,
    })

    payload = payload.paymentMethod

    if (!payload) {
      alert(`Error: ${payload.error.message}`)
      return false
    }

    const apiPayload = {
      cardType: payload.card.brand,
      name: data.nameOnCard,
      numberLastFour: payload.card.last4,
      cvv: 123, // We don't need this because we are using stripe elements but still it's required by API
      isActive: true,
      isPrimary: true,
      expireMonth: payload.card.exp_month,
      expireYear: payload.card.exp_year,
      billingAddress: {
        street1: data.address1,
        street2: data.address2,
        city: data.city,
        state: data.state,
        postalCode: data.zipCode,
      },
      cardKey: payload.id,
      preferredPartnerId,
    }

    await createPreferredPartnerCreditCard(apiPayload)
    setIsDialogOpen(false)
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
        <Flex gap="4" className="rounded border border-[#F3F3F3] p-1">
          <Box className="flex-1">
            <Text as="p" className="mt-3 text-[14px] font-medium">
              <Text>We accept all major Credit & Debit Cards</Text>
            </Text>
          </Box>
          <Box className='top-0" right-0'>
            <Image
              src="/images/payment-methods.png"
              alt="Cards"
              width={250}
              height={10}
              style={{
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </Box>
        </Flex>

        <Flex direction={'column'} className="rounded border border-[#F3F3F3]">
          <Flex direction="column" gap="4" mb="4" className="bg-[#EEF2F6] p-1">
            <Text as="label" size="2" weight="bold" htmlFor="address1">
              Credit & Debit Cards Details
            </Text>
          </Flex>
          <Flex gap="4" className="p-1">
            <Box className="flex-1" width={'7'}>
              <Text as="label" size="2" weight="bold" htmlFor="address1">
                Card Number
              </Text>
              <CardNumberElement className="mr-3 h-[36px] w-full rounded-3 border border-gray-7 py-[8px] pl-3" />
            </Box>
            <Box className="flex-1">
              <FormTextInput
                type="text"
                label="Name on Card"
                placeholder="Name"
                data-testid="add-credit-card-name-input"
                {...form.register('nameOnCard')}
              />
            </Box>

            <Box className="flex-1">
              <Text as="label" size="2" weight="bold" htmlFor="address1">
                Expiry Date
              </Text>
              <CardExpiryElement className="mr-3 h-[36px] w-full rounded-3 border border-gray-7 py-[8px] pl-3" />
            </Box>

            <Box className="flex-1">
              <Text as="label" size="2" weight="bold" htmlFor="address1">
                CVC
              </Text>

              <CardCvcElement className="mr-3 h-[36px] w-full rounded-3 border border-gray-7 py-[8px] pl-3" />
            </Box>
          </Flex>
        </Flex>

        <Flex direction={'column'} className="rounded border border-[#F3F3F3]">
          <Flex direction="column" gap="4" mb="4" className="bg-[#EEF2F6] p-1">
            <Text as="label" size="2" weight="bold" htmlFor="address1">
              Billing Address
            </Text>
          </Flex>

          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <Flex direction="column">
                <Flex align="center" id="address1">
                  <Box className="flex-1">
                    <FormTextInput
                      type="text"
                      label="Address 1"
                      placeholder="address1"
                      data-testid="add-credit-card-name-input"
                      {...form.register('address1')}
                    />
                  </Box>
                </Flex>
                <FormFieldError
                  message={form.formState.errors.address1?.message}
                />
              </Flex>
            </Box>
            <Box className="flex-1">
              <Flex direction="column">
                <Flex align="center" id="address2">
                  <Box className="flex-1">
                    <FormTextInput
                      type="text"
                      label="Address 2"
                      placeholder="address2"
                      data-testid="add-credit-address2-input"
                      {...form.register('address2')}
                    />
                  </Box>
                </Flex>
              </Flex>
            </Box>
          </Flex>
          <Flex gap="4" className="p-1">
            <Box className="flex-1">
              <FormTextInput
                type="text"
                label="City"
                placeholder="City"
                data-testid="add-credit-card-city-input"
                {...form.register('city')}
              />
            </Box>
            <Box className="flex-1">
              <FormTextInput
                type="text"
                label="State"
                placeholder="State"
                data-testid="add-credit-card-state-input"
                {...form.register('state')}
              />
            </Box>
            <Box className="flex-1">
              <FormTextInput
                type="number"
                label="Zip Code"
                placeholder="XXXXX"
                data-testid="add-credit-card-zip-input"
                {...form.register('zipCode')}
              />
            </Box>
          </Flex>
        </Flex>
        <Flex gap="4">
          <Box className="flex-1">
            <Flex direction="column">
              <Flex align="center">
                <Checkbox
                  id="terms-conditions-checkbox"
                  data-testid="add-credit-card-terms-conditions-checkbox"
                  onCheckedChange={(checked) => {
                    form.setValue('termsAndConditions', checked as boolean)
                  }}
                />
                <Text
                  as="label"
                  size="3"
                  ml="2"
                  htmlFor="terms-conditions-checkbox"
                >
                  I have read the term & conditions and card holder has agreed
                  to place the card on file.
                </Text>
              </Flex>

              <FormFieldError
                message={form.formState.errors.termsAndConditions?.message}
              />
            </Flex>
          </Box>
        </Flex>
      </Flex>

      <Flex gap="3" justify="end">
        <FormSubmitButton
          size="2"
          data-testid="add-claim-status-submit-button"
          className="bg-[#101D46]"
        >
          Save
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { AddCreditCardForm }
