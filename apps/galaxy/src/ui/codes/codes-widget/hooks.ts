import { useFormContext } from 'react-hook-form'
import { CodesWidgetSchemaType } from './codes-widget-schema'

const useFormValues = () => {
  const form = useFormContext<CodesWidgetSchemaType>()
  const formValues = form.getValues()

  const isCptCodeExist = (field: keyof CodesWidgetSchemaType, code: string) => {
    const values = formValues?.[field] ?? []
    return values?.includes(code) ?? false
  }

  return {
    isCptCodeExist,
  }
}

export { useFormValues }
