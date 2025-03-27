import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const ShowNeitherOnTherapyTimeDependentVisitsRadio = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'ShowNeitherOnTherapyTimeDependentVisitsOptions',
    valueKey: 'ShowNeitherOnTherapyTimeDependentVisitsValue',
  })
  return (
    <RadioGroup
      className="ml-2 border-none !bg-transparent"
      field="showNeitherOnTherapyTimeDependentVisits"
      defaultValue={
        watch('showNeitherOnTherapyTimeDependentVisits') ?? defaultValue
      }
      onValueChange={(val) =>
        setValue('showNeitherOnTherapyTimeDependentVisits', val)
      }
      options={options}
      disabled={!isAdminView}
    />
  )
}

export { ShowNeitherOnTherapyTimeDependentVisitsRadio }
