import { useFormContext } from 'react-hook-form'
import { FormTextInput } from '@psychplus/form'
import { FORM_FIELD_CLASSES } from '../constants'
import { useEffect } from 'react'
import { useEditModeContext } from '../context'

const GuardianInfo = () => {
  const { watch, register } = useFormContext()
  const { editable } = useEditModeContext()

  useEffect(() => {
    register('guardian.name.firstName')
    register('guardian.name.lastName')
  },[register])

  return (
    watch('hasGuardian') && (
      <>
        <FormTextInput
          label="Guardian First Name"
          required
          disabled={!editable}
          {...register('guardian.name.firstName')}
          className={FORM_FIELD_CLASSES}
        />
        <FormTextInput
          label="Guardian Last Name"
          disabled={!editable}
          required
          {...register('guardian.name.lastName')}
          className={FORM_FIELD_CLASSES}
        />
      </>
    )
  )
}

export { GuardianInfo }