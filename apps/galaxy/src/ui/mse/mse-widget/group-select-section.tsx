'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  SelectableChip,
  SelectableChipDetails,
  SelectableChipDetailsProps,
} from '@/components'

interface GroupSelectSectionProps<T extends string> {
  label: string
  field: string
  options: GroupSelectOption<T>[]
}

interface GroupSelectOption<T extends string> {
  label: string
  value: T
  details?: SelectableChipDetailsProps
}

const GroupSelectSection = <T extends string>({
  label,
  field,
  options,
}: GroupSelectSectionProps<T>) => {
  const form = useFormContext()

  const values = form.watch(field) as string[]

  const isSelected = (value: string) => {
    return values.includes(value)
  }

  const toggleSelected = (value: string) => () => {
    if (isSelected(value)) {
      form.setValue(
        field,
        values.filter((v) => v !== value),
        { shouldDirty: true },
      )
    } else {
      form.setValue(field, [...values, value], { shouldDirty: true })
    }
  }

  return (
    <Flex align="start" gap="2">
      <BlockLabel>{label}</BlockLabel>
      <Flex gap="1" wrap="wrap">
        {options.map((option) => (
          <SelectableChip
            key={option.value}
            label={option.label}
            selected={isSelected(option.value)}
            onClick={toggleSelected(option.value)}
          >
            {isSelected(option.value) && option.details && (
              <SelectableChipDetails {...option.details} />
            )}
          </SelectableChip>
        ))}
      </Flex>
    </Flex>
  )
}

export { GroupSelectSection }
