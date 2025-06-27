import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { ProviderTeam } from '../actions/get-providers-of-patients'
import { StatusClockPopover } from '../history-popup/status-clock-popover'

const StatusCell = ({
  row: { original },
  patientId,
  isPsychiatry,
}: PropsWithRow<ProviderTeam> & {
  patientId: string
  isPsychiatry: boolean
}) => {
  const options = useCodesetOptions(CODESETS.LicenseStatus, undefined, [
    'Na',
    'Deleted',
    'Archived',
  ])

  return (
    <>
      <StatusClockPopover
        staffId={original.staffId}
        patientId={patientId}
        isPsychiatry={isPsychiatry}
      />
      <SelectCell
        value={original.recordStatus}
        options={options}
        onValueChange={() => {}}
        className="flex-1"
        disabled
      />
    </>
  )
}

export { StatusCell }
