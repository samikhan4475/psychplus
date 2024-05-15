import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex } from '@radix-ui/themes'
import { FilterFieldLabel } from './filter-field-label'

interface AppointmentFilterRadioGroupProps<T> {
  title: string
  value: string
  onChange: (value: T) => void
  options: {
    value: T
    label: string
  }[]
}

const AppointmentFilterRadioGroup = <T extends string>({
  title,
  value,
  onChange,
  options,
}: AppointmentFilterRadioGroupProps<T>) => {
  return (
    <Flex direction="column" gap="1" className="flex-1">
      <FilterFieldLabel>{title}</FilterFieldLabel>
      <RadioGroup.Root value={value} onValueChange={onChange}>
        <Flex gap={{ initial: '2', sm: '3' }} height="100%">
          {options.map((option) => (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              className="data-[state=checked]:text-white flex-1 whitespace-nowrap rounded-2 bg-gray-3 px-2 py-2 text-[12px] font-[500] text-accent-12 data-[state=checked]:bg-accent-12 sm:flex-initial sm:px-2 sm:py-2"
            >
              {option.label}
            </RadioGroup.Item>
          ))}
        </Flex>
      </RadioGroup.Root>
    </Flex>
  )
}

export { AppointmentFilterRadioGroup }
