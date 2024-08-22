'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { CODESETS } from '@psychplus-v2/constants'
import { PatientProfile, PhoneNumberEnum } from '@psychplus-v2/types'
import {
  getAgeFromDate,
  getPatientPhoneNumber,
  getPatientSsn,
} from '@psychplus-v2/utils'
import { Flex, RadioGroup, Text, TextFieldInput } from '@radix-ui/themes'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
  CodesetFormSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  PhoneNumberInput,
  RadioGroupToggle,
  SSNInput,
  ToggleableForm,
} from '@/components-v2'
import { updateProfileAction } from '@/features/account/profile/actions'
import { useProfileStore } from '@/features/account/profile/store'
import { getPlaceholder } from '@/features/account/profile/utils'
import { updateDriversLisenceImage } from './api'
import { schema } from './schema'
import { DriverLicenseInput } from './upload-driver-license'

type SchemaType = z.infer<typeof schema>

const PersonalInfoForm = ({
  isEdit,
  handleSave,
}: {
  isEdit: boolean
  handleSave: () => void
}) => {
  const router = useRouter()

  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const [driverLicenseImageSrc, setDriverLicenseImageSrc] = useState<
    File | undefined
  >(undefined)

  const [uploadError, setUploadError] = useState(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    reValidateMode: 'onChange',
    defaultValues: {
      ...profile.legalName,
      birthdate: profile.birthdate,
      phoneNumber: getPatientPhoneNumber(profile.contactDetails.phoneNumbers),
      email: profile.contactDetails.email,
      socialSecurityNumber: getPatientSsn(profile.socialSecurityNumber),
      medicalRecordNumber: profile.medicalRecordNumber,
      cmdId: profile.cmdId,
      status: profile.status,
      driversLicense: {
        type: profile.driversLicense?.type ?? 'DriversLicense',
        validIn: profile.driversLicense?.validIn ?? '',
        hasFrontImage: profile.driversLicense?.hasFrontImage ?? false,
        number: profile.driversLicense?.number ?? '',
      },
      hasGuardian: profile.hasGuardian,
      guardianFirstName: profile.guardian?.name?.firstName,
      guardianLastName: profile.guardian?.name?.lastName,
    },
  })

  const dobFormValue = form.watch('birthdate')
  const hasGuardian = form.watch('hasGuardian')

  useEffect(() => {
    if (!profile.hasGuardian)
      if (dobFormValue && getAgeFromDate(dobFormValue) < 18) {
        form.setValue('hasGuardian', true)
      } else {
        form.setValue('hasGuardian', false)
      }
  }, [form, dobFormValue])

  useEffect(() => {
    if (hasGuardian) {
      form.register('guardianFirstName')
      form.register('guardianLastName')
    } else {
      form.unregister('guardianFirstName')
      form.unregister('guardianLastName')
    }
    if (form.formState.isSubmitted)
      form.trigger(['guardianFirstName', 'guardianLastName', 'hasGuardian'])
  }, [form, hasGuardian])

  const submitAction = (data: SchemaType) => {
    const body: PatientProfile = {
      ...profile,
      legalName: {
        ...profile.legalName,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
      },
      birthdate: data.birthdate.toString(),
      socialSecurityNumber: data.socialSecurityNumber,
      contactDetails: {
        ...profile.contactDetails,
        email: data.email,
        phoneNumbers: [
          ...(profile.contactDetails.phoneNumbers ?? []),
          {
            type: PhoneNumberEnum.CONTACT,
            number: data.phoneNumber,
          },
        ],
      },
      driversLicense: {
        ...profile.driversLicense,
        ...data.driversLicense,
      },
      hasGuardian: data.hasGuardian,
      guardian: {
        ...profile.guardian,
        name: {
          firstName: data.guardianFirstName || '',
          lastName: data.guardianLastName || '',
        },
      },
    }

    if (driverLicenseImageSrc && data.driversLicense)
      data.driversLicense.hasFrontImage = true

    if (!data.hasGuardian) {
      delete body.guardian
    }

    return updateProfileAction(body)
  }

  const handleUpload = async () => {
    if (driverLicenseImageSrc) {
      setUploadError(false)

      const formData = new FormData()
      formData.append('file', driverLicenseImageSrc)

      const response = await updateDriversLisenceImage(formData)

      if (!response.ok) {
        setUploadError(true)
      }
    }
  }

  const onSuccess = (data: PatientProfile) => {
    handleUpload()
    setProfile(data)
    handleSave()
    router.refresh()
  }

  return (
    <ToggleableForm
      form={form}
      submitAction={submitAction}
      onSuccess={onSuccess}
      onFormClose={handleSave}
      isEdit={isEdit}
    >
      <Flex direction="column" gap="3" className="w-full" mb="4">
        <Flex className="w-full" gap="3">
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>First Name</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('firstName')}
              disabled={!isEdit}
              placeholder={getPlaceholder('firstName', isEdit)}
            />
            <FormFieldError name="firstName" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>Middle Name</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('middleName')}
              disabled={!isEdit}
              placeholder={getPlaceholder('middleName', isEdit)}
            />
            <FormFieldError name="middleName" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Last Name</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('lastName')}
              disabled={!isEdit}
              placeholder={getPlaceholder('lastName', isEdit)}
            />
            <FormFieldError name="lastName" />
          </FormFieldContainer>
        </Flex>

        <Flex className="w-full" gap="3">
          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Date of Birth</FormFieldLabel>
            <TextFieldInput
              size="3"
              type="date"
              max="9999-12-31"
              data-testid="birth-date"
              className="mr-4"
              {...form.register('birthdate')}
              disabled={!isEdit}
            />

            <FormFieldError name="birthdate" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Phone Number</FormFieldLabel>
            <PhoneNumberInput
              name="phoneNumber"
              editable={!isEdit}
              placeholder={getPlaceholder('phoneNumber', isEdit)}
            />
            <FormFieldError name="phoneNumber" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Email</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('email')}
              disabled
              placeholder={getPlaceholder('email', isEdit)}
            />
            <FormFieldError name="email" />
          </FormFieldContainer>
        </Flex>

        <Flex className="w-full" gap="3">
          <FormFieldContainer className="w-full">
            <FormFieldLabel>MRN</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('medicalRecordNumber')}
              disabled
            />
            <FormFieldError name="medicalRecordNumber" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>SSN</FormFieldLabel>
            <SSNInput
              name="socialSecurityNumber"
              editable={!isEdit}
              placeholder={getPlaceholder('ssn', isEdit)}
            />
            <FormFieldError name="socialSecurityNumber" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel>CMD</FormFieldLabel>
            <TextFieldInput size="3" {...form.register('cmdId')} disabled />
            <FormFieldError name="cmdId" />
          </FormFieldContainer>
        </Flex>

        <Flex className="w-full" gap="3">
          <FormFieldContainer className="w-full">
            <FormFieldLabel>Status</FormFieldLabel>
            <TextFieldInput size="3" {...form.register('status')} disabled />
            <FormFieldError name="status" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Driving License State</FormFieldLabel>
            <CodesetFormSelect
              name="driversLicense.validIn"
              disabled={!isEdit}
              placeholder={isEdit ? 'Select state' : ''}
              codeset={CODESETS.UsStates}
              size="3"
            />
            <FormFieldError name="driversLicense.validIn" />
          </FormFieldContainer>

          <FormFieldContainer className="w-full">
            <FormFieldLabel required>Driving License Number</FormFieldLabel>
            <TextFieldInput
              size="3"
              {...form.register('driversLicense.number')}
              disabled={!isEdit}
              placeholder={getPlaceholder('drivingLicenseNumber', isEdit)}
            />
            <FormFieldError name="driversLicense.number" />
          </FormFieldContainer>
        </Flex>

        <FormFieldContainer className="h-auto w-1/3">
          <FormFieldLabel>Driving License</FormFieldLabel>
          <Flex className="h-auto">
            <DriverLicenseInput
              className="h-9 w-20 bg-[#194595] text-[16px] text-[white]"
              savedImg={
                profile.driversLicense?.hasFrontImage
                  ? '/api/patients/self/driverslicenseimage/Front'
                  : undefined
              }
              disabled={!isEdit}
              onImageChanged={(image) => {
                setDriverLicenseImageSrc(image)
              }}
            />
          </Flex>

          {uploadError ? (
            <Text size="3" mt="4" className="text-tomato-11">
              There was a problem uploading your picture.
            </Text>
          ) : null}
        </FormFieldContainer>

        <FormFieldContainer>
          <Flex
            align="center"
            mt="3"
            gap="3"
            className="col-span-2 box-border border-y border-gray-6 py-4"
          >
            <FormFieldLabel className="text-[17px]">
              Do you have a Parent/Guardian?
            </FormFieldLabel>

            <RadioGroup.Root
              name="hasGuardian"
              value={String(form.watch('hasGuardian'))}
              onValueChange={(value) =>
                form.setValue('hasGuardian', value === 'true')
              }
              disabled={!isEdit}
            >
              <Flex gap="2">
                {['true', 'false'].map((option) => (
                  <RadioGroupToggle
                    value={form.watch('hasGuardian')}
                    option={option}
                    key={option}
                    disabled={!isEdit}
                  />
                ))}
              </Flex>
            </RadioGroup.Root>
          </Flex>
          <FormFieldError name="hasGuardian" />
        </FormFieldContainer>

        {form.watch('hasGuardian') && (
          <Flex className="w-full" gap="3">
            <FormFieldContainer className="w-full">
              <FormFieldLabel required={form.watch('hasGuardian')}>
                First Name
              </FormFieldLabel>
              <TextFieldInput
                size="3"
                {...form.register('guardianFirstName')}
                disabled={!isEdit}
                placeholder={getPlaceholder('firstName', isEdit)}
              />
              <FormFieldError name="guardianFirstName" />
            </FormFieldContainer>

            <FormFieldContainer className="w-full">
              <FormFieldLabel required={form.watch('hasGuardian')}>
                Last Name
              </FormFieldLabel>
              <TextFieldInput
                size="3"
                {...form.register('guardianLastName')}
                disabled={!isEdit}
                placeholder={getPlaceholder('lastName', isEdit)}
              />
              <FormFieldError name="guardianLastName" />
            </FormFieldContainer>
          </Flex>
        )}
      </Flex>
    </ToggleableForm>
  )
}

export { PersonalInfoForm }
