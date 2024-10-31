import { TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'

interface TimeInputEctProps {
  name: string
  label: string
}

const TimeInputFieldECT = ({ name, label }: TimeInputEctProps) => {
  const form = useFormContext()
  return (
    <FormFieldContainer className="flex flex-row items-center gap-1">
      <FormFieldLabel className="text-[12px]" required>
        {label}
      </FormFieldLabel>
      <TextField.Root
        type="time"
        size="1"
        {...form.register(name)}
        color="gray"
        variant="surface"
        className="border-pp-gray-2 border border-solid [box-shadow:none]"
      />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}

export { TimeInputFieldECT }
