import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'

const TypeDropDown = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].specimenType`

  return (
    <Flex direction="column" gap="1" width="50%">
      <BlockLabel required>Type</BlockLabel>
      <CodesetSelect
        name={field}
        size="1"
        className="h-7 w-[100%]"
        codeset={CODESETS.SpecimenType}
      />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { TypeDropDown }
