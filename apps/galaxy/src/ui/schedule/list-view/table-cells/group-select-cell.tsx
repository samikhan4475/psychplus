import { useMemo } from 'react'
import { PropsWithRow, SelectCell } from '@/components'
import { Appointment } from '@/types'
import { useStore } from '../store'

const GroupSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const data = useStore((state) => state.data)
  const groupOptions = useMemo(() => {
    const groups =
      data.serviceGroups.filter(
        (group) => group.serviceId === appointment.serviceId,
      ) ?? []
    return groups.map((group) => ({
      label: group.group,
      value: group.id,
    }))
  }, [data])

  return (
    <SelectCell
      value={appointment.groupResource?.id}
      options={groupOptions}
      disabled={appointment.isServiceTimeDependent}
    />
  )
}

export { GroupSelectCell }
