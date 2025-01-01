import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { CHANGE_NON_TIMED_MEDIUM, StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useSchedulerPermissions,
} from '../../hooks'
import { PermissionAlert, UpdateVisitAlert } from '../../shared'
import { useEncounterTypeStore } from '../../store'
import { updateVisit } from '../../utils'
import { useRefetchAppointments } from '../hooks'
import { MergedRecord, WeekDay } from '../types'
import { transformIn } from '../util'

interface VisitMediumSelectCellProps extends PropsWithRow<MergedRecord> {
  day: WeekDay
}

const VisitMediumSelectCell = ({
  row: { original: appointment },
  day,
}: VisitMediumSelectCellProps) => {
  const [visitMedium, setVisitMedium] = useState<string>(
    appointment.weekDays[day.id]?.visitMedium || '',
  )
  const appointmentId = appointment.weekDays[day.id]?.appointmentId
  const data = appointment.weekDays[day.id]
  const visitType = appointment.weekDays[day.id]?.visitType
  const isInactiveVisit = useInactiveRowStatus(
    appointment.weekDays[day.id]?.visitStatus ?? '',
    false,
  )
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const { visitMediumOptionsMapper } = useEncounterTypeStore()
  const availableCodes = visitMediumOptionsMapper[visitType ?? ''] ?? []
  const availableSequenceCodes = codes.filter((val) =>
    availableCodes.includes(val.value),
  )
  const refetch = useRefetchAppointments()
  const { canChangeNonTimedVisitMedium } = useSchedulerPermissions()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const items = availableSequenceCodes.map((code) => ({
    label: code.display,
    value: code.value,
  }))

  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment, day.id),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      type: visitMedium,
    }
    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () => setVisitMedium(data?.visitMedium ?? ''),
    })
  }

  const onChange = async (val: string) => {
    if (!canChangeNonTimedVisitMedium) {
      return setIsOpen(true)
    }
    setVisitMedium(val)
    const transformedBody = transformIn(appointment, day.id)
    transformedBody.type = val
    updateVisit(transformedBody, refetch, onUpdateVisitError)
  }

  return (
    <Flex
      width="100%"
      height="100%"
      align="center"
      onClick={(e) => e.stopPropagation()}
    >
      <UpdateVisitAlert state={alertState} onConfirm={confirmVisitUpdate} />
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={CHANGE_NON_TIMED_MEDIUM}
      />
      <SelectCell
        value={visitMedium}
        options={items}
        disabled={appointmentId === undefined || isInactiveVisit}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { VisitMediumSelectCell }
