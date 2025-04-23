import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const field = 'allowDoubleBookingUnconfirmedTimeDependentVisits'

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
      field={field}
      defaultValue={watch(field) ?? defaultValue}
      onValueChange={(val) => setValue(field, val)}
      options={options}
      disabled={!isAdminView}
    />
  )
}

export { AllowDoubleBookingTimeDependentRadio }
