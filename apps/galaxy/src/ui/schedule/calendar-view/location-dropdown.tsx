import { FormFieldLabel, SelectInput } from '@/components'
import { useStore } from '../store'
import { FormFieldContainer } from '../shared'

const LocationDropdown = () => {
  const clinicOptions = useStore((state) => state.clinics)

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <SelectInput
        field="location"
        placeholder="Select"
        options={clinicOptions}
        buttonClassName='flex-1 h-6'
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
