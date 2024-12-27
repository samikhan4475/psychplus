import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'

const BillType = () => {
  return (
    <Flex direction="column" gap="1">
      <BlockLabel required>Bill Type</BlockLabel>
      <CodesetSelect
        name="labBillingType"
        size="1"
        className="h-7 w-[240px]"
        codeset={CODESETS.LabBillingType}
      />
      <FormFieldError name="labBillingType" />
    </Flex>
  )
}

export { BillType }
