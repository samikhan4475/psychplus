import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useDropdownContext } from '../context'

const StateSelect = () => {
  const { usStates } = useDropdownContext()
  const options = usStates.map((v) => ({
    label: v.stateName,
    value: v.id,
  }))

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">State</FormFieldLabel>
      <SelectInput
        field="stateId"
        options={options}
        buttonClassName="flex-1 h-6"
        className="flex-1"
      />
    </FormFieldContainer>
  )
}

export { StateSelect }
