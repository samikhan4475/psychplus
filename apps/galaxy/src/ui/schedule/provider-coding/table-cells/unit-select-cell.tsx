import { useMemo } from 'react'
import { PropsWithRow, SelectCell } from '@/components'
import { useStore } from '../store'
import { MergedRecord } from '../types'

const UnitSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<MergedRecord>) => {
  const data = useStore((state) => state.unitsandgroupslist)
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
    <SelectCell value={appointment.unitResource?.id} options={unitOptions} />
  )
}

export { UnitSelectCell }
