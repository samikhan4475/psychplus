import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'

const Status = () => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel>Status</BlockLabel>
      <CodesetSelect
        name="labOrderStatus"
        size="1"
        className="h-7 w-[144px]"
        codeset={CODESETS.LabOrderStatus}
      />
    </Flex>
  )
}

export { Status }
