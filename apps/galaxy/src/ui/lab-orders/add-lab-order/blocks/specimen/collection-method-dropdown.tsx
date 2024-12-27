import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'

const CollectionMethodDropDown = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].collectionMethod`

  return (
    <Flex direction="column" gap="1" width="50%">
      <BlockLabel required>Collection Method</BlockLabel>
      <CodesetSelect
        name={field}
        size="1"
        className="h-7 w-[100%]"
        codeset={CODESETS.SpecimenCollectionMethod}
      />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { CollectionMethodDropDown }
