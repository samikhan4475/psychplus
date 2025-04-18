import { PracticeResource } from '@/types'

const defaultValues = (data: PracticeResource) => {
  return {
    id: data.id,
    name: data.displayName,
    npi: data.npi,
    taxId: data.taxId,
    taxonomy: data.taxonomy,
    clia: data.clia,
    organizationId: data.organizationId,
    recordStatus: data.recordStatus,
    practicePhone: data.practicePhone,
    practiceFax: data.practiceFax,
    defaultProviderStaffId: data.defaultProviderStaffId
      ? `${data.defaultProviderStaffId}`
      : '',
    primaryAddress: data.practiceAddress,
    payerAddress: data.paymentAddressId,
    isMailingAddressSameAsPrimary: 'no',
    isMailingAddressSameAsOrganization: 'no',
    address1: data.practiceAddress?.street1,
    address2: data.practiceAddress?.street2,
    city: data.practiceAddress?.city,
    state: data.practiceAddress?.state,
    zip: data.practiceAddress?.postalCode,
    payer: {
      street1: data.practicePaymentAddress?.street1,
      street2: data.practicePaymentAddress?.street2,
      city: data.practicePaymentAddress?.street2,
      state: data.practicePaymentAddress?.state,
      postalCode: data.practicePaymentAddress?.postalCode,
    },
  }
}

export { defaultValues }
