import { ReactNode } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

enum FlexDirection {
  row = 'row',
  column = 'column',
}

interface LabelAndValueProps {
  label?: string
  value?: string | ReactNode
  className?: string
  flexDirection?: string
  detailsClassName?: string
  allowEmptyValue?: boolean
}
const LabelAndValue = ({
  label,
  value,
  className,
  flexDirection = 'row',
  detailsClassName,
  allowEmptyValue = false,
}: LabelAndValueProps) => {
  if (!value && !allowEmptyValue) return null
  return (
    <Flex
      direction={flexDirection as FlexDirection}
      gap="1"
      width="100%"
      wrap="wrap"
      className={className}
    >
      {label && (
        <Text className="whitespace-nowrap text-1 font-medium">{label}</Text>
      )}
      <Text
        className={cn(
          'whitespace-pre-wrap break-words text-1',
          {
            'italic text-gray-9': !value,
          },
          detailsClassName,
        )}
        weight="regular"
      >
        {value}
      </Text>
    </Flex>
  )
}

export { LabelAndValue }
