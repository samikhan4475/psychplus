import { CodesetSelect, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { FilterFieldContainer } from '../../shared'

const TeleStateSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Tele-State</FormFieldLabel>
      <CodesetSelect
        name="teleState"
        className="flex-1"
        codeset={CODESETS.UsStates}
        size="1"
      />
    </FilterFieldContainer>
  )
}

export { TeleStateSelect }
