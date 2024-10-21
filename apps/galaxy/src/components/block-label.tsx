import { Text, Tooltip } from '@radix-ui/themes'
import { cn } from '@/utils'

interface BlockLabelProps {
  name?: string
  orientation?: 'horizontal' | 'vertical'
  className?: string
  isTooltip?: boolean
  required?:boolean
}

const BlockLabel = ({
  name,
  orientation = 'horizontal',
  className,
  children,
  isTooltip = false,
  required = false,
}: React.PropsWithChildren<BlockLabelProps>) => {
  const labelContent = (
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
      {required ? (
        <Text className="ml-[2px] text-[12px] text-red-9">*</Text>
      ) : null}
    </Text>
  )

  return isTooltip ? (
    <Tooltip content="Head, Eyes, Ears, Nose, Throat">{labelContent}</Tooltip>
  ) : (
    labelContent
  )
}

export { BlockLabel }
