import { FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'
import { FormFieldContainer } from './form-field-container'

const LocationDropdown = () => {
  const clinicOptions = useStore((state) => state.clinics)

  return (
    <FormFieldContainer className="h-full flex-1">
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <SelectInput
        field="location"
        placeholder="Select"
        options={clinicOptions}
        buttonClassName="w-full h-6"
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
