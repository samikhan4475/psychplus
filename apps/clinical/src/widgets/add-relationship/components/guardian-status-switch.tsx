import { useFormContext } from 'react-hook-form'
import { FormSwitch } from '@psychplus/form'

const GuardianStatusSwitch = () => {
  const { register } = useFormContext()

  return <FormSwitch {...register('isGuardian')} color="grass" />
}

export { GuardianStatusSwitch }
