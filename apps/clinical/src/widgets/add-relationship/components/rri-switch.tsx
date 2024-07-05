import { useFormContext } from 'react-hook-form'
import { FormSwitch } from '@psychplus/form'

const RriSwitch = () => {
  const { register } = useFormContext()

  return (
    <FormSwitch {...register('isAllowedToReleaseInformation')} color="grass" />
  )
}

export { RriSwitch }
