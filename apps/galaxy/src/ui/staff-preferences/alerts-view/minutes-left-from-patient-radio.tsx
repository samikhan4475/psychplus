import { useFormContext } from 'react-hook-form'
import { RadioGroup } from '@/components'
import { useOptionsAndDefaults } from '../hook'
import { SchemaType } from '../schema'

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
      field="minutesLeftFromPatientSchedule"
      defaultValue={watch('minutesLeftFromPatientSchedule') ?? defaultValue}
      onValueChange={(val) => setValue('minutesLeftFromPatientSchedule', val)}
      options={options}
      disabled={!isAdminView}
    />
  )
}

export { MinutesLeftFromPatientRadio }
