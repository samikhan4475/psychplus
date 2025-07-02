import { Organization } from '../../types'

const defaultValues = (data?: Organization) => {
  return {
    id: data?.id ?? '',
    name: data?.shortName ?? '',
    displayName: data?.displayName ?? '',
    recordStatus: data?.recordStatus ?? 'Active',
    address1: data?.organizationAddress?.street1 ?? '',
    address2: data?.organizationAddress?.street2 ?? '',
    city: data?.organizationAddress?.city ?? '',
    state: data?.organizationAddress?.state ?? '',
    zip: data?.organizationAddress?.postalCode ?? '',
    postalPlus4Code: data?.organizationAddress?.postalPlus4Code ?? '',
    contactEmail: data?.contactEmail ?? '',
    contactPhone: data?.contactPhone ?? '',
    contactName: data?.contactName ?? '',
    ehrPartner: data?.ehrPartner ?? false,
  }
}

export { defaultValues }
