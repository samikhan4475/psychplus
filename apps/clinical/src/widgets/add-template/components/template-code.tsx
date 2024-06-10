import { useFormContext } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'

const TemplateCode = () => {
  const { register } = useFormContext()

  return (
    <FormTextInput
      label="Code"
      required
      {...register('shortName')}
      className="h-7 text-[12px]"
      placeholder="Add code"
    />
  )
}

export { TemplateCode }
