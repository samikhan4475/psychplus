import { Path, useFormContext } from 'react-hook-form'

function usePaymentTypeField<T extends object>(fieldName: Path<T>) {
  const form = useFormContext<T>()

  const values = form.watch(fieldName) as string[]

  const isChecked = (value: string) => {
    if (!values || !Array.isArray(values)) return false
    return values.includes(value)
  }

  const shouldDisable = (value: string) => !isChecked(value)

  return { isChecked, shouldDisable, form, paymentTypeValues: values }
}

export { usePaymentTypeField }
