import type {
  ContactDetails,
  Cosigner,
  Gender,
  GenderAbbreviation,
  Insurance,
  LegalName,
  PatientAddress,
  PatientAddressType,
  PatientGuardian,
  PhoneNumber,
} from '@/types'
import { sanitizePhoneNumber } from './phone'

const PADDED_MRN_LENGTH = 8

const GENDER_ABBREVIATIONS: Record<Gender, GenderAbbreviation> = {
  Male: 'M',
  Female: 'F',
  Undetermined: 'U',
}

const getPatientFirstName = (name: LegalName) => name?.firstName ?? ''

const getPatientLastName = (name: LegalName) => name?.lastName ?? ''

const getPatientMiddleName = (name: LegalName) => name?.middleName ?? ''

const filterDefaultCosigner = (cosigners: Cosigner[]) => {
  return cosigners.find((item) => item?.isDefaultCosigner === true)
}

const getPatientFullName = (name: LegalName) =>
  `${getPatientFirstName(name)} ${getPatientLastName(name)}`

const getPatientMRN = (id: number) => {
  const diff = PADDED_MRN_LENGTH - String(id).length

  if (diff <= 0) {
    return String(id)
  }

  return new Array(diff).fill('0').join('') + String(id)
}

const getPatientEmail = (contact?: ContactDetails) => contact?.email ?? ''

const getPatientPhone = (phoneNumbers?: PhoneNumber[]) => {
  if (!phoneNumbers || phoneNumbers.length === 0) {
    return undefined
  }

  const phoneNumber =
    phoneNumbers.find((phone) => phone.type === 'Contact')?.number ??
    phoneNumbers[0].number

  if (!phoneNumber) {
    return undefined
  }

  return sanitizePhoneNumber(phoneNumber)
}

const getPatientDOB = (dobString: string): string => {
  const date = new Date(dobString)
  const day = date.toLocaleString('default', { day: '2-digit' })
  const month = date.toLocaleString('default', { month: '2-digit' })
  const year = date.toLocaleString('default', { year: 'numeric' })
  return `${month}/${day}/${year}`
}

const getPatientAge = (dobString: string) => {
  const today = new Date()
  const birthDate = new Date(dobString)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

const getPatientPostalCode = (
  addresses?: PatientAddress[],
  type: PatientAddressType = 'Home',
) => {
  if (!addresses || addresses.length === 0) {
    return undefined
  }

  const address = addresses.find((addr) => addr.type === type)

  if (!address) {
    return addresses[0].postalCode
  }

  return address.postalCode
}

const getPatientZipLast4 = (
  addresses?: PatientAddress[],
  type: PatientAddressType = 'Home',
) => {
  if (!addresses || addresses.length === 0) {
    return undefined
  }

  const address = addresses.find((addr) => addr.type === type)

  if (!address) {
    return addresses[0].zipLast4
  }

  return address.zipLast4 ?? ''
}

const getPatientCity = (
  addresses?: PatientAddress[],
  type: PatientAddressType = 'Home',
) => {
  if (!addresses || addresses.length === 0) {
    return undefined
  }

  const address = addresses.find((addr) => addr.type === type)

  if (!address) {
    return addresses[0].city
  }

  return address.city
}

const getPatientState = (
  addresses?: PatientAddress[],
  type: PatientAddressType = 'Home',
) => {
  if (!addresses || addresses.length === 0) {
    return undefined
  }

  const address = addresses.find((addr) => addr.type === type)

  if (!address) {
    return addresses[0].state
  }

  return address.state
}

const getPatientMainAddress = (addresses?: PatientAddress[]) => {
  if (!addresses || addresses.length === 0) {
    return undefined
  }

  let address = addresses.find((addr) => addr.type === 'Home')

  if (!address) {
    address = addresses[0]
  }

  return `${address.street1}, ${address.city}, ${address.state} ${address.postalCode}`
}

const getPatientStreet = (
  addresses?: PatientAddress[],
  type: PatientAddressType = 'Home',
) => {
  if (!addresses || addresses.length === 0) {
    return undefined
  }

  let address = addresses.find((addr) => addr.type === type)

  if (!address) {
    address = addresses[0]
  }

  return address.street1 || address.street2 || undefined
}

const getPatientGender = (gender: Gender) => GENDER_ABBREVIATIONS[gender]

const getGuardianFirstName = (guardian?: PatientGuardian) =>
  guardian?.name?.firstName

const getGuardianLastName = (guardian?: PatientGuardian) =>
  guardian?.name?.lastName

const getPatientInsuranceName = (insurances: Insurance[] | undefined) => {
  if (!insurances || insurances?.length === 0) {
    return undefined
  }
  return insurances?.[0]?.policyName
}

const getMaskedSSN = (ssn?: string): string | undefined => {
  if (!ssn?.trim()) return undefined
  return ssn.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{3})/, '$1-$2-$3')
}

const getTruncatedName = (name: string | undefined, length = 30): string => {
  if (!name) return ''
  if (name.length > length) {
    return name.slice(0, length - 3) + '...'
  }
  return name
}

const formatPatientVitalHeightWeight = (
  height?: number,
  weight?: number,
): string => {
  if (!height && !weight) return 'N/A'
  return `${height ?? 'N/A'}/${weight ?? 'N/A'}`
}

export {
  getPatientFirstName,
  getPatientLastName,
  getPatientMiddleName,
  getPatientFullName,
  getGuardianFirstName,
  getGuardianLastName,
  getPatientMRN,
  getPatientEmail,
  getPatientPhone,
  getPatientDOB,
  getPatientAge,
  getPatientGender,
  getPatientMainAddress,
  getPatientPostalCode,
  getPatientCity,
  getPatientState,
  getPatientInsuranceName,
  getPatientStreet,
  filterDefaultCosigner,
  getMaskedSSN,
  getTruncatedName,
  formatPatientVitalHeightWeight,
  getPatientZipLast4,
}
