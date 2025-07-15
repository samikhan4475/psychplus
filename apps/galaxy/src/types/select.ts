interface SelectOptionType {
  label: string
  value: string
  disabled?: boolean
  ncpdpId?: string
  servicesOffered?: string
  insurancePlanObject?: { id: string; name: string }
  parentTitle?: string
  externalPharmacyId?:string,
  pharmacyId?:string
}

export type { SelectOptionType }
