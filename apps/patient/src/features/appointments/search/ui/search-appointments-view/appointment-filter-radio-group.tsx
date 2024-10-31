import * as RadioGroup from '@radix-ui/react-radio-group'
import { Flex } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { FilterFieldLabel } from './filter-field-label'

interface AppointmentFilterRadioGroupProps<T> {
  title: string
  value: string
  onChange: (value: T) => void
  options: {
    value: T
    label: string
  }[]
  disabled?: boolean
}

const AppointmentFilterRadioGroup = <T extends string>({
  title,
  value,
  onChange,
  options,
  disabled,
}: AppointmentFilterRadioGroupProps<T>) => {
  return (
    <Flex gap="1" align="center" className="flex-1">
      <FilterFieldLabel>{title}</FilterFieldLabel>
      <RadioGroup.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
        className={cn(disabled && 'pointer-events-none opacity-50')}
      >
        <Flex gap={{ initial: '2', sm: '3' }} height="100%">
          {options.map((option) => (
            <RadioGroup.Item
              key={option.value}
              value={option.value}
              className="data-[state=checked]:text-white border-pp-gray-2 bg-white text-black flex-1 whitespace-nowrap rounded-6 px-2 py-2 text-[12px] font-[500] data-[state=checked]:border-accent-12 data-[state=checked]:bg-accent-12 sm:flex-initial sm:px-6 sm:py-2"
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
