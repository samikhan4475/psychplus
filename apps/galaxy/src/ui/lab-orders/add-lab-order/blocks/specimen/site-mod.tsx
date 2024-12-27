import { Flex } from '@radix-ui/themes'
import { BlockLabel, TextInput } from '@/components'

const SiteModDropDown = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].sourceSiteModifier`

  return (
    <Flex direction="column" gap="1" width="33%">
      <BlockLabel>Site Mode</BlockLabel>
      <TextInput
        field={field}
        className="h-7 w-[100%]"
        placeHolder="Site Mode"
        maxLength={50}
      />
    </Flex>
  )
}

export { SiteModDropDown }
