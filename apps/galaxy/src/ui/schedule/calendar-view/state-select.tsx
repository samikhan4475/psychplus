import { FormFieldLabel, SelectInput } from '@/components'
import { StateCodeSet } from '@/ui/visit/add-visit/types'
import { FormFieldContainer } from '../shared'

interface StateSelectProps {
  states: StateCodeSet[]
}

const StateSelect = ({ states }: StateSelectProps) => {
  const options = states.map((v) => ({
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
