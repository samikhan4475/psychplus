import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError } from '@/components'

const StartDateTime = ({ index }: { index: number }) => {
  const form = useFormContext()
  const startDateField = `specimenList[${index}].StartDate`
  const startTimeField = `specimenList[${index}].StartTime`

  return (
    <Flex direction="column" gap="1" width="33%">
      <BlockLabel required>Start Date & time</BlockLabel>
      <Flex direction="row" gap="1">
        <Flex direction="column" gap="1">
          <TextField.Root
            type="date"
            size="1"
            {...form.register(startDateField)}
            className="border-pp-gray-2 h-7 w-[117px] border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          />
          <FormFieldError name={startDateField} />
        </Flex>
        <Flex direction="column" gap="1">
          <TextField.Root
            type="time"
            size="1"
            {...form.register(startTimeField)}
            className="border-pp-gray-2 h-7 w-[117px] border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          />
          <FormFieldError name={startTimeField} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { StartDateTime }
