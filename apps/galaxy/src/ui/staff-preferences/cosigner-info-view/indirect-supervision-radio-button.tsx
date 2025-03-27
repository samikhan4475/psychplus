import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const IndirectSupervisionRadioButton = () => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'CosignerInfoDirectSupervisionOptions',
    valueKey: 'CosignerInfoDirectSupervisionValue',
  })
  return (
    <FormFieldContainer className="bg-pp-focus-bg w-full flex-row rounded-1 px-2 py-1">
      <FormFieldLabel>Indirect Supervision</FormFieldLabel>
      <RadioGroup
        className="ml-2 border-none"
        field="isCosignerInfoIndirectSupervision"
        defaultValue={
          watch('isCosignerInfoIndirectSupervision') ?? defaultValue
        }
        onValueChange={(val) =>
          setValue('isCosignerInfoIndirectSupervision', val)
        }
        options={options}
      />
    </FormFieldContainer>
  )
}

export { IndirectSupervisionRadioButton }
