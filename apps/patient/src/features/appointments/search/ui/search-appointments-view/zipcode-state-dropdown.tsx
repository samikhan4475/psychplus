import { cn } from '@psychplus-v2/utils'
import { Select } from '@radix-ui/themes'

interface StateListType {
  code: string
  displayName: string
}

interface ZipCodeStateDropdownProps {
  options: StateListType[]
  name: string
  value: string
  onValueChange?: (value: string) => void
  size?: '2' | '1' | '3'
  className?: string
}

const ZipCodeStateDropdown = ({
  options,
  name,
  value,
  size = '2',
  onValueChange,
  className,
}: ZipCodeStateDropdownProps) => {
  return (
    <Select.Root
      size={size}
      name={name}
      value={value}
      onValueChange={onValueChange}
    >
      <Select.Trigger
        disabled
        className={cn(
          'min-w-[100px] text-accent-12',
          options.length <= 1 ? 'bg-gray-3 text-gray-11' : 'bg-[white]',
        )}
      />
      <Select.Content position="popper" align="end" highContrast>
        {options.map((state) => (
          <Select.Item
            className={cn('hover:bg-[#151B4A] hover:text-[white]', {
              className,
            })}
            value={state.displayName}
            key={state.code}
          >
            {state.displayName}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { ZipCodeStateDropdown }
