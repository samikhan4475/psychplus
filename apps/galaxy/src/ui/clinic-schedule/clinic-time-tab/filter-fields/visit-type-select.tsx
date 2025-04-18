import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FilterFieldContainer } from '../../shared'

const VisitType = () => {
  return (
    <FilterFieldContainer>
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <CodesetSelect
        codeset={CODESETS.VisitType}
        name="visitType"
        className="flex-1"
        size="1"
      />
    </FilterFieldContainer>
  )
}

export { VisitType }
