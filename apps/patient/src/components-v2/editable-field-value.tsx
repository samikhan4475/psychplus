'use client'

import { cn } from '@psychplus-v2/utils'
import { Flex, Text } from '@radix-ui/themes'
import { PencilIcon } from './pencil-icon'

interface EditableFieldValueProps {
  textClassName?: string
}

const EditableFieldValue = ({
  children,
  textClassName,
}: React.PropsWithChildren<EditableFieldValueProps>) => (
  <Flex align="start" gap="1" className="group cursor-pointer">
    <Text
      weight="medium"
      className={cn('group-hover:text-accent-12', textClassName)}
    >
      {children}
    </Text>
    <PencilIcon />
  </Flex>
)

export { EditableFieldValue }
