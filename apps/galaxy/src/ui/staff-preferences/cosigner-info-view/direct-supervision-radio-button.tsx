import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const field = 'isCosignerInfoDirectSupervision'

const DirectSupervisionRadioButton = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'CosignerInfoDirectSupervisionOptions',
    valueKey: 'CosignerInfoDirectSupervisionValue',
  })
  return (
    <FormFieldContainer className="bg-pp-focus-bg w-full flex-row rounded-1 px-2 py-1">
      <FormFieldLabel>Direct Supervision</FormFieldLabel>
      <RadioGroup
        className="ml-2 border-none"
        field={field}
        defaultValue={watch(field) ?? defaultValue}
        onValueChange={(val) => setValue(field, val)}
        options={options}
        disabled={!isAdminView}
      />
    </FormFieldContainer>
  )
}

export { DirectSupervisionRadioButton }
