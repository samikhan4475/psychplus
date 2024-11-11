import { Time } from '@internationalized/date'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TimeInput,
} from '@/components'

interface TimeInputEctProps {
  name: string
  label: string
}

const TimeInputFieldECT = ({ name, label }: TimeInputEctProps) => {
  const form = useFormContext()
  const value = form.watch(name)

  return (
    <FormFieldContainer className="flex flex-row items-center gap-1">
      <FormFieldLabel className="text-[12px]" required>
        {label}
      </FormFieldLabel>
      <TimeInput
        field={name}
        hourCycle={24}
        onChange={(value) =>
          form.setValue(name, `${value.hour}:${value.minute}`)
        }
        value={
          {
            hour: value.split(':')[0],
            minute: value.split(':')[1],
            millisecond: 0,
            second: 0,
          } as Time
        }
      />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}

export { TimeInputFieldECT }
