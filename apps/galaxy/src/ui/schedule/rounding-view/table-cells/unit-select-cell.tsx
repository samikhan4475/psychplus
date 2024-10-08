import { useMemo } from 'react'
import { PropsWithRow, SelectCell } from '@/components'
import { useStore } from '../store'
import { Appointment } from '@/types'

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

  return <SelectCell options={unitOptions} />
}

export { UnitSelectCell }
