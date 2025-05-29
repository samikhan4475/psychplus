import { useState } from 'react'
import { Flex, Text, Tooltip } from '@radix-ui/themes'
import { Info } from 'lucide-react'
import PatientDetailsDialog from '../dialogs/patient-details-dialog'
import { PatientPersonInfo } from '../types'

const isPatientMatched = (data: any): boolean => {
  const patient = data?.patient
  if (!patient) return false

  const formatDate = (date?: string) =>
    date ? new Date(date).toISOString().split('T')[0] : null

  const firstNameMatch =
    patient?.legalName?.firstName === data?.patientFirstName
  const lastNameMatch = patient?.legalName?.lastName === data?.patientLastName
  const dobMatch =
    formatDate(patient?.birthdate) === formatDate(data?.patientDateOfBirth)
  const genderMatch = patient?.gender === data?.patientGender

  return firstNameMatch && lastNameMatch && dobMatch && genderMatch
}
const PatientNameCell = ({ row }: { row: any }) => {
  const [dialogOpen, setDialogOpen] = useState(false)

  const isPatientAvailable = row.original?.patientId
  const data = row.original
  const nestedPatient = data?.patient
  const isMismatched = isPatientMatched(row.original)

  const patientName = isPatientAvailable
    ? `${nestedPatient?.legalName?.firstName ?? ''} ${
        nestedPatient?.legalName?.lastName ?? ''
      }`
    : `${data?.patientFirstName ?? ''} ${data?.patientLastName ?? ''}`

  const homeAddress = nestedPatient?.contactDetails?.addresses?.find(
    (a: any) => a.type === 'Home',
  )
  const contactPhone = nestedPatient?.contactDetails?.phoneNumbers?.find(
    (p: any) => p.type === 'Contact',
  )?.number

  const patientData: PatientPersonInfo[] = [
    nestedPatient && {
      patientId: nestedPatient.id,
      patientFirstName: nestedPatient?.legalName?.firstName,
      patientLastName: nestedPatient?.legalName?.lastName,
      patientGender: nestedPatient?.gender,
      patientDateOfBirth: nestedPatient?.birthdate,
      patientAddressLine1: homeAddress?.street1,
      patientCity: homeAddress?.city,
      patientStateCode: homeAddress?.state,
      patientCountryCode: homeAddress?.country,
      phone: contactPhone,
      email: nestedPatient?.contactDetails?.email,
      source: 'Galaxy',
    },
    {
      patientId: data?.patientId,
      patientFirstName: data?.patientFirstName,
      patientLastName: data?.patientLastName,
      patientGender: data?.patientGender,
      patientDateOfBirth: data?.patientDateOfBirth,
      patientAddressLine1: data?.patientAddressLine1,
      patientCity: data?.patientCity,
      patientStateCode: data?.patientStateCode,
      patientCountryCode: data?.patientCountryCode,
      phone: '',
      email: '',
      source: 'Pharmacy',
    },
  ].filter(Boolean) as PatientPersonInfo[]

  const textElement = (
    <Text
      weight="regular"
      size="1"
      className={`w-[150px] ${!isMismatched ? 'text-pp-red' : ''}`}
    >
      {patientName}
    </Text>
  )
  return (
    <>
      <Flex justify="center" align="center" width="100%" height="100%" gapX="2">
        <Info
          size={14}
          className="text-gray-500 cursor-pointer"
          onClick={() => setDialogOpen(true)}
        />
        {!isMismatched ? (
          <Tooltip
            content={
              <Text className="select-text">
                Patient information does not match between our system and the
                pharmacy system.
              </Text>
            }
          >
            {textElement}
          </Tooltip>
        ) : (
          textElement
        )}
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
