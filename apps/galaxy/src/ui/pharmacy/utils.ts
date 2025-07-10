import { FilterSchemaType } from './filter-form'
import { PharmacySearchParams } from './types'

const transformFormValuesToPayload = (
  values: Partial<FilterSchemaType>,
): PharmacySearchParams => ({
  organizationName: values.pharmacyName,
  address1: values.pharmacyAddress,
  city: values.pharmacyCity,
  state: values.pharmacyStateCode === 'all' ? '' : values.pharmacyStateCode,
  zip: values.pharmacyZip ? parseInt(values.pharmacyZip, 10).toString() : '',
  phone: values.pharmacyPhone,
})
export { transformFormValuesToPayload }
