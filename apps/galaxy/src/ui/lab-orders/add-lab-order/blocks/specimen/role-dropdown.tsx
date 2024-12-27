import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'

const RoleDropDown = ({ index }: { index: number }) => {
  const field = `specimenList[${index}].role`

  return (
    <Flex direction="column" gap="1" width="33%">
      <BlockLabel>Role</BlockLabel>
      <CodesetSelect
        name={field}
        size="1"
        className="h-7 w-[100%]"
        codeset={CODESETS.SpecimenRole}
      />
    </Flex>
  )
}

export { RoleDropDown }
