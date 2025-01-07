import { Flex, Text } from '@radix-ui/themes'
import { TextCell } from '@/components'
import { EyeIcon } from '@/components/icons'
import { QuickNoteHistory } from '@/types'
import { useStore } from '@/ui/questionnaires/shared/history/store'

interface ScoreCellProps {
  value: string
  data: QuickNoteHistory[]
  row: QuickNoteHistory
}

const ScoreCell = ({ value, data, row }: ScoreCellProps) => {
  const { addTab } = useStore((state) => ({
    addTab: state.addTab,
  }))

  return (
    <TextCell>
      <Flex align="center" gap="2">
        <Text className="border-pp-sky-blue-5 bg-pp-cyan-1 text-pp-cyan-10 w-[40px] rounded-5 border text-center">
          {value}
        </Text>
        <EyeIcon
          height="14"
          width="14"
          onClick={() => addTab(data, row)}
          className="cursor-pointer"
        />
      </Flex>
    </TextCell>
  )
}

export { ScoreCell }
