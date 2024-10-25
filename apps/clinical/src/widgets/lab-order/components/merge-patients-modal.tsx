import React, { useEffect, useState } from 'react'
import { TransformIcon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import {
  getQuestResult,
  getSearchPatient,
} from '@psychplus/lab-orders/api.client'
import { PatientTypes } from '@psychplus/lab-orders/types'
import { MergePatients } from './merge-patients'

const MergePatientsModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: (e: any) => void
}) => {
  const [patients, setPatients] = useState<PatientTypes[]>([])
  const [patientsAgainstQuestResult, setPatientsAgainstQuestResult] = useState<
    PatientTypes[]
  >([])
  const [filteredPatients, setFilteredPatients] = useState<PatientTypes[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTermAgainstQuestResult, setSearchTermAgainstQuestResult] =
    useState('')
  const [selectedPatient, setSelectedPatient] = useState<PatientTypes | null>(
    null,
  )
  const [
    selectedPatientAgainstQuestResult,
    setSelectedPatientAgainstQuestResult,
  ] = useState<PatientTypes | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [patientData, questResult] = await Promise.allSettled([
          getSearchPatient({}),
          getQuestResult({ EntryType: 'ResultFetch', LogDescription: 'Error' }),
        ])
        if (patientData.status === 'fulfilled') {
          setPatients(patientData.value)
        }
        if (questResult.status === 'fulfilled') {
          const patientDataAgaintQuestResult = questResult.value
            .map((item) => {
              if (!item.patient || !item.patient.contactDetails)
                return undefined
              return {
                birthdate: item.patient.birthdate,
                legalName: {
                  firstName: item.patient.legalName.firstName,
                  lastName: item.patient.legalName.lastName,
                },
                gender: item.patient.gender,
                contactDetails: item.patient.contactDetails,
              }
            })
            .filter((patient): patient is PatientTypes => patient !== undefined)
          setPatientsAgainstQuestResult(patientDataAgaintQuestResult)
        }
      } catch (error) {
        console.error('Error fetching patient data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    const datadf = patients.filter((patient) =>
      `${patient.legalName.firstName} ${patient.legalName.lastName}`
        .toLowerCase()
        .includes(term.toLowerCase()),
    )
    setFilteredPatients(datadf)
  }
  const handleSearchChangeAgainstQuestResult = (term: string) => {
    setSearchTermAgainstQuestResult(term)
  }

  const handleRowSelect = (patient: PatientTypes) => {
    setSelectedPatient(patient)
  }
  const handleRowSelectAgainstQuestResult = (patient: PatientTypes) => {
    setSelectedPatientAgainstQuestResult(patient)
  }

  return (
    <Dialog.Root open={isOpen}>
      <Dialog.Content
        className={`relative max-w-[1200px] rounded-[4px] p-[20px]`}
      >
        <Text size="4" weight="bold">
          Unmapped Patient/Order
        </Text>
        <Flex gap="2" mt="2">
          <MergePatients
            data={patientsAgainstQuestResult}
            searchTerm={searchTermAgainstQuestResult}
            onSearchChange={handleSearchChangeAgainstQuestResult}
            onRowSelect={handleRowSelectAgainstQuestResult}
            selectedRow={selectedPatientAgainstQuestResult}
            showCreatePatientButton={true}
          />
          <MergePatients
            data={filteredPatients.length > 0 ? filteredPatients : patients}
            searchTerm={searchTerm}
            onSearchChange={handleSearchChange}
            onRowSelect={handleRowSelect}
            selectedRow={selectedPatient}
          />
        </Flex>
        <Flex justify="end" gap="2" mt="4">
          <Button
            variant="outline"
            highContrast
            onClick={onClose}
            className="flex h-[24px] cursor-pointer items-center gap-[8px] rounded-[4px] border-2 border-[#151B4A] bg-[white] p-[14px_8px] text-2 font-medium text-[#151B4A]"
          >
            Cancel
          </Button>
          <Button className="flex h-[24px] cursor-pointer items-center gap-[8px] rounded-[4px] bg-[#194595] p-[14px_8px] text-2 font-medium text-[white]">
            <TransformIcon
              scale="4"
              color="white"
              className="h-[16.25px] w-[16.25px] text-[white]"
            />
            Merge Patient
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { MergePatientsModal }
