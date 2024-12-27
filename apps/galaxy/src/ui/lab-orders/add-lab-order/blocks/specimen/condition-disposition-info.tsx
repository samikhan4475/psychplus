import { Flex } from '@radix-ui/themes'
import { BlockLabel, TextInput } from '@/components'

const ConditionDispositionInfo = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].containerCondition`

  return (
    <Flex direction="column" gap="1" width="42%">
      <BlockLabel>Condition & Disposition Info</BlockLabel>
      <TextInput
        field={field}
        className="h-7 w-[100%]"
        placeHolder="Search"
        maxLength={50}
      />
    </Flex>
  )
}

export { ConditionDispositionInfo }
