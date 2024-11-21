import { Flex, Text } from '@radix-ui/themes'
import { TextCell } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { ViewButton } from '@/ui/questionnaires/shared/view/view-button'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'

interface ScoreCellProps {
  value: string
  data: QuickNoteSectionItem[]
  quickNoteSectionName: QuickNoteSectionName
}

const ScoreCell = ({ value, data, quickNoteSectionName }: ScoreCellProps) => {
  return (
    <TextCell>
      <Flex align="center" gap="2">
        <Text className="border-pp-sky-blue-5 bg-pp-cyan-1 text-pp-cyan-10 w-[40px] rounded-5 border text-center">
          {value}
        </Text>
        <ViewButton
          justIcon={true}
          data={data}
          quickNoteSectionName={quickNoteSectionName}
        />
      </Flex>
    </TextCell>
  )
}

export { ScoreCell }
