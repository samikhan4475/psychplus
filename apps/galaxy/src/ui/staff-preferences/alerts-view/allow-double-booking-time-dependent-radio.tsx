import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const AllowDoubleBookingTimeDependentRadio = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'AllowDoubleBookingUnconfirmedTimeDependentVisitsOptions',
    valueKey: 'AllowDoubleBookingUnconfirmedTimeDependentVisitsValue',
  })
  return (
    <RadioGroup
      className="ml-2 border-none !bg-transparent"
      field="allowDoubleBookingUnconfirmedTimeDependentVisits"
      defaultValue={
        watch('allowDoubleBookingUnconfirmedTimeDependentVisits') ??
        defaultValue
      }
      onValueChange={(val) =>
        setValue('allowDoubleBookingUnconfirmedTimeDependentVisits', val)
      }
      options={options}
      disabled={!isAdminView}
    />
  )
}

export { AllowDoubleBookingTimeDependentRadio }
