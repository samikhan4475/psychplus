'use client'

import { Flex, Text } from '@radix-ui/themes'
import { type SubmitHandler } from 'react-hook-form'
import { z } from 'zod'
import {
  Form,
  FormFieldError,
  FormTextInput,
  useForm,
  validate,
} from '@psychplus/form'
import { Button } from '@psychplus/ui/button'
import { Checkbox } from '@psychplus/ui/checkbox'
import { RadioGroup } from '@psychplus/ui/radio-group'

const creditCardSchema = z.object({
  accountTitle: validate.requiredString,
  cardNumber: validate.requiredString, // You need to define a creditCardNumber validation function
  expirationMonth: validate.requiredString,
  expirationYear: validate.requiredString,
  cvv: validate.requiredString,
  streetAddress: validate.requiredString,
  address2: z.string().optional(),
  city: validate.requiredString,
  state: validate.requiredString,
  zipCode: validate.requiredString,
  insurance: z.boolean().default(false),
  agreeToTerms: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'Please agree to the Terms and Conditions!',
    }),
})

type CreditCardSchemaType = z.infer<typeof creditCardSchema>

const BookAppointmentForm = () => {
  const form = useForm({
    schema: creditCardSchema,
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<CreditCardSchemaType> = async (data) => {
    alert('Slot booked successfully!')
    // location.assign('/')
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="2" align="center">
        <Text as="div" size="4" weight="bold">
          Use Insurance
        </Text>

        <RadioGroup.Root
          defaultValue="No"
          data-testid="signup-is-parent-or-guardian-input"
          onValueChange={(value) => {
            form.setValue('insurance', value === 'Yes')
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

      <Text className="font-bold" size="5" align="center" mt="4" mb="3">
        Credit Card Information
      </Text>

      <Flex direction="row" gap="4">
        <Flex direction="column" gap="5">
          <FormTextInput
            type="text"
            label="Account Title"
            placeholder="Account Title"
            data-testid="credit-card-account-title-input"
            {...form.register('accountTitle')}
          />
          <FormTextInput
            type="text"
            label="Card Number"
            placeholder="Card Number"
            data-testid="credit-card-number-input"
            {...form.register('cardNumber')}
          />
          <Flex direction="row" gap="4">
            <FormTextInput
              type="text"
              label="Month"
              placeholder="MM"
              data-testid="credit-card-expiration-month-input"
              {...form.register('expirationMonth')}
            />
            <FormTextInput
              type="text"
              label="Year"
              placeholder="YYYY"
              data-testid="credit-card-expiration-year-input"
              {...form.register('expirationYear')}
            />
            <FormTextInput
              type="text"
              label="CVV"
              placeholder="CVV"
              data-testid="credit-card-cvv-input"
              {...form.register('cvv')}
            />
          </Flex>
        </Flex>

        <Flex direction="column" gap="5">
          <FormTextInput
            type="text"
            label="Street Address"
            placeholder="Street Address"
            data-testid="credit-card-street-address-input"
            {...form.register('streetAddress')}
          />
          <FormTextInput
            type="text"
            label="Address 2"
            placeholder="Address 2"
            data-testid="credit-card-address-2-input"
            {...form.register('address2')}
          />
          <Flex direction="row" gap="4">
            <FormTextInput
              type="text"
              label="City"
              placeholder="City"
              data-testid="credit-card-city-input"
              {...form.register('city')}
            />
            <FormTextInput
              type="text"
              label="State"
              placeholder="State"
              data-testid="credit-card-state-input"
              {...form.register('state')}
            />
            <FormTextInput
              type="text"
              label="Zip Code"
              placeholder="Zip Code"
              data-testid="credit-card-zip-code-input"
              {...form.register('zipCode')}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex mt="5" align="center">
        <Checkbox
          data-testid="agreeToTerms-checkbox"
          onCheckedChange={(checked) => {
            form.setValue('agreeToTerms', checked as boolean)
          }}
        />
        <Text as="label" size="2" ml="2" htmlFor="agreeToTerms-checkbox">
          I Agreed with terms & condition and agreed to keeping the card on file
        </Text>
      </Flex>
      <FormFieldError message={form.formState.errors.agreeToTerms?.message} />

      <Flex justify="center" mt="6">
        <Button
          data-testid="credit-card-submit-button"
          size="3"
          className="font-bold sm:w-2/3"
        >
          BOOK APPOINTMENT
        </Button>
      </Flex>
    </Form>
  )
}

export { BookAppointmentForm }
