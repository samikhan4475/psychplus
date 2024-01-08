import {
  FormProvider,
  type FieldValues,
  type SubmitHandler,
  type UseFormReturn,
} from 'react-hook-form'

interface FormContainerProps<T extends FieldValues> {
  form: UseFormReturn<T>
  onSubmit: SubmitHandler<T>
}

const FormContainer = <T extends FieldValues>({
  form,
  onSubmit,
  children,
}: React.PropsWithChildren<FormContainerProps<T>>) => {
  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset
          disabled={form.formState.isSubmitting}
          className="flex flex-col gap-3"
        >
          {children}
        </fieldset>
      </form>
    </FormProvider>
  )
}

export { FormContainer }
