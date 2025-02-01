import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CHANGE_GROUP_PERMISSION } from '../../constants'
import { useSchedulerPermissions } from '../../hooks'
import { PermissionAlert } from '../../shared'
import { updateVisit } from '../../utils'
import { DAY_KEYS } from '../constants'
import { useRefetchAppointments } from '../hooks'
import { useStore } from '../store'
import { DayString, MergedRecord } from '../types'
import { transformIn } from '../util'

const GroupSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<MergedRecord>) => {
  const data = useStore((state) => state.unitsandgroupslist)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const refetch = useRefetchAppointments()
  const { changeGroupPermission } = useSchedulerPermissions()
  const [group, setGroup] = useState<string>(
    appointment.groupResource?.id ?? '',
  )
  const groupOptions = useMemo(() => {
    const groups =
      data.serviceGroups?.filter(
        (group) => group.serviceId === appointment.serviceId,
      ) ?? []
    return groups.map((group) => ({
      label: group.group,
      value: group.id,
    }))
  }, [data])

  const handleChange = async (val: string) => {
    let day: DayString = 'Mon'
    DAY_KEYS.forEach((dayKey) => {
      if (appointment.weekDays[dayKey]) {
        day = dayKey
      }
    })
    if (changeGroupPermission) {
      const transformedBody = transformIn(appointment, day)
      transformedBody.groupId = val
      updateVisit({ body: transformedBody, onSuccess: refetch })
      return setGroup(val)
    }
    setIsOpen(true)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={CHANGE_GROUP_PERMISSION}
      />
      <SelectCell
        value={group}
        options={groupOptions}
        onValueChange={handleChange}
      />
    </Flex>
  )
}

export { GroupSelectCell }
