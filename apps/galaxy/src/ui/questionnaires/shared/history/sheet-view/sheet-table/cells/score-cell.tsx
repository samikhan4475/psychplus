import { Flex, Text } from '@radix-ui/themes'
import { TextCell } from '@/components'
import { EyeIcon } from '@/components/icons/eye-icon'

interface ScoreCellProps {
  value: string
}

const ScoreCell = ({ value }: ScoreCellProps) => {
  return (
    <TextCell>
      <Flex align="center" gap="2">
        <Text className="border-pp-sky-blue-5 bg-pp-cyan-1 text-pp-cyan-10 w-[40px] rounded-5 border text-center">
          {value}
        </Text>
        <EyeIcon />
      </Flex>
    </TextCell>
  )
}

export { ScoreCell }
