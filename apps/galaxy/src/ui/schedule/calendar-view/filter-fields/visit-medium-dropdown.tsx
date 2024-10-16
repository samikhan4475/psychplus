import { FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { FormFieldContainer } from '../../shared'

const VisitMediumDropdown = () => {
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const options = codes
    .filter((code) => code.attributes?.[0].value === 'Primary')
    .map((code) => ({
      label: code.display,
      value: code.value,
    }))
    
  return (
    <FormFieldContainer>
      <FormFieldLabel>Visit Medium</FormFieldLabel>
      <SelectInput
        field="visitMedium"
        placeholder="Select"
        options={options}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { VisitMediumDropdown }
