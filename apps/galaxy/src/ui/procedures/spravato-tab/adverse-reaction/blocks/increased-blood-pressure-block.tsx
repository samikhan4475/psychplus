import { YesNoSelect } from '@/components'

const IncreasedInBloodPressureBlock = () => {
  return (
    <YesNoSelect
      isNoFirst
      label="Increased Blood Pressure"
      field="increasedInBloodPressure"
      required
    />
  )
}

export { IncreasedInBloodPressureBlock }
