import { type FieldValues, type UseFormReturn } from 'react-hook-form'
import { Button } from '@psychplus/ui/button'
import { cn } from '../cn'

interface FormSubmitButtonProps<T extends FieldValues> {
  form: UseFormReturn<T>
  className?: string
}
const FormSubmitButton = <T extends FieldValues>({
  form,
  className,
  children,
}: React.PropsWithChildren<FormSubmitButtonProps<T>>) => {
  return (
    <Button type="submit" disabled={form.formState.isSubmitting} className={cn(className)}>
      {children}
    </Button>
  )
}

export { FormSubmitButton }
