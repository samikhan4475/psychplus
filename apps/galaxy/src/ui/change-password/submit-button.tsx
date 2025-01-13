import { useFormContext } from 'react-hook-form'
import { FormSubmitButton } from '@/components'

const SubmitButton = () => {
  const form = useFormContext()

  return (
    <FormSubmitButton
      form={form}
      size="3"
      className="w-full"
      highContrast
      radius="full"
      loading={form.formState.isSubmitting}
    >
      Submit
    </FormSubmitButton>
  )
}

export { SubmitButton }
