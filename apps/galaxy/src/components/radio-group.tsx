import * as RadixRadioGroup from '@radix-ui/react-radio-group'
import { Text } from '@radix-ui/themes'
import { cn } from '@/utils'
import { useFormContext } from 'react-hook-form'

interface RadioGroupProps {
  field: string
  options: RadioGroupOption[]
  className?: string
}

interface RadioGroupOption {
  label: string
  value: string
}

const RadioGroup = ({ field, options, className }: RadioGroupProps) => {
  const form = useFormContext()

  const value = form.watch(field)

  return (
    <RadixRadioGroup.Root
      onValueChange={(value) => {
        form.setValue(field, value)
      }}
      value={value}
      className="flex gap-1.5"
    >
      {options.map((option) => {
        const isSelected = value === option.value
        const id = `radio-option-${option.value}`

        return (
          <Text
            key={option.value}
            as="label"
            htmlFor={id}
            className={cn(
              'flex h-[var(--chip-height)] cursor-pointer items-center rounded-1 border border-gray-7 px-1',
              {
                'border-pp-focus-outline bg-pp-focus-bg': isSelected,
              },
              className,
            )}
          >
            <RadixRadioGroup.Item
              className="rounded-full flex h-[12px] w-[12px] items-center justify-center border border-gray-9 data-[state=checked]:bg-blue-11"
              value={option.value}
              id={id}
            >
              <RadixRadioGroup.Indicator className="after:bg-white after:rounded-full flex h-full w-full items-center justify-center after:block after:h-[4px] after:w-[4px] after:content-['']" />
            </RadixRadioGroup.Item>
            <Text
              ml="1"
              className={cn('cursor-pointer text-[11px]', {
                'font-medium': isSelected,
              })}
            >
              {option.label}
            </Text>
          </Text>
        )
      })}
    </RadixRadioGroup.Root>
  )
}

export { RadioGroup }
