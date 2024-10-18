import { Box, Flex, Text } from '@radix-ui/themes'
import { physicalExamWidgetSchema } from './data'
import { ReadOnlyTextInput } from './read-only-text-input'

interface SelectableChipDetailsProps {
  label: string
  field: keyof physicalExamWidgetSchema
  result?: physicalExamWidgetSchema
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
        <Text weight="medium" mr="1" className="text-[11px]">
          {label}
        </Text>
        <Flex align="center" gap="2">
          <ReadOnlyTextInput
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

export { SelectableChipDetails, type SelectableChipDetailsProps }
