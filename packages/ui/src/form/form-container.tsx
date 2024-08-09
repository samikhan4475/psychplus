import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type SubmitErrorHandler,
  type UseFormReturn,
} from 'react-hook-form'
import { cn } from '../cn'
import React from 'react'

interface FormContainerProps<T extends FieldValues> {
  form: UseFormReturn<T>
  className?: string
  formClassName?: string
  onSubmit: SubmitHandler<T>
  onError?: SubmitErrorHandler<T>
  onKeyDown?: (e: React.KeyboardEvent<HTMLFormElement>) => void
}

const FormContainer = <T extends FieldValues>({
  form,
  onSubmit,
  className,
  onError,
  onKeyDown,
  formClassName,
  children,
}: React.PropsWithChildren<FormContainerProps<T>>) => {
  return (
    <FormProvider {...form}>
      <form className={cn(formClassName)} onSubmit={form.handleSubmit(onSubmit, onError)} onKeyDown={onKeyDown}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className={cn("flex flex-col gap-3", className)}
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}

export { FormContainer }
