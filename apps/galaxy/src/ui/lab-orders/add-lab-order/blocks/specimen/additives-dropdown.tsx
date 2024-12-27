import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect, FormFieldError } from '@/components'
import { CODESETS } from '@/constants'

const AdditivesDropDown = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].specimenAdditives`

  return (
    <Flex direction="column" gap="1" width="50%">
      <BlockLabel required>Additives</BlockLabel>
      <CodesetSelect
        name={field}
        size="1"
        className="h-7 w-[100%]"
        codeset={CODESETS.SpecimentAdditive}
      />
      <FormFieldError name={field} />
    </Flex>
  )
}

export { AdditivesDropDown }
