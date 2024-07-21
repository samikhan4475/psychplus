import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'
import { cn } from '../cn'

interface FormContainerProps<T extends FieldValues> {
  form: UseFormReturn<T>
  className?: string
  formClassName?: string
  onSubmit: SubmitHandler<T>
}

const FormContainer = <T extends FieldValues>({
  form,
  onSubmit,
  className,
  formClassName,
  children,
}: React.PropsWithChildren<FormContainerProps<T>>) => {
  return (
    <FormProvider {...form}>
      <form className={cn(formClassName)} onSubmit={form.handleSubmit(onSubmit)}>
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
