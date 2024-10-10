import { useMemo } from 'react'
import { PropsWithRow, SelectCell } from '@/components'
import { Appointment } from '@/types'
import { useStore } from '../store'

const UnitSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const data = useStore((state) => state.data)
  const unitOptions = useMemo(() => {
    const units =
      data.serviceUnits.filter(
        (unit) => unit.serviceId === appointment.serviceId,
      ) ?? []
    return units.map((unit) => ({
      label: unit.unit,
      value: unit.id,
    }))
  }, [data])

  return (
    <SelectCell
      value={appointment.unitResource?.id}
      options={unitOptions}
      disabled={appointment.isServiceTimeDependent}
    />
  )
}

export { UnitSelectCell }
