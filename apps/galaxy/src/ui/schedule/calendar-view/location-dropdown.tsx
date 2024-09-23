import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'

const LocationDropdown = () => {
  const clinicOptions = useStore((state) => state.clinics)

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <SelectInput
        field="location"
        placeholder="Select"
        options={clinicOptions}
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
