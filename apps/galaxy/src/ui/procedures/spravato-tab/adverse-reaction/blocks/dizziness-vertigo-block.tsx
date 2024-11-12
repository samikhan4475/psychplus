import { YesNoSelect } from '@/components'

const DizzinessAndVertigo = () => {
  return (
    <YesNoSelect
      isNoFirst
      label="Dizziness/Vertigo"
      field="dizzinessAndVertigo"
      required
    />
  )
}

export { DizzinessAndVertigo }
