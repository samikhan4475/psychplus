import { Flex, Text } from '@radix-ui/themes'
import { GroupSelectSection } from '@/components-v2/group-select-section'

const BLOCK_ID = 'traumaHx'

const BLOCK_TITLE = 'Trauma History'

const TRAUMA_HX_BLOCK_OPTIONS = [
  {
    label: 'Physical',
    value: 'physical',
  },
  {
    label: 'Emotional',
    value: 'emotional',
  },
  {
    label: 'Sexual',
    value: 'sexual',
  },
]

const TraumaHxBlock = () => {
  return (
    <Flex gap="2" direction="column" className="my-1 w-full">
      <Text weight="medium" className="line-clamp-1 text-[16px]">
        {BLOCK_TITLE}
      </Text>
      <GroupSelectSection field={BLOCK_ID} options={TRAUMA_HX_BLOCK_OPTIONS} />
    </Flex>
  )
}

export { TraumaHxBlock, TRAUMA_HX_BLOCK_OPTIONS }
