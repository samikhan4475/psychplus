import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { SchemaType } from '../schema'

const AlertSelect = () => {
  const form = useFormContext<SchemaType>()
  const statusOptions = [
    { label: 'Yes', value: 'Yes' },
    { label: 'No', value: 'No' },
  ]
  return (
    <FormFieldContainer className="w-auto flex-row items-center gap-1">
      <FormFieldLabel>Alert</FormFieldLabel>
      <SelectInput
        name="isAlert"
        size="1"
        options={statusOptions}
        onValueChange={(value) => form.setValue('isAlert', value)}
        buttonClassName="h-6 w-[101px]"
      />
    </FormFieldContainer>
  )
}

export { AlertSelect }
