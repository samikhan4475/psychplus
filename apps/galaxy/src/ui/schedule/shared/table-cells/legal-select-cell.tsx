import { Flex, Select } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'

const LegalSelectCell = () => {
  const codes = useCodesetCodes(CODESETS.LegalStatus)
  const items = codes.map((code) => (
    <Select.Item key={code.value} value={code.value}>
      {code.display}
    </Select.Item>
  ))
  return (
    <Flex p="1" width="100%">
      <Select.Root size="1">
        <Select.Trigger placeholder="select" className="w-full text-gray-12" />
        <Select.Content position="popper" highContrast>
          {items}
        </Select.Content>
      </Select.Root>
    </Flex>
  )
}

export { LegalSelectCell }
