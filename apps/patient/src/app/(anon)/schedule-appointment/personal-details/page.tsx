'use client'

import NextLink from 'next/link'
import { Avatar, Flex, Text } from '@radix-ui/themes'
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
import { RadioGroup } from '@psychplus/ui/radio-group'
import {
  darkGrayColor,
  Lagoon,
  psychPlusBlueColor,
  whiteColor,
} from '@/components'
import { DUMMY_APPOINTMENT_DETAIL } from '../types'

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
    ({ isParentOrGuardian, guardianFirstName, guardianLastName }, ctx) => {
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
const PersonalDetails = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    location.assign('/insurance-payment')
  }
  return (
    <Flex justify="center" mt="8" pb="8">
      <Flex direction="column" gap="6">
        <Flex gap="2">
          <Avatar
            src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
            color="gray"
            fallback="A"
            size="7"
            radius="full"
          />

          <Flex
            direction="column"
            style={{ color: psychPlusBlueColor }}
            gap="1"
          >
            <Text className="font-bold" size="5">
              {DUMMY_APPOINTMENT_DETAIL.drname}
            </Text>
            <Text size="4">{DUMMY_APPOINTMENT_DETAIL.appointmentDate}</Text>
            <Flex style={{ color: Lagoon }} gap="4">
              <Text size="3">{DUMMY_APPOINTMENT_DETAIL.staffRoleCode}</Text>
              <Text size="3">{DUMMY_APPOINTMENT_DETAIL.appointmentType}</Text>
            </Flex>

            <Flex gap="2">
              <Text style={{ color: darkGrayColor }} size="2">
                {DUMMY_APPOINTMENT_DETAIL.address.street1}{' '}
                {DUMMY_APPOINTMENT_DETAIL.address.postalCode}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex direction="column" gap="2">
          <Text
            style={{ color: psychPlusBlueColor }}
            size="8"
            className="font-bold"
          >
            Tell us a bit about yourself.
          </Text>
          <Text style={{ color: darkGrayColor }} size="4">
            To book your appointment, we need to verify just a few things.
          </Text>
        </Flex>
        <Form form={form} onSubmit={onSubmit}>
          <Flex
            gap="6"
            style={{ color: psychPlusBlueColor }}
            direction="column"
          >
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

              <Flex gap="4">
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

              <Flex gap="4">
                <Flex direction="column" gap="1" className="w-full">
                  <Text>Date of birth</Text>
                  <FormTextInput
                    type="date"
                    label=""
                    data-testid="date-of-birth-input"
                    {...form.register('dateOfBirth')}
                    style={{ marginLeft: -12 }}
                    className="h-14 w-full"
                  />
                </Flex>
                <Flex direction="column" gap="1" className="h-14 w-full">
                  <Text>Phone number</Text>
                  <FormTextInput
                    type="number"
                    label=""
                    data-testid="phone-number-input"
                    {...form.register('phoneNumber')}
                    className="h-14 w-full"
                  />
                </Flex>
              </Flex>
            </Flex>

            <Flex>
              <Text size="4">Do you have a parent/guardian?</Text>

              <Flex justify="end" className="flex-auto">
                <RadioGroup.Root
                  defaultValue="No"
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
              <Flex gap="4">
                <Flex direction="column" gap="1" className="w-full">
                  <Text>First name</Text>
                  <FormTextInput
                    type="text"
                    label=""
                    data-testid="guardian-first-name-input"
                    {...form.register('guardianFirstName')}
                    style={{ marginLeft: -12 }}
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
                <Checkbox
                  id="agreeToTerms-checkbox"
                  data-testid="agreeToTerms-checkbox"
                  onCheckedChange={(checked) => {
                    form.setValue('agreeToTerms', checked as boolean)
                  }}
                />
                <Text
                  as="label"
                  size="3"
                  ml="2"
                  htmlFor="agreeToTerms-checkbox"
                >
                  Agree to our terms and conditions
                </Text>
              </Flex>

              <FormFieldError
                message={form.formState.errors.agreeToTerms?.message}
              />
            </Flex>

            <Flex align="center" gap="6">
              <FormSubmitButton
                data-testid="signup-submit-button"
                style={{ background: psychPlusBlueColor, color: whiteColor }}
                radius="full"
                className="h-16 w-40"
              >
                <Text size="5" className="font-bold">
                  Next
                </Text>
              </FormSubmitButton>

              <NextLink href="/login">
                <Text size="4" className="text-[##333333]">
                  Already have an account?{' '}
                  <Text className="text-[#111111] underline">Log in</Text>
                </Text>
              </NextLink>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  )
}

export default PersonalDetails
