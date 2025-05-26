import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldContainer, FormFieldLabel } from '@/components'
import { ClaimUpdateSchemaType } from '../schema'

const CliaNumber = () => {
  const form = useFormContext<ClaimUpdateSchemaType>()

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel>CLIA #</FormFieldLabel>
      <TextField.Root
        size="1"
        {...form.register('clinicalLaboratoryImprovementAmendmentsNumber')}
      />
    </FormFieldContainer>
  )
}

export { CliaNumber }
