import { Flex } from '@radix-ui/themes'
import { BlockLabel } from '@/components'
import { OtherBlock, TransportationBlock } from './blocks'

const PostTreatmentTransportation = () => {
  return (
    <Flex direction="column" gap="1">
      <Flex direction="row" gap="1">
        <BlockLabel required className="text-2 font-[600px]">
          Post Treatment Transportation
        </BlockLabel>
        <TransportationBlock />
      </Flex>
      <OtherBlock />
    </Flex>
  )
}

export { PostTreatmentTransportation }
