import { CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'
import { FieldLabel, FormFieldContainer } from '../../shared'

const VisitMediumSelect = () => {
  return (
    <FormFieldContainer>
      <FieldLabel>Visit Medium</FieldLabel>
      <CodesetSelect
        name="type"
        className="flex-1"
        codeset={CODESETS.VisitMedium}
        size="1"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
