'use client'

import { Box, Flex, Link, Text } from '@radix-ui/themes'
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
import { AppLink } from '@psychplus/ui/app-link'
import { Checkbox } from '@psychplus/ui/checkbox'
import { RadioGroup } from '@psychplus/ui/radio-group'

const schema = z
  .object({
    firstName: validate.requiredString,
    lastName: validate.requiredString,
    dateOfBirth: validate.requiredString,
    phoneNumber: validate.phoneNumber,
    email: validate.email,
    password: validate.password,
    confirmPassword: validate.password,
    isParentOrGuardian: z.boolean().default(false),
    guardianFirstName: z.string().optional(),
    guardianLastName: z.string().optional(),
    agreeToTerms: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: 'Please agree to electronically sign Policies and Procedures!',
      }),
  })
  .superRefine(
    (
      {
        password,
        confirmPassword,
        isParentOrGuardian,
        guardianFirstName,
        guardianLastName,
      },
      ctx,
    ) => {
      if (password !== confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Passwords do not match',
          path: ['confirmPassword'],
        })
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

const SignupForm = () => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
  })

  const onSubmit: SubmitHandler<SchemaType> = async (data) => {
    alert('Successfully created account!')
    // location.assign('/')
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex direction="column" gap="4" mb="4">
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
          label="Date of Birth"
          data-testid="signup-date-of-birth-input"
          {...form.register('dateOfBirth')}
          style={{ marginLeft: -12 }}
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
            defaultValue="No"
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
          <Flex align="center" justify="center" mt="3">
            <Text as="label" size="2" htmlFor="signup-agreeToTerms-checkbox">
              <Flex gap="2" align="start">
                <Checkbox
                  id="signup-agreeToTerms-checkbox"
                  data-testid="signup-agreeToTerms-checkbox"
                  onCheckedChange={(checked) => {
                    form.setValue('agreeToTerms', checked as boolean)
                  }}
                />
                <Text>
                  I agree to electronically sign the{' '}
                  <Link size="2" asChild data-testid="signup-terms-link">
                    <AppLink href="#">Terms of Service </AppLink>
                  </Link>
                  and{' '}
                  <Link size="2" asChild data-testid="signup-privacy-link">
                    <AppLink href="#">Privacy Policy</AppLink>
                  </Link>
                </Text>
              </Flex>
            </Text>
          </Flex>
          <FormFieldError
            message={form.formState.errors.agreeToTerms?.message}
          />
        </Box>
        <FormSubmitButton data-testid="signup-submit-button">
          Create Account
        </FormSubmitButton>
      </Flex>
    </Form>
  )
}

export { SignupForm }
