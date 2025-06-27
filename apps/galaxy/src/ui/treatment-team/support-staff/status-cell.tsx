import { PropsWithRow, SelectCell } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { StatusClockPopover } from '@/ui/staff-treatment-team/care-teams/status-clock-popover'
import { CareTeam } from '@/ui/staff-treatment-team/care-teams/types'

const StatusCell = ({ row: { original } }: PropsWithRow<CareTeam>) => {
  const options = useCodesetOptions(CODESETS.LicenseStatus, undefined, [
    'Na',
    'Deleted',
    'Archived',
  ])

  const { recordStatus } = original

  return (
    <>
      <StatusClockPopover
        careTeam={original}
        providerId={original.providerId}
      />
      <SelectCell
        value={recordStatus}
        options={options}
        disabled
        className="flex-1"
      />
    </>
  )
}

export { StatusCell }
