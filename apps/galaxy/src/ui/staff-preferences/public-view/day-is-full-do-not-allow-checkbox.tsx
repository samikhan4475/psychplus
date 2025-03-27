import { CheckboxGroup, Text } from '@radix-ui/themes'
import { Controller, useFormContext } from 'react-hook-form'
import { FormFieldContainer } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const DayIsFullDoNotAllowCheckbox = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { control } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'DayIsFullDoNotAllowStaffToBookOptions',
    valueKey: 'DayIsFullDoNotAllowStaffToBookValue',
  })
  return (
    <FormFieldContainer className="w-full px-2 py-1">
      <Controller
        name={'dayIsFullDoNotAllowStaffToBookPercent'}
        control={control}
        defaultValue={defaultValue?.split('|') ?? []}
        disabled={!isAdminView}
        render={({ field: { value, onChange, ...rest } }) => (
          <CheckboxGroup.Root
            className="ml-2 flex w-full flex-row gap-0"
            onValueChange={onChange}
            value={value}
            size="1"
            highContrast
            {...rest}
          >
            {options.map((option) => (
              <CheckboxGroup.Item
                key={option.label}
                value={option.value}
                className="ml-1 w-[20%]"
              >
                <Text size="1" className="text-[11px]">
                  {option.label}
                </Text>
              </CheckboxGroup.Item>
            ))}
          </CheckboxGroup.Root>
        )}
      />
    </FormFieldContainer>
  )
}

export { DayIsFullDoNotAllowCheckbox }
