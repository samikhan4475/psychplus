import { cn } from '@/utils';
import { Flex } from '@radix-ui/themes';
import { CircleArrowDownIcon, CircleArrowUp } from 'lucide-react';

interface MoveActionCellProps {
  index: number;
  move: (from: number, to: number) => void;
  totalFields: number;
}

const MoveActionCell = ({ index, move, totalFields }: MoveActionCellProps) => (
  <Flex>
    <CircleArrowUp
      className={cn(
        'cursor-pointer w-[16px] h-[16px]',
        index ? 'text-pp-icon-sub' : 'text-pp-gray-2'
      )}
      onClick={() => index > 0 && move(index, index - 1)}
    />
    <CircleArrowDownIcon
      className="cursor-pointer text-pp-icon-sub w-[16px] h-[16px]"
      onClick={() => index < totalFields - 1 && move(index, index + 1)}
    />
  </Flex>
);

export { MoveActionCell };
