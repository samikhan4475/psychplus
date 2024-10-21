import { FormFieldContainer, FormFieldLabel, TimeInput } from '@/components'

interface TimeInputEctProps {
  name: string;
  label: string;
}

const TimeInputFieldECT = ({ name, label}: TimeInputEctProps) => {
  return (
    <FormFieldContainer className="flex flex-row items-center gap-1">
      <FormFieldLabel className='text-[12px]' required>{label}</FormFieldLabel>
      <TimeInput field={name} dateInputClass='h-5'/>
    </FormFieldContainer>
  )
}

export { TimeInputFieldECT }
