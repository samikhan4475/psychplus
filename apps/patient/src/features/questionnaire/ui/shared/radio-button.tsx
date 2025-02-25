import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@psychplus/ui/cn'

interface RadioGroupProps {
  field: string
  options: RadioGroupOption[]
  className?: string
  disabled?: boolean
}

interface RadioGroupOption {
  label: string
  value: string
}

const RadioButton = ({
  field,
  options,
  className,
  disabled = false,
}: RadioGroupProps) => {
  const { watch, setValue } = useFormContext()
  const value = watch(field)

  return (
    <RadixRadioGroup.Root
      className={className}
      value={value}
      onValueChange={(newValue) => !disabled && setValue(field, newValue)}
    >
      {options.map(({ label, value: optionValue }) => {
        const id = `${field}-${optionValue}`
        const isSelected = value === optionValue

        return (
          <Flex key={optionValue} align="center" asChild>
            <label
              htmlFor={id}
              className={cn(
                'flex items-center gap-2',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
            >
              <RadixRadioGroup.Item
                id={id}
                value={optionValue}
                className={cn(
                  'rounded-full flex h-[14px] w-[14px] items-center justify-center border border-gray-9',
                  isSelected && 'border-blue-11 bg-blue-11',
                  disabled && 'cursor-not-allowed',
                )}
              >
                <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
              </RadixRadioGroup.Item>
              {label && (
                <Text
                  size="1"
                  className={cn(isSelected && 'font-bold', 'flex-1')}
                >
                  {label}
                </Text>
              )}
            </label>
          </Flex>
        )
      })}
    </RadixRadioGroup.Root>
  )
}

export { RadioButton }
