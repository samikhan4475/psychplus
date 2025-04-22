'use client'

import {
  AsyncAutoCompleteTextField,
  FormFieldContainer,
  FormFieldLabel,
} from '@/components'
import { searchPharmaciesAction } from './actions'

const PharmacySelect = () => {
  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Pharmacy</FormFieldLabel>
      <AsyncAutoCompleteTextField
        fetchDataAction={searchPharmaciesAction}
        field="pharmacyNcpdpId"
        placeholder="Search"
        valueKey="value"
        className="h-5 w-[210px]"
        truncateText={25}
      />
    </FormFieldContainer>
  )
}

export { PharmacySelect }
