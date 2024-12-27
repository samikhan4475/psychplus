import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, YesNoSelect } from '@/components'

const LabRadioOptions = ({
  field,
  title,
}: {
  field: string
  title: string
}) => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel required>{title}</BlockLabel>
      <YesNoSelect
        field={field}
        className="h-7 rounded-1 border border-gray-7"
      />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { LabRadioOptions }
