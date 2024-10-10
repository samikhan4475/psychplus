import { AsyncSelect, FormFieldLabel } from '@/components'
import { FormFieldContainer } from '../shared'
import { getClinicsOptionsAction } from '../actions'

const LocationDropdown = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <AsyncSelect
        field="location"
        placeholder="Select"
        fetchOptions={getClinicsOptionsAction}
        buttonClassName="flex-1 h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
