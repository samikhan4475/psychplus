import { useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { Info } from 'lucide-react'
import { LongTextCell } from '@/components'
import PatientDetailsDialog from '../dialogs/patient-details-dialog'

const PatientNameCell = ({ row }: { row: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const isPatientAvailable = row.original?.patientId
  const original = row.original
  const nestedPatient = original?.patient

  const patientName = isPatientAvailable
    ? `${nestedPatient?.legalName?.firstName ?? ''} ${
        nestedPatient?.legalName?.lastName ?? ''
      }`
    : `${original?.patientFirstName ?? ''} ${original?.patientLastName ?? ''}`

  const homeAddress = isPatientAvailable
    ? row.original.patient.contactDetails?.addresses?.find(
        (addr: any) => addr.type === 'Home',
      )
    : null
  const contactPhone = isPatientAvailable
    ? row.original.patient.contactDetails?.phoneNumbers?.find(
        (phone: any) => phone.type === 'Contact',
      )?.number
    : null
  const patientData = {
    patientId: isPatientAvailable ? nestedPatient?.id : original?.patientId,
    patientFirstName: isPatientAvailable ? nestedPatient?.legalName?.firstName : original?.patientFirstName,
    patientLastName: isPatientAvailable ? nestedPatient?.legalName?.lastName : original?.patientLastName,
    patientGender: isPatientAvailable ? nestedPatient?.gender : original?.patientGender,
    patientDateOfBirth: isPatientAvailable ? nestedPatient?.birthdate : original?.patientDateOfBirth,
    patientAddressLine1: isPatientAvailable ? homeAddress?.street1 : original?.patientAddressLine1,
    patientCity: isPatientAvailable ? homeAddress?.city : original?.patientCity,
    patientStateCode: isPatientAvailable ? homeAddress?.state : original?.patientStateCode,
    patientCountryCode: isPatientAvailable ? homeAddress?.country : original?.patientCountryCode,
    phone: isPatientAvailable ? contactPhone :'',
    email: isPatientAvailable ? nestedPatient?.contactDetails?.email : '',
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
