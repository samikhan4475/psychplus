import { useMemo } from 'react'
import { PropsWithRow, SelectCell } from '@/components'
import { useStore } from '../store'
import { MergedRecord } from '../types'

const GroupSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<MergedRecord>) => {
  const data = useStore((state) => state.unitsandgroupslist)

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
    <SelectCell value={appointment.groupResource?.id} options={groupOptions} />
  )
}

export { GroupSelectCell }
