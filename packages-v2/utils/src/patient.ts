import type { PhoneNumber } from '@psychplus-v2/types'

const getPatientPhoneNumber = (phoneNumbers?: PhoneNumber[]) => {
  if (!phoneNumbers || phoneNumbers.length === 0) {
    return undefined
  }

  const contactPhone =
    phoneNumbers.find((phone) => phone.type === 'Contact')?.number ??
    phoneNumbers[0].number

  if (contactPhone) {
    return contactPhone.replace(/\D/g, '')
  }
}

const getPatientSsn = (ssn?: string) => {
  if (ssn) {
    return ssn.replace(/\D/g, '')
  }
}

export { getPatientPhoneNumber, getPatientSsn }
