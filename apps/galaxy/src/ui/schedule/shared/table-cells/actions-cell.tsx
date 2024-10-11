import { Flex, IconButton } from '@radix-ui/themes'
import { DollarIcon, TableEditIcon } from '@/components/icons'
import { EditVisit } from '@/ui/visit/edit-visit'

const ActionsCell = ({ appointmentId }: { appointmentId: number }) => {
  return (
    <Flex gap="1" align="center" justify="center" className="flex-1">
      <DollarIcon />
      <EditVisit appointmentId={appointmentId}>
        <IconButton variant="ghost">
          <TableEditIcon height={18} />
        </IconButton>
      </EditVisit>
    </Flex>
  )
}

export { ActionsCell }
