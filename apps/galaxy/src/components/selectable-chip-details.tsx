import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { MultiSelectField } from './checkbox-multiselect'
import { DateInput } from './date-input'
import { NumberInput } from './number-input'
import { SelectInput } from './select-input'
import { TextInput } from './text-input'

type DetailsType = 'text' | 'number' | 'select' | 'date' | 'multi-select'

interface SelectableChipDetailsProps {
  type: DetailsType
  label: string
  field: string
  options?: { label: string; value: string }[]
  showIndicator?: boolean
  placeHolder?: string
  format?: string
  isDisabled?: boolean
}

const SelectableChipDetails = ({
  type,
  label,
  field,
  options,
  showIndicator = true,
  placeHolder = '',
  format = '##',
  isDisabled = false,
}: SelectableChipDetailsProps) => {
  const form = useFormContext()
  const error = form.getFieldState(field, form.formState).error

  return (
    <Flex position="relative" align="center">
      {showIndicator && <SelectedIndicator />}
      <Flex align="center" pl="1" className="bg-pp-focus-bg-2 rounded-1">
        <Text weight="medium" mr="1" className="text-[11px]">
          {label}
        </Text>
        {type === 'text' && (
          <TextInput
            field={field}
            disabled={isDisabled}
            autoFocus
            placeHolder={placeHolder}
          />
        )}
        {type === 'number' && (
          <NumberInput
            format={format}
            field={field}
            className="w-[35px]"
            autoFocus
          />
        )}
        {type === 'select' && <SelectInput field={field} options={options} />}
        {type === 'date' && <DateInput field={field} autoFocus />}
        {type === 'multi-select' && (
          <MultiSelectField
            onChange={(vals) => form.setValue(field, vals)}
            options={options || []}
            defaultValues={form.watch(field)}
          />
        )}
      </Flex>
      {error ? (
        <Text className="pl-1 text-[12px] text-tomato-11">{error.message}</Text>
      ) : null}
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
