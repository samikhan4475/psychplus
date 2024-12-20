'use client'

import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  BlockLabel,
  SelectableChip,
  SelectableChipDetails,
  SelectableChipDetailsProps,
} from '@/components'
import {
  containsAbnormal,
  getAlternate,
  normal,
  removeValueFromArray,
} from './utils'

interface GroupSelectSectionProps<T extends string> {
  label: string
  field: string
  options: GroupSelectOption<T>[]
  normalChipsSelected?: string[]
  setNormalChipsSelected?: (selected: string[]) => void
  dependentNormalValues?: string[]
  isTooltip?: boolean
  tooltipContent?: string
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
  tooltipContent?: string
}

const PhysicalExamGroupSelectSection = <T extends string>({
  label,
  field,
  options,
  normalChipsSelected = [],
  setNormalChipsSelected,
  dependentNormalValues = [],
  isTooltip = false,
  tooltipContent,
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

    if (normalChipsSelected.length === normal.length) {
      const newValues = [...new Set([...values, ...normalValues])]
      const filteredArray = newValues.filter(
        (value) => !value.includes('Abnormal'),
      )

      if (!containsAbnormal(normalChipsSelected))
        form.setValue(field, filteredArray, { shouldDirty: true })
    } else if (normalChipsSelected.length === 0) {
      const filteredValues = values.filter((v) => !normal.includes(v))
      form.setValue(field, filteredValues, { shouldDirty: true })
    }
  }, [normalChipsSelected])

  const isSelected = (value: string) => {
    return values?.includes(value) || normalChipsSelected.includes(value)
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

      if (normal.includes(value) && setNormalChipsSelected) {
        form.setValue(
          field,
          values.filter((item) => !item.includes(value)),
          { shouldDirty: true },
        )
      }

      if (normalChipsSelected.includes(value)) {
        if (setNormalChipsSelected) {
          setNormalChipsSelected([
            ...new Set(normalChipsSelected.filter((item) => item !== value)),
          ])
        }
      }
    } else {
      form.setValue(field, [...values, value], { shouldDirty: true })
      const updatedValues = form.getValues(field) as string[]
      const alterValue = getAlternate(value)
      const newValues = removeValueFromArray(updatedValues, alterValue)

      if (
        field === 'cranialNervesExam' &&
        alterValue &&
        setNormalChipsSelected &&
        updatedValues.length !== newValues.length
      ) {
        let updatedNormalChipsSelected = [...normalChipsSelected]

        updatedNormalChipsSelected = updatedNormalChipsSelected.filter(
          (item) => {
            return !item.startsWith('cne')
          },
        )

        updatedNormalChipsSelected = [
          ...new Set([...updatedNormalChipsSelected, ...newValues]),
        ]

        form.setValue(field, [...newValues], { shouldDirty: true })
        setNormalChipsSelected(updatedNormalChipsSelected)
      } else if (
        field !== 'cranialNervesExam' &&
        setNormalChipsSelected &&
        (value.includes('Normal') || dependentNormalValues.includes(value))
      ) {
        setNormalChipsSelected([...new Set([...normalChipsSelected, value])])
      }
    }
  }

  return (
    <Flex align="start" gap="2">
      <BlockLabel isTooltip={isTooltip} tooltipContent={tooltipContent}>
        {label}
      </BlockLabel>
      <Flex gap="1" wrap="wrap">
        {options.map((option) => (
          <Flex key={option.value} align="center" gap="1">
            <SelectableChip
              label={option.label}
              selected={isSelected(option.value)}
              onClick={toggleSelected(option.value)}
              isTooltip={option.isTooltip}
              tooltipContent={option.tooltipContent}
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
