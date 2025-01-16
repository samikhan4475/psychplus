import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'

const useResetVerificationStatus = () => {
  const [isUpdateAllowed, setIsUpdateAllowed] = useState(false)
  const { watch, ...form } = useFormContext()

  const status = watch('verificationStatus')

  const { isValid, isDirty, isValidating } = form.formState

  useEffect(() => {
    if ((isValid || isDirty || isValidating) && !isUpdateAllowed) {
      setIsUpdateAllowed(true)
    }
  }, [isValid, isDirty, isValidating])

  useEffect(() => {
    const subscription = watch((_, { name }) => {
      if (name === 'verificationStatus') {
        return
      }

      if (isUpdateAllowed && status !== 'Pending') {
        form.setValue('verificationStatus', 'Pending')
        form.trigger('verificationStatus')
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, status, form, isUpdateAllowed])
}

export { useResetVerificationStatus }
