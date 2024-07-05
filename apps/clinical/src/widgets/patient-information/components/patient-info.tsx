import React, { useMemo, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box, Flex, Switch, Text } from '@radix-ui/themes'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { FormTableSelect } from '@psychplus/form'
import { Button } from '@psychplus/ui/button'
import { FormContainer, FormSubmitButton } from '@psychplus/ui/form'
import { HistoryIcon, SaveIcon } from '@/components/icons'
import {
  updateDriversLicenseImage,
  updateProfile,
  updateProfileImage,
} from '../api.client'
import { EditModeContext } from '../context'
import { useVerificationStatusOptions } from '../hooks'
import { schema, type SchemaType } from '../schema'
import { useStore } from '../store'
import AdditionalInfo from './additional-info'
import CreateUser from './create-user'
import PatientAddress from './patient-address'
import Patientdata from './patient-data'

const initialPhone = {
  type: 'Home',
  number: '',
  extention: '',
  comment: '',
}

const initialAddress = {
  type: 'Home',
  street1: '',
  street2: '',
  city: '',
  state: '',
  country: '',
  postalCode: '',
}

const PatientInfo = ({ children }: React.PropsWithChildren) => {
  const data = useStore((state) => state.patientProfile)
  const statusOptions = useVerificationStatusOptions()
  const [profileImage, setProfileImage] = useState<File | undefined>(undefined)
  const [driverLicenseImage, setDriverLicenseImage] = useState<
    File | undefined
  >(undefined)
  const [isPageLocked, setIsPageLocked] = useState<boolean>(false)

  const form = useForm<SchemaType>({
    resolver: zodResolver(schema),
    criteriaMode: 'all',
    defaultValues: {
      id: data?.id,
      legalName: {
        firstName: data?.legalName?.firstName ?? '',
        lastName: data?.legalName?.lastName ?? '',
        middleName: data?.legalName?.middleName ?? '',
        preferredName: data?.legalName?.preferredName ?? '',
        title: data?.legalName?.title ?? '',
        suffix: data?.legalName?.suffix ?? '',
        honors: data?.legalName?.honors ?? '',
      },
      birthdate: data?.birthdate ?? '',
      hasGuardian: data.hasGuardian,
      gender: data?.gender ?? '',
      genderOrientation: data?.genderOrientation ?? '',
      genderExpression: data?.genderExpression ?? '',
      genderPronoun: data?.genderPronoun ?? '',
      driversLicense: {
        type: data?.driversLicense?.type ?? 'DriversLicense',
        number: data?.driversLicense?.number ?? '',
        validIn: data?.driversLicense?.validIn ?? '',
        hasFrontImage: data?.driversLicense?.hasFrontImage ?? false,
        hasBackImage: data?.driversLicense?.hasBackImage ?? false,
      },
      contactDetails: {
        email: data?.contactDetails?.email,
        homeNumber: data?.contactDetails.phoneNumbers?.find(
          (number) => number.type === 'Home',
        ) ?? { ...initialPhone, type: 'Home' },
        workNumber: data?.contactDetails.phoneNumbers?.find(
          (number) => number.type === 'Business',
        ) ?? { ...initialPhone, type: 'Business' },
        mobileNumber: data?.contactDetails.phoneNumbers?.find(
          (number) => number.type === 'Contact',
        ) ?? { ...initialPhone, type: 'Contact' },
        homeAddress: data?.contactDetails.addresses?.find(
          (address) => address.type === 'Home',
        ) ?? { ...initialAddress, type: 'Home' },
        mailingAddress: data?.contactDetails.addresses?.find(
          (address) => address.type === 'Mailing',
        ) ?? { ...initialAddress, type: 'Mailing' },
        isMailingAddressSameAsPrimary:
          data?.contactDetails?.isMailingAddressSameAsPrimary ?? true,
      },
      cmdId: data?.cmdId,
      motherMaidenName: data?.motherMaidenName,
      alternateOrPreviousName: {
        firstName: data?.alternateOrPreviousName?.firstName ?? '',
        lastName: data?.alternateOrPreviousName?.lastName ?? '',
        middleName: data?.alternateOrPreviousName?.middleName ?? '',
        preferredName: data?.alternateOrPreviousName?.preferredName ?? '',
        title: data?.alternateOrPreviousName?.title ?? '',
        suffix: data?.alternateOrPreviousName?.suffix ?? '',
        honors: data?.alternateOrPreviousName?.honors ?? '',
      },
      alternateOrPreviousContactDetails: data.alternateOrPreviousContactDetails
        ? {
            homeAddress:
              data?.alternateOrPreviousContactDetails?.addresses?.find(
                (addr) => addr.type === 'Home',
              ) ?? { ...initialAddress, type: 'Home' },
          }
        : null,
      language: data?.language,
      languageAbility: data?.languageAbility,
      languageProficiency: data?.languageProficiency,
      religion: data?.religion,
      races: data?.races,
      ethnicities: data?.ethnicities,
      preferredLanguage: data?.preferredLanguage,
      chargeUserId: data?.chargeUserId,
      isTest: data?.isTest,
      isPlusMember: data?.isPlusMember,
      hasPhoto: data?.hasPhoto,
      chargeKey: data?.chargeKey,
      medicalRecordNumber: data?.medicalRecordNumber,
      socialSecurityNumber: data?.socialSecurityNumber,
      guardian: {
        name: {
          firstName: data?.guardian?.name?.firstName ?? '',
          lastName: data?.guardian?.name?.lastName ?? '',
        },
      },
      verificationStatus: data?.verificationStatus,
      status: data?.status ?? '',
    },
  })

  const ctxValue = useMemo(
    () => ({
      editable: !isPageLocked,
    }),
    [isPageLocked],
  )

  const { register } = useForm()

  const onSubmit: SubmitHandler<SchemaType> = (data?) => {
    if (data) {
      const contactPhoneNumbers = [
        data?.contactDetails.homeNumber,
        data?.contactDetails.workNumber,
        data?.contactDetails.mobileNumber,
      ].filter((contact) => contact.number)
      const contactAddresses = [
        data?.contactDetails.homeAddress,
        data?.contactDetails.mailingAddress,
      ]
      const alternateAddresses = data.alternateOrPreviousContactDetails
        ? [data?.alternateOrPreviousContactDetails?.homeAddress]
        : null

      const body = {
        ...data,
        contactDetails: {
          email: data?.contactDetails.email,
          phoneNumbers: contactPhoneNumbers ?? [],
          addresses: contactAddresses ?? [],
          isMailingAddressSameAsPrimary:
            data?.contactDetails?.isMailingAddressSameAsPrimary,
        },
        alternateOrPreviousContactDetails: alternateAddresses
          ? {
              addresses: alternateAddresses,
            }
          : null,
        isTest: true,
      }
      if (!data.hasGuardian) {
        delete body.guardian
      }
      if (driverLicenseImage && data.driversLicense)
        data.driversLicense.hasFrontImage = true
      if (profileImage) data.hasPhoto = true
      if (
        !data?.alternateOrPreviousName?.firstName &&
        !data?.alternateOrPreviousName?.lastName
      ) {
        body.alternateOrPreviousName = null
      }
      if (!data.alternateOrPreviousContactDetails?.homeAddress?.postalCode) {
        body.alternateOrPreviousContactDetails = null
      }
      updateProfile({ patientId: data.id, body })
        .then((data) => {
          if (driverLicenseImage) {
            updateDriversLicenseImage({
              patientId: data.id,
              file: driverLicenseImage,
            })
          }
          if (profileImage) {
            updateProfileImage({ patientId: data.id, file: profileImage })
          }
          alert('Profile updated successfully!')
        })
        .catch((error) => alert(error.message))
    }
  }

  return (
    <Box className="h-[100%] bg-[#EEF2F6]">
      <EditModeContext.Provider value={ctxValue}>
        <FormContainer
          className="gap-0"
          form={form}
          onSubmit={onSubmit}
        >
          <Flex
            gap="3"
            className="relative bg-[#FFFF] px-2 py-1 drop-shadow-md"
            align="center"
          >
            <Flex className="w-[1px] grow gap-x-[17px]" align="center">
              <Text className="text-[16px] font-bold text-[#151B4A]">
                Patient Info
              </Text>
              <Flex className="gap-x-2 text-[14px]" align="center">
                <Text>Lock page for user</Text>
                <Flex gap="1" align="center">
                  <Switch
                    checked={isPageLocked}
                    color="grass"
                    onCheckedChange={setIsPageLocked}
                  />
                  {isPageLocked ? 'Yes' : 'No'}
                </Flex>
              </Flex>
            </Flex>
            <Flex align="center" className="gap-x-2 text-[14px] text-[#1C2024]">
              Verification Status
              <FormTableSelect
                disabled={isPageLocked}
                buttonClassName="h-6 text-[12px] text-[#000000CC]"
                {...register('verificationStatus')}
                options={statusOptions}
              />
            </Flex>
            <Button
              variant="outline"
              type='button'
              className="h-6 cursor-pointer bg-[#FFF] px-2 text-[12px] text-[#000000CC] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
            >
              <HistoryIcon width={11.2} height={11.2} />
              Patient Info Hx
            </Button>
            {/* TODO: Reset password will be implemented once user roles are defined and API is created. */}
            {/* <Button
                variant="outline"
                className="h-6 cursor-pointer bg-[#FFF] px-2 text-[12px] text-[#000000CC] [box-shadow:inset_0_0_0_0.4px_#9E9898CC]"
              >
                <RepeatIcon width={16} height={16} />
                Reset Password
              </Button> */}
            <FormSubmitButton
              form={form}
              className="h-6 cursor-pointer bg-[#151B4A] px-2 text-[12px] text-[#FFF] [box-shadow:inset_0_0_0_0.4px_#151B4A]"
            >
              <SaveIcon />
              Save
            </FormSubmitButton>
          </Flex>
          <CreateUser />
          <Patientdata
            setProfileImage={setProfileImage}
            setDriverLicenseImage={setDriverLicenseImage}
          />
          <PatientAddress />
          {children}
          <AdditionalInfo />
        </FormContainer>
      </EditModeContext.Provider>
    </Box>
  )
}

export { PatientInfo, type SchemaType }
