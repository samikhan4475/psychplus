import { PropsWithChildren } from 'react'
import { Button } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  mode: 'primary' | 'ghost' | 'secondary'
}

const classes = {
  primary: 'bg-[#151B4A] gap-x-1 h-6 px-2 text-[12px]',
  secondary: 'bg-[#194595] gap-x-1 h-6 px-2 text-[12px]',
  ghost: 'text-[#000000] [box-shadow:inset_0_0_0.4px_1px_#DDDDE3] gap-x-1 h-6 px-2 text-[12px]',
}
const ActionButton = ({
  children,
  variant,
  type,
  mode,
  className,
  onClick,
}: PropsWithChildren<ActionButtonProps>) => {
  return (
    <Button
      variant={variant}
      type={type}
      className={cn(classes[mode], className)}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

export { ActionButton }
