import { Text } from '@radix-ui/themes'
import { cn } from '@/utils'

interface BlockLabelProps {
  name?: string
  orientation?: 'horizontal' | 'vertical'
  className?: string
}

const BlockLabel = ({
  name,
  orientation = 'horizontal',
  className,
  children,
}: React.PropsWithChildren<BlockLabelProps>) => {
  return (
    <Text
      size="1"
      weight="medium"
      wrap="nowrap"
      as="label"
      htmlFor={name}
      className={cn('flex items-center', className, {
        'min-h-[var(--chip-height)]': orientation === 'horizontal',
      })}
    >
      {children}
    </Text>
  )
}

export { BlockLabel }
