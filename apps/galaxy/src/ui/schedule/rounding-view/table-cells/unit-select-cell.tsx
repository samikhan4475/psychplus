import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { Appointment } from '@/types'
import { CHANGE_UNIT_PERMISSION } from '../../constants'
import {
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
} from '../../hooks'
import { PermissionAlert } from '../../shared'
import { transformIn, updateVisit } from '../../utils'
import { useStore } from '../store'

const UnitSelectCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const data = useStore((state) => state.data)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const refetch = useRefetchAppointments()
  const isInactiveVisit = useInactiveRowStatus(appointment.visitStatus, false)
  const [unit, setUnit] = useState<string>(appointment.unitResource?.id ?? '')
  const { changeUnitPermission } = useSchedulerPermissions()
  const unitOptions = useMemo(() => {
    const units =
      data?.serviceUnits?.filter(
        (unit) => unit.serviceId === appointment.serviceId,
      ) ?? []
    return units.map((unit) => ({
      label: unit.unit,
      value: unit.id,
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
        message={CHANGE_UNIT_PERMISSION}
      />
      <SelectCell
        value={unit}
        options={unitOptions}
        disabled={isInactiveVisit}
        onValueChange={async (val) => {
          if (changeUnitPermission) {
            const transformedBody = transformIn(appointment)
            transformedBody.unitId = val
            updateVisit(transformedBody, refetch)
            return setUnit(val)
          }
          setIsOpen(true)
        }}
      />
    </Flex>
  )
}

export { UnitSelectCell }
