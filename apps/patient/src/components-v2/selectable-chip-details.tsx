import { cn } from '@psychplus-v2/utils'
import { Box, Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from './block-label'
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
  maxLength?: number
  isRequired?: boolean
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
  maxLength,
  isRequired = true,
}: SelectableChipDetailsProps) => {
  const form = useFormContext()
  const error = form.getFieldState(field, form.formState).error

  return (
    <>
      <Flex position="relative" align="center">
        {showIndicator && <SelectedIndicator />}
        {type === 'text' ? (
          <TextInput
            field={field}
            disabled={isDisabled}
            autoFocus={!form.watch(field)}
            placeHolder={placeHolder}
            maxLength={maxLength}
            className="w-[250px]"
          />
        ) : (
          <Flex
            align="center"
            className={cn(
              'bg-pp-focus-bg-2 h-8 rounded-2 border border-gray-8 bg-[#F7F9FC] px-2 py-1',
              className,
            )}
          >
            {label && <BlockLabel className="mr-1">{label}</BlockLabel>}
            {type === 'number' && (
              <NumberInput
                format={format}
                field={field}
                className="focus:border-pp-focus-outline w-[38px] rounded-2 border border-gray-8 outline-none focus:outline-none"
                autoFocus
                placeholder={placeHolder}
              />
            )}
            {type === 'select' && (
              <SelectInput field={field} options={options} />
            )}
            {type === 'date' && (
              <DatePickerInput
                field={field}
                isDisabled={isDisabled}
                isRequired={isRequired}
              />
            )}
            {type === 'multi-select' && (
              <MultiSelectField
                onChange={(vals) =>
                  form.setValue(field, vals, { shouldDirty: true })
                }
                options={options || []}
                defaultValues={form.watch(field)}
                hideSelectedCount={hideSelectedCount}
              />
            )}
          </Flex>
        )}
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
    <Box className="border-r-pp-focus-outline h-0 w-0 border-y-[4px] border-r-[5px] border-[#194595] border-y-transparent"></Box>
  )
}

export {
  SelectableChipDetails,
  type SelectableChipDetailsProps,
  type DetailsType,
}
