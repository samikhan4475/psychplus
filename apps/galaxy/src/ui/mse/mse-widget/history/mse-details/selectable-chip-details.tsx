import { Flex, Text } from '@radix-ui/themes'
import { MseWidgetSchemaType } from '../../mse-widget-schema'
import { SelectedIndicator } from '../../select-indicotor'
import { MseReadOnlyTextInput } from './mse-read-only-text-input'

interface SelectableChipDetailsProps {
  label?: string
  field: keyof MseWidgetSchemaType
  result?: MseWidgetSchemaType
}

const SelectableChipDetails = ({
  label,
  field,
  result,
}: SelectableChipDetailsProps) => {
  const value = result?.[field]

  const displayValue = Array.isArray(value) ? value.join(', ') : value || ''

  return (
    <Flex position="relative" align="center">
      <SelectedIndicator />
      <Flex align="center" pl="1" className="bg-pp-focus-bg-2 rounded-1">
        {label && (
          <Text weight="medium" mr="1" className="text-[11px]">
            {label}
          </Text>
        )}
        <Flex align="center" gap="2">
          <MseReadOnlyTextInput
            value={displayValue}
            disabled={true}
            autoFocus={false}
            className="w-[100px]"
          />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { SelectableChipDetails, type SelectableChipDetailsProps }
