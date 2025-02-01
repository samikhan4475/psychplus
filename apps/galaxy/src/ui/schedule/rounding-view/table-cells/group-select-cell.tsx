import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { Appointment } from '@/types'
import { CHANGE_GROUP_PERMISSION } from '../../constants'
import {
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
} from '../../hooks'
import { PermissionAlert } from '../../shared'
import { transformIn, updateVisit } from '../../utils'
import { useStore } from '../store'

const GroupSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const data = useStore((state) => state.data)
  const { changeGroupPermission } = useSchedulerPermissions()
  const refetch = useRefetchAppointments()
  const isInactiveVisit = useInactiveRowStatus(appointment.visitStatus, false)
  const [isOpen, setIsOpen] = useState<boolean>(false)
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
        disabled={isInactiveVisit}
        onValueChange={async (val) => {
          if (changeGroupPermission) {
            const transformedBody = transformIn(appointment)
            transformedBody.groupId = val
            updateVisit({ body: transformedBody, onSuccess: refetch })
            return setGroup(val)
          }
          setIsOpen(true)
        }}
      />
    </Flex>
  )
}

export { GroupSelectCell }
