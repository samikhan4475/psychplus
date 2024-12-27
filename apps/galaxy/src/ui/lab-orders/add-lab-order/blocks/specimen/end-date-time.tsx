import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel, FormFieldError } from '@/components'

const EndDateTime = ({ index }: { index: number }) => {
  const form = useFormContext()
  const endDateField = `specimenList[${index}].EndDate`
  const endTimeField = `specimenList[${index}].EndTime`

  return (
    <Flex direction="column" gap="1" width="33%">
      <BlockLabel required>End Date & time</BlockLabel>
      <Flex direction="row" gap="1">
        <Flex direction="column" gap="1">
          <TextField.Root
            type="date"
            size="1"
            {...form.register(endDateField)}
            className="border-pp-gray-2 h-7 w-[117px] border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          />
          <FormFieldError name={endDateField} />
        </Flex>
        <Flex direction="column" gap="1">
          <TextField.Root
            type="time"
            size="1"
            {...form.register(endTimeField)}
            className="border-pp-gray-2 h-7 w-[117px] border border-solid !outline-none [box-shadow:none] [&__.rt-TextFieldInput]:!inline-block"
          />
          <FormFieldError name={endTimeField} />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { EndDateTime }
