import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { cn } from '@/utils'

interface LabelAndValueProps {
  label: string
  value?: string | number
  showValueInsideTooltip?: boolean
}

const LabelAndValue = ({
  label,
  value,
  showValueInsideTooltip = false,
}: LabelAndValueProps) => {
  return (
    <Flex gap="1" className="whitespace-nowrap">
      <Text className="text-[11.5px] font-[600]">{label}</Text>
      {showValueInsideTooltip ? (
        <Tooltip content={value} className="z-10">
          <Text
            className={cn('max-w-28 text-pp-gray-1 truncate text-[11.5px]', {
              'italic text-gray-9': !value,
            })}
          >
            {value ?? 'N/A'}
          </Text>
        </Tooltip>
      ) : (
        <Text
          className={cn('text-pp-gray-1 text-[11.5px]', {
            'italic text-gray-9': !value,
          })}
        >
          {value ?? 'N/A'}
        </Text>
      )}
    </Flex>
  )
}

export { LabelAndValue }
