import { FormFieldLabel, SelectInput } from '@/components'
import { FormFieldContainer } from '../shared'
import { useDropdownContext } from '../context'

const LocationDropdown = () => {
  const { clinics } = useDropdownContext()

  return (
    <FormFieldContainer>
      <FormFieldLabel className="text-[12px]">Location</FormFieldLabel>
      <SelectInput
        field="location"
        placeholder="Select"
        options={clinics}
        buttonClassName='flex-1 h-6'
        className="h-full flex-1"
      />
    </FormFieldContainer>
  )
}

export { LocationDropdown }
