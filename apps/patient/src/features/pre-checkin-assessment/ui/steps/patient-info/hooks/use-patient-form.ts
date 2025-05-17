import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  PatientAddress,
  PatientProfile,
  PhoneNumberEnum,
} from '@psychplus-v2/types'
import {
  createAddress,
  getAgeFromDate,
  getPatientPhoneNumber,
  getPatientSsn,
} from '@psychplus-v2/utils'
import { useForm } from 'react-hook-form'
import { useProfileStore } from '@/features/account/profile/store'
import { patientSchema, patientSchemaType } from '../patient-info-schema'

export const usePatientForm = () => {
  const { profile, setProfile } = useProfileStore((state) => ({
    profile: state.profile,
    setProfile: state.setProfile,
  }))

  const getAddress = (type: 'Home' | 'Mailing') =>
    profile.contactDetails?.addresses?.find((addr) => addr.type === type)

  const homeAddress = getAddress('Home')
  const mailingAddress = getAddress('Mailing')

  const form = useForm<patientSchemaType>({
    resolver: zodResolver(patientSchema),
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
      hasGuardian: profile.hasGuardian,
      guardianFirstName: profile.guardian?.name?.firstName,
      guardianLastName: profile.guardian?.name?.lastName,
      gender: profile.gender,
      ...(homeAddress && {
        primaryStreet1: homeAddress.street1,
        primaryStreet2: homeAddress.street2,
        primaryCity: homeAddress.city,
        primaryState: homeAddress.state,
        primaryPostalCode: homeAddress.postalCode,
        primaryZipLast4: homeAddress.zipLast4,
      }),
      ...(mailingAddress && {
        secondaryStreet1: mailingAddress.street1,
        secondaryStreet2: mailingAddress.street2,
        secondaryCity: mailingAddress.city,
        secondaryState: mailingAddress.state,
        secondaryPostalCode: mailingAddress.postalCode,
        secondaryZipLast4: mailingAddress.zipLast4,
      }),
      primaryCountry: 'US',
      secondaryCountry: 'US',
      isMailingAddressSameAsPrimary:
        profile.contactDetails.isMailingAddressSameAsPrimary || false,
    },
  })

  const dobFormValue = form.watch('birthdate')
  const hasGuardian = form.watch('hasGuardian')
  const mailingSameAsPrimary = form.watch('isMailingAddressSameAsPrimary')

  const toggleFieldRegistration = (
    condition: boolean,
    fields: (keyof patientSchemaType)[],
  ) => {
    fields.forEach((field) =>
      condition ? form.register(field) : form.unregister(field),
    )
    if (form.formState.isSubmitted) form.trigger(fields)
  }

  useEffect(() => {
    if (profile.hasGuardian) return
    if (!profile.hasGuardian) {
      if (dobFormValue && getAgeFromDate(dobFormValue) < 18) {
        form.setValue('hasGuardian', true)
      } else {
        form.setValue('hasGuardian', false)
      }
    }
  }, [dobFormValue])

  useEffect(() => {
    toggleFieldRegistration(hasGuardian, [
      'guardianFirstName',
      'guardianLastName',
    ])
  }, [hasGuardian])

  useEffect(() => {
    toggleFieldRegistration(!mailingSameAsPrimary, [
      'secondaryStreet1',
      'secondaryStreet2',
      'secondaryCity',
      'secondaryState',
      'secondaryPostalCode',
      'secondaryZipLast4',
    ])
  }, [mailingSameAsPrimary])

  const formatPatientData = (data: patientSchemaType): PatientProfile => {
    const primaryAddressData = createAddress('Primary', data)
    const mailingAddressData = mailingSameAsPrimary
      ? { ...primaryAddressData, type: 'Mailing' }
      : createAddress('Secondary', data)

    return {
      ...profile,
      legalName: {
        ...profile.legalName,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
      },
      birthdate: data.birthdate.toString(),
      gender: data.gender,
      socialSecurityNumber: data.socialSecurityNumber,
      contactDetails: {
        ...profile.contactDetails,
        email: data.email,
        phoneNumbers: [
          ...(profile.contactDetails.phoneNumbers ?? []),
          { type: PhoneNumberEnum.CONTACT, number: data.phoneNumber },
        ],
        addresses: [primaryAddressData, mailingAddressData as PatientAddress],
        isMailingAddressSameAsPrimary: data.isMailingAddressSameAsPrimary,
      },
      hasGuardian: data.hasGuardian,
      guardian: data.hasGuardian
        ? {
            ...profile.guardian,
            name: {
              firstName: data.guardianFirstName || '',
              lastName: data.guardianLastName || '',
            },
          }
        : undefined,
    }
  }

  return { form, formatPatientData, setProfile, profile }
}
