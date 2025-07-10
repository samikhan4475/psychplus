'use client'

import { cn } from '@psychplus-v2/utils'
import { Button } from '@radix-ui/themes'

interface TriggerButtonProps {
  title: string
  onClick?: () => void
  className?: string
}

const TriggerButton = ({ title, onClick, className }: TriggerButtonProps) => (
  <Button
    variant="outline"
    type="button"
    highContrast
    onClick={onClick}
    size="2"
    className={cn(className)}
  >
    + {title}
  </Button>
)

export { TriggerButton }
