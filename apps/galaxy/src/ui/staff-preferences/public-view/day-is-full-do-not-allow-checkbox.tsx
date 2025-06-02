import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const DayIsFullDoNotAllowCheckbox = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'DayIsFullDoNotAllowStaffToBookOptions',
    valueKey: 'DayIsFullDoNotAllowStaffToBookValue',
  })
  return (
    <FormFieldContainer className="w-[60.5%] flex-row rounded-1 px-2 py-1">
      <RadioGroup
        className="ml-2 flex-1 border-none !bg-transparent"
        field="dayIsFullDoNotAllowStaffToBookPercent"
        defaultValue={
          watch('dayIsFullDoNotAllowStaffToBookPercent') ?? defaultValue
        }
        onValueChange={(val) =>
          setValue('dayIsFullDoNotAllowStaffToBookPercent', val)
        }
        options={options}
        wrapperClassName="flex-1 bg-transparent"
        disabled={!isAdminView}
      />
    </FormFieldContainer>
  )
}

export { DayIsFullDoNotAllowCheckbox }
