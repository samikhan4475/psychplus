import { useMemo } from 'react'
import { PropsWithRow, SelectCell } from '@/components'
import { useStore } from '../store'
import { Appointment } from '@/types'

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

  return <SelectCell options={groupOptions} />
}

export { GroupSelectCell }
