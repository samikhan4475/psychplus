import {
  CodesetFormSelect,
  FeatureCard,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'
import { CODESETS } from '@psychplus-v2/constants'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { useMemo } from 'react'
import { useFormContext } from 'react-hook-form'
import PreCheckinAssessmentImageUploader from '../../../shared-blocks/pre-checkin-assessment-image-uploader'

const PatientInfoCard = () => {
  const form = useFormContext()

  const hasGuardian = useMemo(() => form.watch('hasGuardian'), [form])

  return (
    <FeatureCard
      title="Patient Info"
      contentClassName="gap-3 relative"
      showTitleInsideCard
    >
      <Flex className="w-full " direction={{ initial: 'column', sm: 'row' }} gap="2">
        <Flex direction="column" className="w-full md:w-32">
          <Flex direction="column" className="w-full md:w-24">
            <PreCheckinAssessmentImageUploader />
          </Flex>
        </Flex>
        <Flex direction="column" className="flex-1" gap="4">
          <Flex className="w-full" gap="3" direction={{ initial: 'column', sm: 'row' }}>
            <FormFieldContainer className="w-full md:w-1/4">
              <FormFieldLabel required>First Name</FormFieldLabel>
              <TextFieldInput
                size={{ initial: '2', sm: '3' }}
                className="text-[13px] sm:text-[14px]"
                {...form.register('firstName')}
                placeholder={getPlaceholder('firstName')}
              />
              <FormFieldError name="firstName" />
            </FormFieldContainer>

            <FormFieldContainer className="w-full md:w-1/4">
              <FormFieldLabel>Middle Name</FormFieldLabel>
              <TextFieldInput
                size={{ initial: '2', sm: '3' }}
                className="text-[13px] sm:text-[14px]"
                {...form.register('middleName')}
                placeholder={getPlaceholder('middleName')}
              />
              <FormFieldError name="middleName" />
            </FormFieldContainer>

            <FormFieldContainer className="w-full md:w-1/4">
              <FormFieldLabel required>Last Name</FormFieldLabel>
              <TextFieldInput
                size={{ initial: '2', sm: '3' }}
                className="text-[13px] sm:text-[14px]"
                {...form.register('lastName')}
                placeholder={getPlaceholder('lastName')}
              />
              <FormFieldError name="lastName" />
            </FormFieldContainer>
            <FormFieldContainer className="w-full md:w-1/4">
              <FormFieldLabel required>Date of Birth</FormFieldLabel>
              <TextFieldInput
                {...form.register('birthdate')}
                size={{ initial: '2', sm: '3' }}
                className="text-[13px] sm:text-[14px] ml-[-13px]"
                type="date"
                max="9999-12-31"
                data-testid="birth-date"
              />

              <FormFieldError name="birthdate" />
            </FormFieldContainer>
          </Flex>

          <Flex className="w-full" gap="3"  direction={{ initial: 'column', sm: 'row' }}>
            <FormFieldContainer className="w-full md:w-1/4">
              <FormFieldLabel required>Phone Number</FormFieldLabel>
              <PhoneNumberInput
                {...form.register('phoneNumber')}
                name="phoneNumber"
                size={{ initial: '2', sm: '3' }}
                // className="text-[13px] sm:text-[14px]"
                placeholder={getPlaceholder('phoneNumber')}
              />
              <FormFieldError name="phoneNumber" />
            </FormFieldContainer>

            <FormFieldContainer className="w-full md:w-1/4">
              <FormFieldLabel required>Email Address</FormFieldLabel>
              <TextFieldInput
                {...form.register('email')}
                size={{ initial: '2', sm: '3' }}
                className="text-[13px] sm:text-[14px]"
                placeholder={getPlaceholder('emailAddress')}
                disabled
              />
              <FormFieldError name="email" />
            </FormFieldContainer>
            <Flex className="w-full md:w-2/4" gap="3" justify="between" direction={{ initial: 'column', sm: 'row' }}>
              <FormFieldContainer className="w-full md:w-2/5">
                <FormFieldLabel required>Gender</FormFieldLabel>
                <CodesetFormSelect
                  size={{ initial: '2', sm: '3' }}
                  className="text-[13px] sm:text-[14px]"
                  name="gender"
                  placeholder="Select"
                  codeset={CODESETS.Gender}
                />
                <FormFieldError name="gender" />
              </FormFieldContainer>
              <FormFieldContainer className="w-full md:w-1/2">
                <Flex
                  direction="column"
                  className="min-h-[60px] w-full md:min-w-[280px] flex-1  rounded-4 bg-[#f0f4ff] py-3 pl-2"
                >
                  <Flex direction={{ initial: 'column', sm: 'row' }} align={{ initial: 'start', sm: 'center' }}>
                    <FormFieldLabel className="text-[12px]" required>
                      Guardian
                    </FormFieldLabel>
                    <FormFieldLabel className="whitespace-nowrap text-[12px]">
                      (Do you have a Parent/Guardian?)
                    </FormFieldLabel>
                  </Flex>
                  <RadioGroup.Root
                    name="hasPrimary"
                    value={String(hasGuardian)}
                    onValueChange={(value) =>
                      form.setValue('hasGuardian', value === 'true')
                    }
                  >
                    <Flex gap="1" className="pt-1">
                      {['true', 'false'].map((option) => (
                        <>
                          <RadioGroup.Item
                            key={option}
                            className="size-[18px] rounded-full bg-white cursor-default border border-gray-6"
                            value={option}
                            id={option}
                          >
                            <RadioGroup.Indicator className="rounded-full border-1 relative flex h-full w-full items-center justify-center border-gray-4 bg-accent-11">
                              <div className="rounded-full bg-white h-1.5 w-1.5" />
                            </RadioGroup.Indicator>
                          </RadioGroup.Item>
                          <Text
                            className="leading-none text-[12px] font-medium"
                            id={option}
                          >
                            {option === 'true' ? 'Yes' : 'No'}
                          </Text>
                        </>
                      ))}
                    </Flex>
                  </RadioGroup.Root>
                </Flex>
                <FormFieldError name="hasGuardian" />
              </FormFieldContainer>
            </Flex>
          </Flex>
          {hasGuardian && (
            <Flex className="w-full md:w-1/2" gap="3" direction={{ initial: 'column', sm: 'row' }}>
              <FormFieldContainer className="w-full">
                <FormFieldLabel required={hasGuardian}>
                  Guardian First Name
                </FormFieldLabel>
                <TextFieldInput
                  size={{ initial: '2', sm: '3' }}
                  className="text-[13px] sm:text-[14px]"
                  {...form.register('guardianFirstName')}
                  placeholder={getPlaceholder('guardianFirstName')}
                />
                <FormFieldError name="guardianFirstName" />
              </FormFieldContainer>

              <FormFieldContainer className="w-full">
                <FormFieldLabel required={hasGuardian}>
                  Guardian Last Name
                </FormFieldLabel>
                <TextFieldInput
                  size={{ initial: '2', sm: '3' }}
                  className="text-[13px] sm:text-[14px]"
                  {...form.register('guardianLastName')}
                  placeholder={getPlaceholder('guardianLastName')}
                />
                <FormFieldError name="guardianLastName" />
              </FormFieldContainer>
            </Flex>
          )}
        </Flex>
      </Flex>
    </FeatureCard>
  )
}

export default PatientInfoCard
