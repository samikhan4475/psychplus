'use client'

import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { CareTeam, Patient } from '@psychplus/patient'
import {
  getLoggedInPatientCareTeam,
  getLoggedInPatientProfile,
} from '@psychplus/patient/api.client'
import {
  ActiveMedicationCard,
  CarePlanCard,
  CareTeamCard,
  FooterMenuCard,
  ScheduledAppointmentCard,
} from '@/components'
import { PatientProfileCard } from '@/components/patient-profile-card'
import { useStore } from '../store'

const HomePage = () => {
  const { patient, setPatient, patientCareTeam, setPatientCareTeam } =
    useStore()

  const [patientState, setPatientState] = useState<Patient>()
  const [patientCareTeamState, setPatientCareTeamState] = useState<CareTeam>()

  useEffect(() => {
    getLoggedInPatientProfile().then(setPatient)
    getLoggedInPatientCareTeam().then(setPatientCareTeam)
  }, [])

  useEffect(() => {
    setPatientState(patient)
  }, [patient])

  useEffect(() => {
    setPatientCareTeamState(patientCareTeam)
  }, [patientCareTeam])

  return (
    <Flex px={{ md: '8', lg: '9' }} p="4" py="5" direction="column" gap="8">
      <CarePlanCard />
      <Flex
        gap="6"
        className="max-xs:flex-col xs:flex-col sm:flex-col md:flex-row lg:flex-row"
      >
        <Flex
          className="max-md:w-full md:w-1/3 lg:w-1/3 xl:w-1/3"
          gap="6"
          direction="column"
        >
          <PatientProfileCard patient={patientState} />
          <CareTeamCard careTeam={patientCareTeamState} />
        </Flex>
        <Flex className="w-full">
          <ScheduledAppointmentCard />
        </Flex>
      </Flex>
      <ActiveMedicationCard />
      <FooterMenuCard />
    </Flex>
  )
}

export default HomePage
