import { Practice } from '../../types'

const defaultValues = (data?: Partial<Practice>) => {
  const { street1, street2, city, state, postalCode } =
    data?.practiceAddress ?? {}
  return {
    id: data?.id ?? '',
    displayName: data?.displayName ?? '',
    npi: data?.npi ?? '',
    taxId: data?.taxId ?? '',
    taxonomy: data?.taxonomy ?? '',
    clia: data?.clia ?? '',
    practicePhone: data?.practicePhone ?? '',
    practiceFax: data?.practiceFax ?? '',
    defaultProviderStaffId: data?.defaultProviderStaffId ? data?.defaultProviderStaffId.toString() : '',
    organizationId: data?.organizationId ?? '',
    paymentAddressId: data?.paymentAddressId ?? '',
    practiceAddressId: data?.practiceAddressId ?? '',
    sameAsOrganizationAddress: true,
    sameAsPrimaryAddress: true,
    address1: street1 ?? '',
    address2: street2 ?? '',
    city: city ?? '',
    state: state ?? '',
    zip: postalCode ?? '',
    recordStatus: data?.recordStatus ?? '',
    practicePaymentAddress: {
      street1: street1 ?? '',
      street2: street2 ?? '',
      city: city ?? '',
      state: state ?? '',
      postalCode: postalCode ?? '',
    },
  }
}

export { defaultValues }
