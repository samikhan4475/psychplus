import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { StateCodeSet } from '@/ui/visit/add-visit/types'

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
      <SelectInput field="stateId" options={options} buttonClassName="flex-1" />
    </FormFieldContainer>
  )
}

export { StateSelect }
