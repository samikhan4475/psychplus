import { useFormContext } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'

const TemplateTitle = () => {
  const { register } = useFormContext()

  return (
    <FormTextInput
      label="Add Title"
      required
      {...register('displayName')}
      className="h-7 text-[12px]"
      placeholder="Add Template Name"
    />
  )
}

export { TemplateTitle }
