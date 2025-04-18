import { CodesetSelect, FormFieldContainer, FormFieldLabel } from '@/components'
import { CODESETS } from '@/constants'
import { VisitMediumEnum } from '@/enum'

const VisitMediumDropdown = () => {
  return (
    <FormFieldContainer className="flex-row gap-1">
      <FormFieldLabel>Visit Medium</FormFieldLabel>
      <CodesetSelect
        name="type"
        size="1"
        codeset={CODESETS.VisitMedium}
        exclude={[VisitMediumEnum.Either, VisitMediumEnum.Na]}
        className="w-[150px]"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumDropdown }
