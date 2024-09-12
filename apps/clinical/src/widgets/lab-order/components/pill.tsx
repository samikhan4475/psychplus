import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { Tooltip } from '@psychplus/ui/tooltip'
import { TestCompProps } from '../types'

const Pill = ({ text, onToggle, checked }: TestCompProps) => {
  if (!text) return null
  let displayText = null
  if (text) {
    if (text.length < 9) {
      displayText = text
    } else {
      displayText = text.slice(0, 9) + '...'
    }
  }
  return (
    <Flex
      onClick={onToggle}
      m="1"
      align="center"
      className={cn(
        'ml-1 h-[20px] max-w-[95px] min-w-[95px] cursor-pointer gap-2 overflow-hidden rounded-6 p-[2px_8px_2px_8px]',
        {
          'bg-[#D9E2FC]': checked,
          'border border-[#B9BBC6]': !checked,
        },
      )}
    >
      <Tooltip
        content={text || ''}
        delayDuration={250}
        className="max-w-[200px]"
      >
        <Text
          size="1"
          weight="regular"
          className="block overflow-hidden whitespace-nowrap text-[#000000CC]"
        >
          {displayText}
        </Text>
      </Tooltip>
    </Flex>
  )
}

export { Pill }
