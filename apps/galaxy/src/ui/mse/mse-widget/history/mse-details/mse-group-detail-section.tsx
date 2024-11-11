'use client'

import { Flex } from '@radix-ui/themes'
import { BlockLabel, SelectableChip } from '@/components'
import { MseWidgetSchemaType } from '../../mse-widget-schema'
import { SelectedIndicator } from '../../select-indicotor'
import { GroupSelectOption } from '../../types'
import { SelectableChipDetails } from './selectable-chip-details'

interface GroupSelectSectionProps<T extends string> {
  label?: string
  field: string
  options: GroupSelectOption<T>[]
  result?: MseWidgetSchemaType
  isTooltip?: boolean
}

type MseKeys = keyof MseWidgetSchemaType

const MseGroupDetailSection = <T extends string>({
  label,
  field,
  options,
  result,
  isTooltip = false,
}: GroupSelectSectionProps<T>) => {
  const values = result ? result[field as MseKeys] : []

  const isSelected = (value: string) => {
    return values.includes(value)
  }

  return (
    <Flex align="start" gap="2" className="pt-2">
      {label && <BlockLabel isTooltip={isTooltip}>{label}</BlockLabel>}
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

export { MseGroupDetailSection }
