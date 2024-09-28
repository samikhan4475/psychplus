import { TextField } from '@radix-ui/themes'
import { FormFieldContainer, FormFieldLabel } from '@/components'

const PatientText = () => {
  return (
    <FormFieldContainer>
      <FormFieldLabel required>Patient Name</FormFieldLabel>
      <TextField.Root
        size="1"
        value={'Tarik Karim Tai 35 yo M | 10/11/1989 | 4590002 | P Active'}
        disabled
        className="h-[21px]"
      />
    </FormFieldContainer>
  )
}

export { PatientText }
