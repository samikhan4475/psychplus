import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const DayIsFullDoNotShowCheckbox = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'DayIsFullDoNotShowPublicViewOptions',
    valueKey: 'DayIsFullDoNotShowPublicViewValue',
  })
  return (
    <FormFieldContainer className="w-[60.5%] flex-row rounded-1 px-2 py-1">
      <RadioGroup
        className="!bg-white ml-2 flex-1 border-none"
        field="dayIsFullDoNotShowPublicViewPercent"
        defaultValue={
          watch('dayIsFullDoNotShowPublicViewPercent') ?? defaultValue
        }
        onValueChange={(val) =>
          setValue('dayIsFullDoNotShowPublicViewPercent', val)
        }
        options={options}
        wrapperClassName="flex-1"
        disabled={!isAdminView}
      />
    </FormFieldContainer>
  )
}

export { DayIsFullDoNotShowCheckbox }
