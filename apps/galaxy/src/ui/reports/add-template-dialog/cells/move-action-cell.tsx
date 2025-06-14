import { Flex } from '@radix-ui/themes'
import { CircleArrowDownIcon, CircleArrowUp } from 'lucide-react'
import { cn } from '@/utils'

interface MoveActionCellProps {
  index: number
  move: (from: number, to: number) => void
  totalFields: number
}

const MoveActionCell = ({ index, move, totalFields }: MoveActionCellProps) => (
  <Flex>
    <CircleArrowUp
      className={cn(
        'h-[16px] w-[16px] cursor-pointer',
        index ? 'text-pp-icon-sub' : 'text-pp-gray-2',
      )}
      onClick={() => index > 0 && move(index, index - 1)}
    />
    <CircleArrowDownIcon
      className={cn(
        'h-[16px] w-[16px] cursor-pointer',
        index < totalFields - 1 ? 'text-pp-icon-sub' : 'text-pp-gray-2',
      )}
      onClick={() => index < totalFields - 1 && move(index, index + 1)}
    />
  </Flex>
)

export { MoveActionCell }
