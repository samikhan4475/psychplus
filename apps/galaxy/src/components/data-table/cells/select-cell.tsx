import { Select } from '@radix-ui/themes'
import { cn } from '@/utils'

interface SelectCellProps {
  value?: string
  options: SelectCellOption[]
  onValueChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

interface SelectCellOption {
  value: string
  label: string
  disabled?: boolean
}

const SelectCell = ({
  value,
  options,
  onValueChange,
  className,
  disabled,
}: SelectCellProps) => {
  return (
    <Select.Root
      size="1"
      value={value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      <Select.Trigger
        placeholder="Select"
        className={cn('h-5 w-full text-gray-12', className)}
      />
      <Select.Content position="popper" highContrast>
        {options.map((option) => (
          <Select.Item
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  )
}

export { SelectCell }
