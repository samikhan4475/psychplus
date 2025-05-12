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

function getMaskedPhoneNumber(input: string): string {
  const cleaned = input?.replace(/\D/g, '')
  const areaCode = cleaned?.slice(0, 3)
  const centralOfficeCode = cleaned?.slice(3, 6)
  const lineNumber = cleaned?.slice(6, 10)
  let result = ''
  if (areaCode) result += `(${areaCode})`
  if (centralOfficeCode) result += ` ${centralOfficeCode}`
  if (lineNumber) result += `-${lineNumber}`

  return result?.trim()
}

export { getPatientPhoneNumber, getPatientSsn, getMaskedPhoneNumber }
