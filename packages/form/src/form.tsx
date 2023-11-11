import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

interface FormProps<T extends FieldValues>
  extends Omit<React.ComponentProps<'form'>, 'onSubmit'> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

const Form = <T extends FieldValues>({
  form,
  onSubmit,
  children,
  ...props
}: FormProps<T>) => (
  <FormProvider {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} {...props}>
      <fieldset
        disabled={form.formState.isSubmitting}
        className="flex flex-col"
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
)

export { Form }
