import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'

const StatusSelectFilter = () => {
  return (
    <Flex direction="column" className="flex-row items-center gap-1" >
      <BlockLabel>Status</BlockLabel>
      <CodesetSelect
        name="orderStatus"
        size="1"
        className="h-6 w-[144px]"
        codeset={CODESETS.LabOrderStatus}
      />
      <FormFieldError name="orderStatus" />
    </Flex>
  )
}

export { StatusSelectFilter }
