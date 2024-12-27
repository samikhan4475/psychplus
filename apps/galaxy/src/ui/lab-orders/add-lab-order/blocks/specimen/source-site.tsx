import { Flex } from '@radix-ui/themes'
import { BlockLabel, TextInput } from '@/components'

const SourceSiteDropDown = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].sourceSite`

  return (
    <Flex direction="column" gap="1" width="33%">
      <BlockLabel>Source Site</BlockLabel>
      <TextInput
        field={field}
        className="h-7 w-[100%]"
        placeHolder="Search"
        maxLength={50}
      />
    </Flex>
  )
}

export { SourceSiteDropDown }
