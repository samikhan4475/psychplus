import { Organization } from '../../types'

const defaultValues = (data?: Partial<Organization>) => {
  const { street1, street2, city, state, postalCode, zipLast4 } =
    data?.organizationAddress ?? {}
  return {
    organizationId: data?.id ?? '',
    sameAsOrganizationAddress: true,
    sameAsPrimaryAddress: true,
    address1: street1 ?? '',
    address2: street2 ?? '',
    city: city ?? '',
    state: state ?? '',
    zip: postalCode ?? '',
    zipLast4: zipLast4 ?? '',
    recordStatus: data?.recordStatus ?? 'Active',
    practicePaymentAddress: {
      street1: street1 ?? '',
      street2: street2 ?? '',
      city: city ?? '',
      state: state ?? '',
      postalCode: postalCode ?? '',
      zipLast4: zipLast4 ?? '',
    },
  }
}

export { defaultValues }
