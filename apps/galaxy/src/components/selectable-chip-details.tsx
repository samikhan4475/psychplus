import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { cn } from '@/utils'
import { MultiSelectField } from './checkbox-multiselect'
import { ChipList } from './chip-list'
import { DatePickerInput } from './date-picker-input'
import { NumberInput } from './number-input'
import { SelectInput } from './select-input'
import { TextInput } from './text-input'

type DetailsType = 'text' | 'number' | 'select' | 'date' | 'multi-select'

interface SelectableChipDetailsProps {
  type: DetailsType
  label?: string
  field: string
  hideSelectedCount?: boolean
  options?: { label: string; value: string }[]
  showIndicator?: boolean
  placeHolder?: string
  format?: string
  isDisabled?: boolean
  isOptionsChip?: boolean
  className?: string
  rightLabel?: string
  editable?: boolean
  maxLength?: number
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
  className,
  isOptionsChip,
  hideSelectedCount = false,
  rightLabel,
  editable = true,
  maxLength,
}: SelectableChipDetailsProps) => {
  const form = useFormContext()
  const error = form.getFieldState(field, form.formState).error

  const disabled = !editable || isDisabled

  return (
    <>
      <Flex position="relative" align="center">
        {showIndicator && <SelectedIndicator />}
        <Flex
          align="center"
          className={cn(
            `bg-pp-focus-bg-2 rounded-1 ${label ? 'pl-1' : ''}`,
            className,
          )}
        >
          {label && (
            <Text
              weight="medium"
              mr="1"
              className="whitespace-nowrap text-[11px]"
            >
              {label}
            </Text>
          )}
          {type === 'text' && (
            <TextInput
              field={field}
              disabled={disabled}
              autoFocus={!form.watch(field)}
              placeHolder={placeHolder}
              maxLength={maxLength}
            />
          )}
          {type === 'number' && (
            <NumberInput
              format={format}
              field={field}
              className="w-[45px]"
              placeholder={placeHolder}
              disabled={disabled}
            />
          )}
          {type === 'select' && (
            <SelectInput field={field} options={options} disabled={disabled} />
          )}
          {type === 'date' && (
            <Box className="w-[100px]">
              <DatePickerInput
                field={field}
                isDisabled={disabled}
                isRequired={true}
              />
            </Box>
          )}
          {type === 'multi-select' && (
            <MultiSelectField
              onChange={(vals) =>
                form.setValue(field, vals, { shouldDirty: true })
              }
              options={options || []}
              defaultValues={form.watch(field)}
              hideSelectedCount={hideSelectedCount}
              disabled={disabled}
            />
          )}
        </Flex>
        {rightLabel && <Text className="ml-1 text-[11px]">{rightLabel}</Text>}
        {error ? (
          <Text className="pl-1 text-[12px] text-tomato-11">
            {error.message}
          </Text>
        ) : null}
      </Flex>
      {type === 'multi-select' && isOptionsChip && (
        <ChipList
          data={form.watch(field)}
          field={field}
          chipClassName="self-center"
          options={options ?? []}
        />
      )}
    </>
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

export {
  SelectableChipDetails,
  type SelectableChipDetailsProps,
  type DetailsType,
}
