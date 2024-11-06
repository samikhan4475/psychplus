import { AddPatientSchemaType } from './schema'

function transformOut(patient: AddPatientSchemaType): AddPatientSchemaType {
  const {
    contactInfo: { addresses, phoneNumbers },
    ...data
  } = patient

  const validPhoneNumbers = phoneNumbers?.filter((phone) => phone.number)
  const validAddresses = addresses?.filter((address) => address?.street1)

  const contactInfo = {
    ...(validPhoneNumbers?.length ? { phoneNumbers: validPhoneNumbers } : {}),
    ...(validAddresses?.length
      ? { addresses: validAddresses, isMailingAddressSameAsPrimary: true }
      : {}),
  }

  if (!data.guardian?.name?.firstName) {
    delete data.guardian
  }

  return { ...data, password: '', contactInfo }
}

export { transformOut }
