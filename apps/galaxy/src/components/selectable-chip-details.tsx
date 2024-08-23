import { Box, Flex, Text } from '@radix-ui/themes'
import { DateInput } from './date-input'
import { NumberInput } from './number-input'
import { SelectInput } from './select-input'
import { TextInput } from './text-input'

type DetailsType = 'text' | 'number' | 'select' | 'date'

interface SelectableChipDetailsProps {
  type: DetailsType
  label: string
  field: string
  options?: { label: string; value: string }[]
}

const SelectableChipDetails = ({
  type,
  label,
  field,
  options,
}: SelectableChipDetailsProps) => {
  return (
    <Flex position="relative" align="center">
      <SelectedIndicator />
      <Flex align="center" pl="1" className="bg-pp-focus-bg-2 rounded-1">
        <Text weight="medium" mr="1" className="text-[11px]">
          {label}
        </Text>
        {type === 'text' && <TextInput field={field} autoFocus />}
        {type === 'number' && (
          <NumberInput field={field} className="w-[35px]" autoFocus />
        )}
        {type === 'select' && <SelectInput field={field} options={options} />}
        {type === 'date' && <DateInput field={field} autoFocus />}
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
