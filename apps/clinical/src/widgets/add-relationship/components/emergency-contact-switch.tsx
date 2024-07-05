import { useFormContext } from 'react-hook-form'
import { FormSwitch } from '@psychplus/form'

const EmergencyContactSwitch = () => {
  const { register } = useFormContext()

  return <FormSwitch {...register('isEmergencyContact')} color="grass" />
}

export { EmergencyContactSwitch }
