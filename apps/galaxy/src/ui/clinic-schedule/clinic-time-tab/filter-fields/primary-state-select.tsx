import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FilterFieldContainer } from '../../shared'

const PrimaryStateSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Primary State</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.UsStates}
        name="primaryStateCode"
        className="flex-1"
        size="1"
      />
    </FilterFieldContainer>
  )
}

export { PrimaryStateSelect }
