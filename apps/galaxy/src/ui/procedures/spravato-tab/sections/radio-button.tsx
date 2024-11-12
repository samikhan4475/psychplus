import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { YesNoSelect } from '@/components'

interface RadioButtonProps {
  field: string
  label: string
  message: string
  setAlertMessage: (value: { open: boolean; message: string }) => void
}

const RadioButton = ({
  field,
  label,
  message,
  setAlertMessage,
}: RadioButtonProps) => {
  const form = useFormContext()
  const formField = form.watch(field)

  useEffect(() => {
    if (formField === 'yes') setAlertMessage({ open: true, message })
  }, [formField])

  return <YesNoSelect isNoFirst field={field} label={label} required />
}

export { RadioButton }
