'use client'

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
}: React.PropsWithChildren<FormContainerProps<T>>) => (
  <FormProvider {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="flex flex-1 flex-col"
    >
      <fieldset
        disabled={form.formState.isSubmitting}
        className="flex flex-1 flex-col"
      >
        {children}
      </fieldset>
    </form>
  </FormProvider>
)

export { FormContainer }
