import { PatientAddress } from '@/types'
import { LegalName } from '@/types/name'
import { ContactDetails } from '../types'

export type OriginalData = {
  firstName: string
  lastName: string
  credentials?: string
  phone?: string
  email?: string
  fax?: string
  isMailingAddressSameAsHome: string
  officeAddress: PatientAddress
  mailingAddress: PatientAddress
}

export type TransformedData = {
  legalName: LegalName
  contactDetails: ContactDetails
  IsMailingAddressSameAsHome: boolean
}

export const transformData = (data: OriginalData) => {
  const {
    firstName,
    lastName,
    credentials,
    phone,
    email,
    fax,
    isMailingAddressSameAsHome,
    officeAddress,
    mailingAddress,
  } = data

  const res = {
    legalName: {
      firstName: firstName,
      lastName: lastName,
      title: credentials,
    },
    contactDetails: {
      phoneNumbers: [
        { type: 'Contact', number: phone || '' },
        { type: 'Business', number: fax || '' },
      ],
      email: email || '',
      addresses: [
        {
          type: 'Home',
          street1: officeAddress.street1,
          street2: officeAddress.street2 || '',
          city: officeAddress.city,
          state: officeAddress.state,
          postalCode: officeAddress.postalCode,
          zipLast4: officeAddress.zipLast4 ?? '',
        },
        isMailingAddressSameAsHome === 'yes'
          ? {
              type: 'Mailing',
              street1: officeAddress.street1,
              street2: officeAddress.street2 || '',
              city: officeAddress.city,
              state: officeAddress.state,
              postalCode: officeAddress.postalCode,
              zipLast4: officeAddress.zipLast4 ?? '',
            }
          : {
              type: 'Mailing',
              street1: mailingAddress.street1,
              street2: officeAddress.street2 || '',
              city: mailingAddress.city,
              state: mailingAddress.state,
              postalCode: mailingAddress.postalCode,
              zipLast4: officeAddress.zipLast4 ?? '',
            },
      ],
    },
    isMailingAddressSameAsHome: isMailingAddressSameAsHome === 'yes',
  }

  res.contactDetails.phoneNumbers = res.contactDetails.phoneNumbers.filter(
    (phoneNumber) => phoneNumber.number.trim() !== '',
  )
  res.contactDetails.addresses = res.contactDetails.addresses.filter(
    (address) =>
      address.street1.trim() !== '' &&
      address.city.trim() !== '' &&
      address.state.trim() !== '' &&
      address.postalCode.trim() !== '',
  )
  return res
}
