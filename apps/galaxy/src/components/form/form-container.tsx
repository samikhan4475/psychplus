'use client'

import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'
import { cn } from '@/utils'

interface FormContainerProps<T extends FieldValues> {
  className?: string
  form: UseFormReturn<T>
  formClassName?: string
  onSubmit: SubmitHandler<T>
}

const FormContainer = <T extends FieldValues>({
  form,
  className,
  formClassName,
  onSubmit,
  children,
}: React.PropsWithChildren<FormContainerProps<T>>) => (
  <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className={cn('flex flex-1 flex-col', formClassName)}
    >
      <fieldset
        disabled={form.formState.isSubmitting}
        className={cn('flex flex-1 flex-col', className)}
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
)

export { FormContainer }
