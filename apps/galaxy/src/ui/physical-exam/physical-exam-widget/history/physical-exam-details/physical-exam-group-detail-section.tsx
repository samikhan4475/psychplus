'use client'

import { Box, Flex } from '@radix-ui/themes'
import { BlockLabel, SelectableChip } from '@/components'
import { GroupSelectOption } from '../../types'
import { physicalExamWidgetSchema } from './data'
import { SelectableChipDetails } from './selectable-chip-details'

interface GroupSelectSectionProps<T extends string> {
  label: string
  field: string
  options: GroupSelectOption<T>[]
  result?: physicalExamWidgetSchema
  isTooltip?: boolean
}

type PhysicalExamKeys = keyof physicalExamWidgetSchema

const PhysicalExamGroupDetailSection = <T extends string>({
  label,
  field,
  options,
  result,
  isTooltip = false,
}: GroupSelectSectionProps<T>) => {
  const values = result ? result[field as PhysicalExamKeys] : []

  const isSelected = (value: string) => {
    return values.includes(value)
  }

  return (
    <Flex align="start" gap="2" className="pt-2">
      <BlockLabel isTooltip={isTooltip}>{label}</BlockLabel>
      <Flex gap="1" wrap="wrap">
        {options.map((option) => (
          <Flex key={option.value} align="center" gap="1">
            <SelectableChip
              label={option.label}
              selected={isSelected(option.value)}
              onClick={() => {}}
              isTooltip={option.isTooltip}
            >
              {isSelected(option.value) && option.details && (
                <SelectableChipDetails {...option.details} result={result} />
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
                      onClick={() => {}}
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
    ></Box> //TODO CHECK THIS
  )
}

export { PhysicalExamGroupDetailSection }
