import { Flex, IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { TableEditIcon } from '@/components/icons'
import { EditClinicScheduleDialog } from '../../dialogs/clinic-schedule-dialog'
import { ClinicTime } from '../../types'

const ActionCell = ({
  row: { original: clinicTime },
}: PropsWithRow<ClinicTime>) => {
  return (
    <Flex justify="start" px="1" align="center">
      <EditClinicScheduleDialog>
        <IconButton variant="ghost">
          <TableEditIcon height={18} />
        </IconButton>
      </EditClinicScheduleDialog>
    </Flex>
  )
}

export { ActionCell }
