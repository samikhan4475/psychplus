import { ReactNode } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface LabelAndValueProps {
  label?: string
  value?: string | ReactNode
  className?: string
}
const LabelAndValue = ({ label, value, className }: LabelAndValueProps) => {
  if (!value) return null
  return (
    <Flex gap="1" width="100%" wrap="wrap" className={className}>
      {label && (
        <Text className="whitespace-nowrap text-1 font-medium">{label}</Text>
      )}
      <Text
        className={cn('text-1', {
          'italic text-gray-9': !value,
        })}
        weight="regular"
      >
        {value}
      </Text>
    </Flex>
  )
}

export { LabelAndValue }
