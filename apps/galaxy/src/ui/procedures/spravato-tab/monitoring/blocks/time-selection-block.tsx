import { Flex, TextField } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { BlockLabel } from '@/components'

const TimeSelectionBlock = ({
  label,
  field,
  required = false,
}: {
  label: string
  field: string
  required?: boolean
}) => {
  const form = useFormContext()

  return (
    <Flex direction="row" gap="1">
      <BlockLabel required>{label}</BlockLabel>
      <TextField.Root
        required={required}
        type="time"
        size="1"
        {...form.register(field)}
        color="gray"
        variant="surface"
        className="border-pp-gray-2 border border-solid [box-shadow:none]"
      />
    </Flex>
  )
}

export { TimeSelectionBlock }
