import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormFieldError, FormFieldLabel } from '@/components'
import { NotesFilterSchemaType } from './left-panel-filters'

const PatientNameInput = ({ isDisabled = false }: { isDisabled?: boolean }) => {
  const form = useFormContext<NotesFilterSchemaType>()
  return (
    <Flex direction="column" className={'w-full gap-0.5'}>
      <FormFieldLabel className="text-1 leading-[16px]">
        Patient Name
      </FormFieldLabel>
      <TextField.Root
        size="1"
        placeholder="Search Name"
        {...form.register('patientName')}
        disabled={isDisabled}
      />
      <FormFieldError name="patientName" />
    </Flex>
  )
}

export { PatientNameInput }
