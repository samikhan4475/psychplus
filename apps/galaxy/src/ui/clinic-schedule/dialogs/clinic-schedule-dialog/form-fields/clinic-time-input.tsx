import { Flex } from '@radix-ui/themes'
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
  TimeInput,
} from '@/components'

const ClinicTimeInput = () => {
  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel className="text-[12px]">Timing</FormFieldLabel>
      <Flex gap="2" flexGrow="1">
        <TimeInput field="timeStart" dateInputClass="h-6 flex-1" />
        <TimeInput field="timeEnd" dateInputClass="h-6 flex-1" />
      </Flex>
      <FormFieldError name="timeStart" />
      <FormFieldError name="timeEnd" />
    </FormFieldContainer>
  )
}

export { ClinicTimeInput }
