import { Flex } from '@radix-ui/themes'
import { BlockLabel, FormFieldError, NumberInput } from '@/components'

const VolumeInput = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].volume`

  return (
    <Flex direction="column" gap="1" width="33%">
      <BlockLabel required>Volume</BlockLabel>
      <NumberInput field={field} className="h-7 w-[100%]" format="#####" />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { VolumeInput }
