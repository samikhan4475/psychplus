import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CHANGE_ROOM_PERMISSION } from '../../constants'
import { useSchedulerPermissions } from '../../hooks'
import { PermissionAlert } from '../../shared'
import { updateVisit } from '../../utils'
import { DAY_KEYS } from '../constants'
import { useRefetchAppointments } from '../hooks'
import { useStore } from '../store'
import { DayString, MergedRecord } from '../types'
import { transformIn } from '../util'

const RoomSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<MergedRecord>) => {
  const data = useStore((state) => state.unitsandgroupslist)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { changeRoomPermission } = useSchedulerPermissions()
  const refetch = useRefetchAppointments()
  const [room, setRoom] = useState(appointment.roomResource?.id ?? '')
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

  const handleChange = async (val: string) => {
    let day: DayString = 'Mon'
    DAY_KEYS.forEach((dayKey) => {
      if (appointment.weekDays[dayKey]) {
        day = dayKey
      }
    })
    if (changeRoomPermission) {
      const transformedBody = transformIn(appointment, day)
      transformedBody.roomId = val
      updateVisit({ body: transformedBody, onSuccess: refetch })
      return setRoom(val)
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
        message={CHANGE_ROOM_PERMISSION}
      />
      <SelectCell
        value={room}
        options={roomOptions}
        onValueChange={handleChange}
      />
    </Flex>
  )
}

export { RoomSelectCell }
