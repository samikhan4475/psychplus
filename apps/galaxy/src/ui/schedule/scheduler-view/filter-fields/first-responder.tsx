import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../../shared'

const options = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
]

const FirstResponderSelect = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel>First Responder</FormFieldLabel>
      <SelectInput
        field="isFirstResponder"
        placeholder="Select"
        options={options}
        buttonClassName="h-6 w-full"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { FirstResponderSelect }
