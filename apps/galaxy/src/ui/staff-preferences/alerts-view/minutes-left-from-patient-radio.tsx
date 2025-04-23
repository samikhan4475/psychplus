import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

const field = 'minutesLeftFromPatientSchedule'

const MinutesLeftFromPatientRadio = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  const { watch, setValue } = useFormContext<SchemaType>()
  const { defaultValue, options } = useOptionsAndDefaults({
    optionKey: 'MinutesLeftFromPatientScheduleOptions',
    valueKey: 'MinutesLeftFromPatientScheduleValue',
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

export { MinutesLeftFromPatientRadio }
