import { useFormContext } from 'react-hook-form'
import { FormSwitch } from '@psychplus/form'

const ReportPermissionToggle = () => {
  const { register } = useFormContext()

  return (
    <>
      Allow users to Run this Report
      <FormSwitch color="indigo" highContrast {...register('isAdhocAllowed')} />
    </>
  )
}

export { ReportPermissionToggle }
