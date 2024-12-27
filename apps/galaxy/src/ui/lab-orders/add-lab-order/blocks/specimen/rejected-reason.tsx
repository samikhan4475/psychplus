import { Flex } from '@radix-ui/themes'
import { BlockLabel, TextInput } from '@/components'

const RejectedReason = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].rejectReason`

  return (
    <Flex direction="column" gap="1" width="42%">
      <BlockLabel>Rejected Reason</BlockLabel>
      <TextInput
        field={field}
        className="h-7 w-[100%]"
        placeHolder="Rejected Reason"
        maxLength={50}
      />
    </Flex>
  )
}

export { RejectedReason }
