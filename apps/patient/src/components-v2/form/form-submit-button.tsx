'use client'

import { Button } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'

const FormSubmitButton = ({
  children,
  disabled,
  ...rest
}: React.ComponentProps<typeof Button>) => {
  const form = useFormContext()

  return (
    <Button
      type="submit"
      highContrast
      disabled={disabled || form.formState.isSubmitting}
      {...rest}
    >
      {children}
    </Button>
  )
}

export { FormSubmitButton }
