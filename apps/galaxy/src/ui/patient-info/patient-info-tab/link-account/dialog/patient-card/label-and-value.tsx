import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface LabelAndValueProps {
  label: string
  value?: string | number
}

const LabelAndValue = ({ label, value }: LabelAndValueProps) => {
  return (
    <Flex gap="1" className="whitespace-nowrap">
      <Text className="text-[11.5px] font-[600]">{label}</Text>
      <Text
        className={cn('text-[11.5px]', {
          'italic text-gray-9': !value,
        })}
      >
        {value ?? 'N/A'}
      </Text>
    </Flex>
  )
}

export { LabelAndValue }
