import { Flex } from '@radix-ui/themes'
import { BlockLabel, CodesetSelect } from '@/components'
import { CODESETS } from '@/constants'

const CoilTypeUsed = () => {
  return (
    <Flex direction="row" gap="1" align="center">
      <BlockLabel required>Coil Type Used</BlockLabel>
      <CodesetSelect
        name="coilTypeUsed"
        codeset={CODESETS.TMSCoilType}
        size="1"
        className="max-w-40"
      />
    </Flex>
  )
}

export { CoilTypeUsed }
