'use client'

import { useEffect, useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
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
  normalChipsSelected?: string[]
  setNormalChipsSelected?: (selected: string[]) => void
  dependentNormalValues?: string[]
  isTooltip?: boolean
}

interface RadioOption {
  label: string
  value: string
}

interface GroupSelectOption<T extends string> {
  label: string
  value: T
  details?: SelectableChipDetailsProps
  radioOption?: RadioOption[]
  isTooltip?: boolean
}

const PhysicalExamGroupSelectSection = <T extends string>({
  label,
  field,
  options,
  normalChipsSelected = [],
  setNormalChipsSelected,
  dependentNormalValues = [],
  isTooltip = false,
}: GroupSelectSectionProps<T>) => {
  const form = useFormContext()
  const values = form.watch(field) as string[]

  useEffect(() => {
    const radioOptions: RadioOption[] = options
      .flatMap((item) => item.radioOption ?? [])
      .filter((option): option is RadioOption => option !== undefined)

    const array: GroupSelectOption<T>[] = [
      ...options,
      ...radioOptions.map((radio) => ({
        label: radio.label,
        value: radio.value as T,
      })),
    ]

    const normalValues: string[] = array
      .filter(
        (v) =>
          v.label.includes('Normal') || dependentNormalValues.includes(v.value),
      )
      .map((v) => v.value)

    if (setNormalChipsSelected) {
      if (normalValues.every((item) => normalChipsSelected.includes(item))) {
        const newValues = [...new Set([...values, ...normalValues])]
        form.setValue(field, newValues, { shouldDirty: true })
      } else {
        const filteredValues = values.filter((v) => !normalValues.includes(v))
        form.setValue(field, filteredValues, { shouldDirty: true })
      }
    }
  }, [normalChipsSelected])

  const isSelected = (value: string) => {
    return values.includes(value) || normalChipsSelected.includes(value)
  }

  const toggleSelected = (value: string) => () => {
    if (isSelected(value)) {
      if (value.includes('Other')) {
        form.setValue(`${value}Details`, '', { shouldDirty: true })
      }

      form.setValue(
        field,
        values.filter((v) => v !== value),
        { shouldDirty: true },
      )
      if (normalChipsSelected.includes(value)) {
        if (setNormalChipsSelected) {
          setNormalChipsSelected(
            normalChipsSelected.filter((item) => item !== value),
          )
        }
      }
    } else {
      form.setValue(field, [...values, value], { shouldDirty: true })
      if (
        setNormalChipsSelected &&
        (value.includes('Normal') || dependentNormalValues.includes(value))
      ) {
        setNormalChipsSelected([...normalChipsSelected, value])
      }
    }
  }

  return (
    <Flex align="start" gap="2">
      <BlockLabel isTooltip={isTooltip}>{label}</BlockLabel>
      <Flex gap="1" wrap="wrap">
        {options.map((option) => (
          <Flex key={option.value} align="center" gap="1">
            <SelectableChip
              label={option.label}
              selected={isSelected(option.value)}
              onClick={toggleSelected(option.value)}
              isTooltip={option.isTooltip}
            >
              {isSelected(option.value) && option.details && (
                <SelectableChipDetails {...option.details} />
              )}
            </SelectableChip>
            {isSelected(option.value) && option.radioOption && (
              <>
                <SelectedIndicator />
                <Flex
                  align="center"
                  className="bg-pp-focus-bg-2 mr-3 rounded-1"
                  gap="1"
                >
                  {option.radioOption.map((radio) => (
                    <SelectableChip
                      key={radio.value}
                      label={radio.label}
                      selected={isSelected(radio.value)}
                      onClick={toggleSelected(radio.value)}
                    />
                  ))}
                </Flex>
              </>
            )}
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}

const SelectedIndicator = () => {
  return (
    <Box
      className="border-l-pp-focus-outline h-0 
  w-0
  border-y-[4px]
  border-l-[5px]
  border-y-transparent"
    ></Box>
  )
}

export { PhysicalExamGroupSelectSection }
