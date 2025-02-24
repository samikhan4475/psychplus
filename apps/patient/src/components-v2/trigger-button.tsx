'use client'

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
    className={className}
  >
    + {title}
  </Button>
)

export { TriggerButton }
