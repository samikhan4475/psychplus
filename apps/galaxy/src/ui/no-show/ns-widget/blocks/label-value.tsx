import { ReactNode } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface LabelAndValueProps {
  label?: string
  value?: string | ReactNode
  className?: string
  flexDirection?: string
  detailsClassName?: string
  allowEmptyValue?: boolean
}

enum FlexDirection {
  row = 'row',
  column = 'column',
}
export const QuestionnaireLabelAndValue = ({
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
      width="100%"
      wrap="wrap"
      className={className}
    >
      {label && (
        <Text className=" text-1 font-bold">
          {label}

          <Text
            className={cn(
              ' pl-1 text-1',
              {
                'italic text-gray-9': !value,
              },
              detailsClassName,
            )}
            weight="regular"
          >
            {value}
          </Text>
        </Text>
      )}
    </Flex>
  )
}
