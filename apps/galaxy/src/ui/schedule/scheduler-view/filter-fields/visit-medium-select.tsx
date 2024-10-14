import { CodesetSelect, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { FormFieldContainer } from '../../shared'

const VisitMediumSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Medium</FormFieldLabel>
      <CodesetSelect
        name="slotType"
        className="flex-1"
        codeset={CODESETS.VisitMedium}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
