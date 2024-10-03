import {
  CodesetSelect,
  FormFieldContainer,
  FormFieldError,
  FormFieldLabel,
} from '@/components'
import { CODESETS } from '@/constants'
import { cn } from '@/utils'
import { fieldName } from './utils'

interface UsStateSelectProps {
  required?: boolean
  prefix?: string
  className?: string
  labelClassName?: string
}
const UsStateSelect = ({
  prefix,
  required = true,
  className,
  labelClassName,
}: UsStateSelectProps) => {
  const name = fieldName('state', prefix)

  return (
    <FormFieldContainer className="flex-1">
      <FormFieldLabel
        className={cn('!text-1', labelClassName)}
        required={required}
      >
        State
      </FormFieldLabel>
      <CodesetSelect
        name={name}
        codeset={CODESETS.UsStates}
        size="1"
        className={className}
      />
      <FormFieldError name={name} />
    </FormFieldContainer>
  )
}

export { UsStateSelect }
