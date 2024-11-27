import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FilterFieldContainer } from '../../shared'

const VisitMediumSelect = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Visit Medium</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.VisitMedium}
        className="flex-1"
        name="visitMedium"
        size="1"
      />
    </FilterFieldContainer>
  )
}

export { VisitMediumSelect }
