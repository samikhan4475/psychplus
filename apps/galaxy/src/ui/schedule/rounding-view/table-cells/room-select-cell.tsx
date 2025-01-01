import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { Appointment } from '@/types'
import { CHANGE_ROOM_PERMISSION } from '../../constants'
import {
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
} from '../../hooks'
import { PermissionAlert } from '../../shared'
import { transformIn, updateVisit } from '../../utils'
import { useStore } from '../store'

const RoomSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const data = useStore((state) => state.data)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const refetch = useRefetchAppointments()
  const isInactiveVisit = useInactiveRowStatus(appointment.visitStatus, false)
  const [room, setRoom] = useState<string>(appointment.roomResource?.id ?? '')
  const { changeRoomPermission } = useSchedulerPermissions()
  const roomOptions = useMemo(() => {
    const rooms =
      data.serviceRooms?.filter(
        (room) => room.serviceId === appointment.serviceId,
      ) ?? []
    return rooms.map((room) => ({
      label: room.room,
      value: room.id,
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
        message={CHANGE_ROOM_PERMISSION}
      />
      <SelectCell
        value={room}
        options={roomOptions}
        disabled={isInactiveVisit}
        onValueChange={async (val) => {
          if (changeRoomPermission) {
            const transformedBody = transformIn(appointment)
            transformedBody.roomId = val
            updateVisit(transformedBody, refetch)
            return setRoom(val)
          }
          setIsOpen(true)
        }}
      />
    </Flex>
  )
}

export { RoomSelectCell }
