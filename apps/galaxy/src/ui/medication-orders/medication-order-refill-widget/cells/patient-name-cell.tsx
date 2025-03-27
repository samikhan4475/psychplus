import { useState } from 'react'
import { TextCell } from '@/components'
import { Info } from 'lucide-react'
import { Flex } from '@radix-ui/themes'
import PatientDetailsDialog from '../dialogs/patient-details-dialog'

const PatientNameCell = ({ row }: { row: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  return (
    <>
      <Flex
        justify="center"
        align="center"
        width="100%"
        height="100%"
        gapX="2"
        onClick={() => setDialogOpen(true)}
        className="cursor-pointer"
      >
        <Info size={16} className="text-gray-500" />
        <TextCell>Text</TextCell>
      </Flex>

      <PatientDetailsDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </>
  )
}

export default PatientNameCell
