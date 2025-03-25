import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SchemaType } from '../schema'

const statusOptions = [
  { label: 'Select', value: 'NotSet' },
  { label: 'Yes', value: 'Yes' },
  { label: 'No', value: 'No' },
]
const AlertSelect = () => {
  const form = useFormContext<SchemaType>()
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Alert</FormFieldLabel>
      <SelectInput
        field="isAlert"
        size="1"
        options={statusOptions}
        onValueChange={(value) =>
          form.setValue('isAlert', value, { shouldDirty: true })
        }
        buttonClassName="h-6 w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { AlertSelect }
