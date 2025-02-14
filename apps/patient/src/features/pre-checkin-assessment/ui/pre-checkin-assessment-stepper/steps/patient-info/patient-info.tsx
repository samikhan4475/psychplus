'use client'

import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { ActionErrorState } from '@psychplus-v2/api'
import { CODESETS } from '@psychplus-v2/constants'
import { PatientProfile } from '@psychplus-v2/types'
import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
  RadioGroupToggle,
  ToggleableForm,
} from '@/components-v2'
import { getPlaceholder } from '@/features/account/profile/utils'
import { addInsuranceAction } from '@/features/billing/payments/actions'
import { useStore } from '../../../../store'
import PreCheckinAssessmentImageUploader from '../../shared-blocks/pre-checkin-assessment-image-uploader'
import { patientSchema, patientSchemaType } from './patient-info-schema'
import { StateSelect } from './state-select'

const PatientInfo = () => {
  const router = useRouter()
  const { isSaveButtonPressed, save } = useStore()

  const form = useForm<patientSchemaType>({
    resolver: zodResolver(patientSchema),
    reValidateMode: 'onChange',
  })

  const onSuccess = (data: PatientProfile) => {
    save()
    router.refresh()
  }

  const submitAction = async (data: any) => {
    const payload: any = {
      id: 'insurance?.id',
      payerName: '',
      insurancePlanId: '',
      effectiveDate: '',
      terminationDate: '',
      memberId: '',
      groupNumber: '',
      isPatientPolicyHolder: '',
      insurancePolicyPriority: '',
      hasCardFrontImage: '',
      hasCardBackImage: '',
      isActive: true,
    }

    payload.policyHolderName = {
      firstName: '',
      lastName: '',
    }
    payload.policyHolderGender = ''
    payload.policyHolderDateOfBirth = ''
    payload.policyHolderRelationship = ''
    payload.policyHolderSocialSecurityNumber = ''

    const insuranceResponse = await addInsuranceAction(payload)

    if (insuranceResponse.state === 'error') {
      return {
        state: 'error',
        error: insuranceResponse.error,
      } as ActionErrorState
    }

    return {
      state: 'success',
    } as any
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onSuccess={onSuccess}
      isEdit={false}
      isExternalSavePressed={isSaveButtonPressed}
    >
      <Flex direction="column" gap="3" className="w-full" mb="4">
        <Flex
          className="bg-white rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
          gap="1"
          direction="column"
        >
          <Text className="mb-3 text-[24px] font-medium text-[#1C2024]">
            Patient Info
          </Text>
          <Flex className="w-full " direction="row" gap="2">
            <Flex direction="column" className="w-32">
              <Flex direction="column" className="w-24">
                <PreCheckinAssessmentImageUploader />
              </Flex>
            </Flex>
            <Flex direction="column" className="flex-1" gap="4">
              <Flex className="w-full" gap="3">
                <FormFieldContainer className="w-1/4">
                  <FormFieldLabel required>First Name</FormFieldLabel>
                  <TextFieldInput
                    size="3"
                    {...form.register('firstName')}
                    placeholder={getPlaceholder('firstName')}
                  />
                  <FormFieldError name="firstName" />
                </FormFieldContainer>

                <FormFieldContainer className="w-1/4">
                  <FormFieldLabel>Middle Name</FormFieldLabel>
                  <TextFieldInput
                    size="3"
                    {...form.register('middleName')}
                    placeholder={getPlaceholder('middleName')}
                  />
                  <FormFieldError name="middleName" />
                </FormFieldContainer>

                <FormFieldContainer className="w-1/4">
                  <FormFieldLabel required>Last Name</FormFieldLabel>
                  <TextFieldInput
                    size="3"
                    {...form.register('lastName')}
                    placeholder={getPlaceholder('lastName')}
                  />
                  <FormFieldError name="lastName" />
                </FormFieldContainer>
                <FormFieldContainer className="w-1/4">
                  <FormFieldLabel required>Date of Birth</FormFieldLabel>
                  <TextFieldInput
                    size="3"
                    type="date"
                    max="9999-12-31"
                    data-testid="birth-date"
                    className="mr-4"
                  />
                  <FormFieldError name="birthdate" />
                </FormFieldContainer>
              </Flex>

              <Flex className="w-full" gap="3">
                <FormFieldContainer className="w-1/4">
                  <FormFieldLabel required>Phone Number</FormFieldLabel>
                  <PhoneNumberInput
                    name="phoneNumber"
                    placeholder={getPlaceholder('phoneNumber')}
                  />
                  <FormFieldError name="phoneNumber" />
                </FormFieldContainer>

                <FormFieldContainer className="w-1/4">
                  <FormFieldLabel required>Email Address</FormFieldLabel>
                  <TextFieldInput
                    size="3"
                    placeholder={getPlaceholder('jonnydoe@xyz.com')}
                  />
                  <FormFieldError name="email" />
                </FormFieldContainer>
                <Flex className="w-2/4" gap="3" justify="between">
                  <FormFieldContainer className="w-2/5">
                    <FormFieldLabel required>Gender</FormFieldLabel>
                    <CodesetFormSelect
                      size="3"
                      name="gender"
                      placeholder="Select"
                      codeset={CODESETS.Gender}
                    />
                    <FormFieldError name="gender" />
                  </FormFieldContainer>
                  <FormFieldContainer>
                    <Flex
                      direction="column"
                      className="min-h-[60px] min-w-[280px] flex-1  rounded-4 bg-[#f0f4ff] py-3 pl-2"
                    >
                      <Flex direction="row" align="center">
                        <FormFieldLabel required>Guardian</FormFieldLabel>
                        <FormFieldLabel className="whitespace-nowrap">
                          (Do you have a Parent/Guardian?)
                        </FormFieldLabel>
                      </Flex>
                      <RadioGroup.Root
                        name="hasGuardian"
                        value=""
                        onValueChange={(value) =>
                          form.setValue('hasGuardian', value === 'true')
                        }
                      >
                        <Flex gap="2" className="pt-1">
                          {['true', 'false'].map((option) => (
                            <RadioGroupToggle
                              value={form.watch('hasGuardian')}
                              option={option}
                              key={option}
                            />
                          ))}
                        </Flex>
                      </RadioGroup.Root>
                    </Flex>
                    <FormFieldError name="hasGuardian" />
                  </FormFieldContainer>
                </Flex>
              </Flex>
              {form.watch('hasGuardian') && (
                <Flex className="w-1/2" gap="1">
                  <FormFieldContainer className="w-full">
                    <FormFieldLabel required={form.watch('hasGuardian')}>
                      Gardian First Name
                    </FormFieldLabel>
                    <TextFieldInput
                      size="3"
                      {...form.register('guardianFirstName')}
                      placeholder={getPlaceholder('Guardian First Name')}
                    />
                    <FormFieldError name="guardianFirstName" />
                  </FormFieldContainer>

                  <FormFieldContainer className="w-full">
                    <FormFieldLabel required={form.watch('hasGuardian')}>
                      Gardian Last Name
                    </FormFieldLabel>
                    <TextFieldInput
                      size="3"
                      {...form.register('guardianLastName')}
                      placeholder={getPlaceholder('Guardian Last Name')}
                    />
                    <FormFieldError name="guardianLastName" />
                  </FormFieldContainer>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>

        <Flex
          width="100%"
          align="start"
          gap="4"
          className="bg-white mt-4 rounded-[8px] border border-[#d9e2fc] px-5 pb-9 pt-7"
        >
          <Flex direction="column" className="mb-3 flex-1">
            <Text className="h-[44px] text-[24px] font-medium text-[#1C2024]">
              Primary Address
            </Text>

            <FormFieldContainer className="mb-4 w-full">
              <FormFieldLabel required>Address 1</FormFieldLabel>
              <TextFieldInput
                size="3"
                placeholder={getPlaceholder('address 1')}
              />
              <FormFieldError name="address 1" />
            </FormFieldContainer>

            <FormFieldContainer className="mb-4 w-full">
              <FormFieldLabel>Address 2</FormFieldLabel>
              <TextFieldInput
                size="3"
                placeholder={getPlaceholder('address 2')}
              />
              <FormFieldError name="address 2" />
            </FormFieldContainer>

            <Flex width="100%" gap="4">
              <FormFieldContainer className="flex-1">
                <FormFieldLabel required>City</FormFieldLabel>
                <TextFieldInput size="3" placeholder="Enter city" disabled />
              </FormFieldContainer>

              <StateSelect name="state 1" />

              <FormFieldContainer className="flex-1">
                <FormFieldLabel required>Zip Code</FormFieldLabel>
                <TextFieldInput
                  size="3"
                  placeholder="Enter ZIP code"
                  disabled
                />
              </FormFieldContainer>
            </Flex>
          </Flex>

          <Flex direction="column" className="flex-1">
            <Flex className="flex-1" gap="2" align="center">
              <Text className="text-[24px] font-medium text-[#1C2024]">
                Mailing Address
              </Text>

              <FormFieldContainer className="mr-auto flex-1">
                <Flex
                  className="h-[44px] rounded-1 bg-[#f0f4ff] px-[6px]"
                  align="center"
                >
                  <FormFieldLabel className="whitespace-nowrap text-[12px] font-medium">
                    Is your mailing address same as primary?
                  </FormFieldLabel>

                  <RadioGroup.Root
                    name="hasPrimary"
                    value={String(form.watch('hasGuardian'))}
                    onValueChange={(value) =>
                      form.setValue('hasGuardian', value === 'true')
                    }
                  >
                    <Flex gap="2" className="pt-1">
                      {['true', 'false'].map((option) => (
                        <RadioGroupToggle
                          value={form.watch('hasGuardian')}
                          option={option}
                          // noBorder
                          key={option}
                        />
                      ))}
                    </Flex>
                  </RadioGroup.Root>
                </Flex>
                <FormFieldError name="hasGuardian" />
              </FormFieldContainer>
            </Flex>

            <FormFieldContainer className="mb-4 w-full">
              <FormFieldLabel required>Address 1</FormFieldLabel>
              <TextFieldInput
                size="3"
                placeholder={getPlaceholder('address 1')}
              />
              <FormFieldError name="address 1" />
            </FormFieldContainer>

            <FormFieldContainer className="mb-4 w-full">
              <FormFieldLabel>Address 2</FormFieldLabel>
              <TextFieldInput
                size="3"
                placeholder={getPlaceholder('address 2')}
              />
              <FormFieldError name="address 2" />
            </FormFieldContainer>

            <Flex width="100%" gap="4">
              <FormFieldContainer className="flex-1">
                <FormFieldLabel required>City</FormFieldLabel>
                <TextFieldInput size="3" placeholder="Enter city" disabled />
              </FormFieldContainer>
              <StateSelect name="state 2" />

              <FormFieldContainer className="flex-1">
                <FormFieldLabel required>Zip Code</FormFieldLabel>
                <TextFieldInput
                  size="3"
                  placeholder="Enter ZIP code"
                  disabled
                />
              </FormFieldContainer>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ToggleableForm>
  )
}

export { PatientInfo }
