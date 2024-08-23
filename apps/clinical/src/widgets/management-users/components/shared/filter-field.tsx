import { PropsWithChildren } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'

interface Props {
  label: string
  className?: string
}

const FilterField = ({
  label,
  className,
  children,
}: PropsWithChildren<Props>) => {
  return (
    <Flex align="center" className={cn('gap-x-1', className)}>
      <Text className="text-[12px] font-[510]">{label}</Text>
      {children}
    </Flex>
  )
}

export { FilterField }
