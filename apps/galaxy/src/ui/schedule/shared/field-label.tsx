import { PropsWithChildren } from 'react'
import { FormFieldLabel } from '@/components'
import { cn } from '@/utils'

const FieldLabel = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  return (
    <FormFieldLabel className={cn('h-6', className)}>{children}</FormFieldLabel>
  )
}

export { FieldLabel }
