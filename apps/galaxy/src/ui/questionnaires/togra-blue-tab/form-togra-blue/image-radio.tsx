import Image from 'next/image'
import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'

interface RadioGroupProps {
  field: string
  question: string
  options: RadioGroupOption[]
  className?: string
  disabled?: boolean
}

interface RadioGroupOption {
  label: string
  value: string
}

const RadioImageButton = ({
  field,
  options,
  className,
  question,
  disabled = false,
}: RadioGroupProps) => {
  const { watch, setValue } = useFormContext()
  const value = watch(field)

  return (
    <RadixRadioGroup.Root
      className={cn('grid grid-cols-5 gap-4', className)}
      value={value}
      onValueChange={(newValue) => !disabled && setValue(field, newValue)}
    >
      {options.map(({ label, value: optionValue }) => {
        const isSelected = value === optionValue

        return (
          <RadixRadioGroup.Item
            key={optionValue}
            value={optionValue}
            className={cn(
              'rounded-lg focus:ring-blue-300 relative outline-none transition-all duration-200 focus:ring-2',
              disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer',
              isSelected
                ? 'ring-blue-300 rounded-lg ring-2'
                : !disabled && 'hover:ring-gray-300 hover:ring-1',
            )}
          >
            {/* Image is the clickable surface */}
            <Image
              src={`/ehr/togra/blue/${question}-${optionValue}.png`}
              alt={`Option ${label}`}
              width={144}
              height={144}
              className="rounded-md"
            />

            <Text
              size="1"
              className={cn(
                'mt-1 block h-6 text-center transition-all duration-200',
                isSelected ? 'bg-pp-bg-accent font-bold' : 'text-gray-700',
              )}
            >
              {label}
            </Text>
          </RadixRadioGroup.Item>
        )
      })}
    </RadixRadioGroup.Root>
  )
}

export { RadioImageButton }
