import { Flex } from '@radix-ui/themes'
import { BlockLabel, TextInput } from '@/components'

const MeasurementUnit = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].measureUnit`

  return (
    <Flex direction="column" gap="1" width="16%">
      <BlockLabel>Measurement Unit</BlockLabel>
      <TextInput
        field={field}
        className="h-7 w-[100%]"
        placeHolder="Measurement Unit"
        maxLength={20}
      />
    </Flex>
  )
}

export { MeasurementUnit }
