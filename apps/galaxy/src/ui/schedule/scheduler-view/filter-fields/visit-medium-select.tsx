import { DropdownSelect } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { FieldLabel, FormFieldContainer } from '../../shared'

const VisitMediumSelect = () => {
  const options = useCodesetOptions(CODESETS.VisitMedium)
  return (
    <FormFieldContainer>
      <FieldLabel>Visit Medium</FieldLabel>
      <DropdownSelect field="type" options={options} shouldDirty />
    </FormFieldContainer>
  )
}

export { VisitMediumSelect }
