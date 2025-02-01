import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CHANGE_UNIT_PERMISSION } from '../../constants'
import { useSchedulerPermissions } from '../../hooks'
import { PermissionAlert } from '../../shared'
import { updateVisit } from '../../utils'
import { DAY_KEYS } from '../constants'
import { useRefetchAppointments } from '../hooks'
import { useStore } from '../store'
import { DayString, MergedRecord } from '../types'
import { transformIn } from '../util'

const UnitSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<MergedRecord>) => {
  const data = useStore((state) => state.unitsandgroupslist)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { changeUnitPermission } = useSchedulerPermissions()
  const refetch = useRefetchAppointments()
  const [unit, setUnit] = useState(appointment.unitResource?.id ?? '')
  const unitOptions = useMemo(() => {
    const units =
      data.serviceUnits?.filter(
        (unit) => unit.serviceId === appointment.serviceId,
      ) ?? []
    return units.map((unit) => ({
      label: unit.unit,
      value: unit.id,
    }))
  }, [data])

  const handleChange = async (val: string) => {
    let day: DayString = 'Mon'
    DAY_KEYS.forEach((dayKey) => {
      if (appointment.weekDays[dayKey]) {
        day = dayKey
      }
    })
    if (changeUnitPermission) {
      const transformedBody = transformIn(appointment, day)
      transformedBody.unitId = val
      updateVisit({ body: transformedBody, onSuccess: refetch })
      return setUnit(val)
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
        message={CHANGE_UNIT_PERMISSION}
      />
      <SelectCell
        value={unit}
        options={unitOptions}
        onValueChange={handleChange}
      />
    </Flex>
  )
}

export { UnitSelectCell }
