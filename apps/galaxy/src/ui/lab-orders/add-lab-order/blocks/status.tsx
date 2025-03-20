import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'

const Status = () => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel required>Status</BlockLabel>
      <CodesetSelect
        name="labOrderStatus"
        size="1"
        className="h-7 w-[180px]"
        codeset={CODESETS.LabOrderStatus}
        disabled
      />
      <FormFieldError name="labOrderStatus" />
    </Flex>
  )
}

export { Status }
