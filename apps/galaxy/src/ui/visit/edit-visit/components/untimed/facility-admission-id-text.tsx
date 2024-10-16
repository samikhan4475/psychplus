import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { SchemaType } from '../../schema'

const FacilityAdmissionText = () => {
  const form = useFormContext<SchemaType>()

  return (
    <FormFieldContainer className="flex-1 gap-[3px]">
      <FormFieldLabel required>Facility Admission ID</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('facilityAdmissionId')}
        disabled
        className="h-6 w-full"
      />
    </FormFieldContainer>
  )
}

export { FacilityAdmissionText }
