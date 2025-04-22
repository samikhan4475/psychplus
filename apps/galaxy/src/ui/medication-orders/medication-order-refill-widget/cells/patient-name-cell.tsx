import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { Info } from 'lucide-react'
import { LongTextCell } from '@/components'
import PatientDetailsDialog from '../dialogs/patient-details-dialog'

const PatientNameCell = ({ row }: { row: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const patientName = `${row.original.patientFirstName} ${row.original.patientLastName}`
  const patientData = {
    patientId: row.original?.patientId,
    patientFirstName: row.original?.patientFirstName,
    patientLastName: row.original?.patientLastName,
    patientGender: row.original?.patientGender,
    patientDateOfBirth: row.original?.patientDateOfBirth,
    patientAddressLine1: row.original?.patientAddressLine1,
    patientCity: row.original?.patientCity,
    patientStateCode: row.original?.patientStateCode,
    patientCountryCode: row.original?.patientCountryCode,
  }
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
        <Info size={14} className="text-gray-500" />
        <LongTextCell className="w-[150px]">{patientName}</LongTextCell>
      </Flex>

      <PatientDetailsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        patient={patientData}
      />
    </>
  )
}

export default PatientNameCell
