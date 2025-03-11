'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from './block-label'
import { SelectableChip } from './selectable-chip'
import {
  SelectableChipDetails,
  SelectableChipDetailsProps,
} from './selectable-chip-details'

interface GroupSelectProps<T extends string> {
  label?: string
  field: string
  options: GroupSelectOptions<T>[]
  parentField?: string
  valueInParent?: string
  hasChild?: boolean
  onToggle?: (value: string) => void
  editable?: boolean
  chipClassName?: string
  errorField?: string
}

interface GroupSelectOptions<T extends string> {
  label: string
  value: T
  fieldName?: string
  details?: SelectableChipDetailsProps
}

const GroupSelectSection = <T extends string>({
  label,
  field,
  options,
  parentField,
  valueInParent,
  hasChild,
  onToggle,
  editable = true,
  chipClassName,
  errorField,
}: GroupSelectProps<T>) => {
  const form = useFormContext()

  const values = form.watch(field) as string[]

  const isSelected = (value: string) => {
    return values?.includes(value)
  }

  const toggleSelectedValue =
    (value: string, option: GroupSelectOptions<T>) => () => {
      if (!editable) return

      const isSelect = isSelected(value)
      if (onToggle) {
        onToggle(value)
        return
      }

      if (option) {
        const { details, fieldName } = option

        // Handle case where there are child options
        if (hasChild && fieldName && isSelect) {
          const values = form.getValues(fieldName)
          if (values?.length > 0) {
            form.setValue(fieldName, Array.isArray(values) ? [] : undefined)
          }
        }

        // Clear related field if option details are present
        if (isSelect && details?.field) {
          const detailFieldValue = form.getValues(details?.field)
          form.setValue(
            details.field,
            Array.isArray(detailFieldValue) ? [] : '',
          )
        }
      }
      const newValues = isSelect
        ? values.filter((v) => v !== value)
        : [...values, value]

      form.setValue(field, newValues, { shouldDirty: true })

      // If parentField is provided, update it based on selections
      if (parentField && valueInParent) {
        const currentParentValues = form.getValues(parentField)

        const updatedParentValues =
          newValues.length > 0
            ? [...new Set([...currentParentValues, valueInParent])]
            : currentParentValues.filter(
                (item: string) => item !== valueInParent,
              )

        form.setValue(parentField, updatedParentValues, { shouldDirty: true })
      }
    }

  let error = undefined
  if (errorField) {
    error = form?.formState?.errors?.[errorField]?.message
  }

  return (
    <Flex align="center" gap="1" wrap="wrap">
      {label && <BlockLabel>{label}</BlockLabel>}
      {options.map((option) => (
        <SelectableChip
          key={option.value}
          label={option.label}
          selected={isSelected(option.value)}
          onClick={toggleSelectedValue(option.value, option)}
          className={cn(chipClassName, error && 'border border-tomato-11')}
        >
          {isSelected(option.value) && option.details && (
            <SelectableChipDetails {...option.details} />
          )}
        </SelectableChip>
      ))}
    </Flex>
  )
}

export { GroupSelectSection }
export type { GroupSelectProps, GroupSelectOptions }
