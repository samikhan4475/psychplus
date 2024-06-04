'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'

interface EditableFieldValueProps {
  textClassName?: string
}

const EditableFieldValue = ({
  children,
  textClassName,
}: React.PropsWithChildren<EditableFieldValueProps>) => (
  <Flex align="start" className="group cursor-pointer">
    <Text
      weight="medium"
      className={cn('group-hover:text-accent-12', textClassName)}
    >
      {children}
    </Text>
    <Text className="text-[#194595] underline" size="2">
      Update
    </Text>
  </Flex>
)

export { EditableFieldValue }
