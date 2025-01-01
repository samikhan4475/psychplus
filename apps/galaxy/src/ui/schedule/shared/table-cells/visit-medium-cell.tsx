import { useMemo, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Appointment } from '@/types'
import { CHANGE_NON_TIMED_MEDIUM, StatusCode } from '../../constants'
import {
  useConfirmVisitUpdate,
  useInactiveRowStatus,
  useRefetchAppointments,
  useSchedulerPermissions,
} from '../../hooks'
import { useEncounterTypeStore } from '../../store'
import { transformIn, updateVisit } from '../../utils'
import { PermissionAlert } from '../permission-alert'
import { UpdateVisitAlert } from '../update-visit-alert'

const VisitMediumCell = ({
  row: { original: appointment },
}: PropsWithRow<Appointment>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [visitMedium, setVisitMedium] = useState<string>(
    appointment.visitMedium,
  )
  const codes = useCodesetCodes(CODESETS.VisitMedium)
  const { canChangeNonTimedVisitMedium } = useSchedulerPermissions()
  const refetch = useRefetchAppointments()
  const isInactiveVisit = useInactiveRowStatus(
    appointment.visitStatus,
    appointment.isServiceTimeDependent,
  )
  const { alertState, onUpdateVisitConfirm, onUpdateVisitError } =
    useConfirmVisitUpdate()

  const { visitMediumOptionsMapper } = useEncounterTypeStore()
  const options = useMemo(
    () => {
      const availableCodes = visitMediumOptionsMapper[appointment.visitType] ?? []
      return codes
        .filter((val) => availableCodes.includes(val.value))
        .map((item) => ({
          label: item.display,
          value: item.value,
        }))
    },
    [codes, visitMediumOptionsMapper, appointment.visitType],
  )
  const confirmVisitUpdate = (isConfirmed: boolean, status?: number) => {
    const isOverride = status === StatusCode.OverridePermission
    const transformedBody = {
      ...transformIn(appointment),
      isOverridePermissionProvided: isOverride,
      isProceedPermissionProvided: !isOverride,
      type: visitMedium,
    }
    onUpdateVisitConfirm({
      isConfirmed,
      body: transformedBody,
      resetValue: () => setVisitMedium(appointment.visitMedium),
      status,
    })
  }

  const onChange = async (val: string) => {
    if (!canChangeNonTimedVisitMedium && !appointment.isServiceTimeDependent) {
      return setIsOpen(true)
    }
    setVisitMedium(val)
    const transformedBody = transformIn(appointment)
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
        disabled={isInactiveVisit}
        options={options}
        onValueChange={onChange}
      />
    </Flex>
  )
}

export { VisitMediumCell }
