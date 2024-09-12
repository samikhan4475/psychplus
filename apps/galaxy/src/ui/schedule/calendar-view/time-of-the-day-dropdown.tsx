import { Select } from '@radix-ui/themes'
import { FormFieldLabel } from '@/components'
import { FormFieldContainer } from './form-field-container'

const TimeOfTheDayDropdown = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Time of the day</FormFieldLabel>
      <Select.Root defaultValue="evening" size="1">
        <Select.Trigger placeholder="Select" className="flex-1" />
        <Select.Content position="popper" highContrast>
          <Select.Item value="morning">Morning</Select.Item>
          <Select.Item value="morning">Afternoon</Select.Item>
          <Select.Item value="evening">Evening</Select.Item>
          <Select.Item value="night">Night</Select.Item>
        </Select.Content>
      </Select.Root>
    </FormFieldContainer>
  )
}

export { TimeOfTheDayDropdown }
