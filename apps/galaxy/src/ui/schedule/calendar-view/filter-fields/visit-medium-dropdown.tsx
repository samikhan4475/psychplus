import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'

const VisitMediumDropdown = () => {
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const options = codes.map((code) => ({
    label: code.display,
    value: code.value,
  }))

  return (
    <FormFieldContainer>
      <FieldLabel>Visit Medium</FieldLabel>
      <DropdownSelect field="visitMediums" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { VisitMediumDropdown }
