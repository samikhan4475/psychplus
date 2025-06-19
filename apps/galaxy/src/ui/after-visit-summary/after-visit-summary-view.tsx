'use client'

import React, { useEffect, useState } from 'react'
import { Flex, Separator } from '@radix-ui/themes'
import { Appointment, PatientReferral } from '@/types'
import { handlePrint } from '@/utils'
import { useStore as useLabOrdersStore } from '../lab-orders/lab-orders-widget/store'
import { useStore as useMedicationsStore } from '../medications/patient-medications-widget/store'
import { AdditionalInformationBlock } from './blocks/additional-information-block'
import { AfterSummaryHeaderWidgetHeader } from './blocks/after-visit-header'
import { AfterVisitHeaderItemsBlock } from './blocks/after-visit-header-items-block'
import { DiagnosisView } from './blocks/diagnosis-view'
import { LabInstructionsBlock } from './blocks/lab-instructions-block'
import { LabOrders } from './blocks/lab-orders-view'
import { MedicationsBlock } from './blocks/medications-block'
import { ProvidersRecommendationsBlock } from './blocks/providers-recommendations-block'
import { ReferralView } from './blocks/referral-view'
import { UpcomingAppointmentsBlock } from './blocks/upcoming-appointments-block'
import { useProviderRecommendationsStore } from './store/store'

interface AfterVisitSummaryViewProps {
  patientId: string
  appointments: Appointment[]
  appointmentId: string
  referrals: PatientReferral[]
}

const AfterVisitSummaryView = ({
  patientId,
  appointments,
  appointmentId,
  referrals,
}: AfterVisitSummaryViewProps) => {
  const { fetchPatientMedication } = useMedicationsStore((state) => ({
    fetchPatientMedication: state.fetchPatientMedication,
  }))
  const { data, fetch, setAppointmentId } = useLabOrdersStore()
  const { fetchWorkingDiagnosis } = useProviderRecommendationsStore()

  const upcomingAppointments = appointments.filter((appointment) => {
    const isUpcomingStatus = ['Scheduled', 'Confirmed', 'CheckedIn'].includes(
      appointment.visitStatus,
    )
    const appointmentDate = new Date(appointment.appointmentDate)
    const now = new Date()
    return isUpcomingStatus && appointmentDate >= now
  })

  const pastAppointments = appointments.filter(
    (appointment) => appointment.visitStatus === 'CheckedOut',
  )

  const [selectedAppointment, setSelectedAppointment] = useState<Appointment>(
    pastAppointments[0] || ({} as Appointment),
  )

  const fetchData = async () => {
    setAppointmentId(appointmentId)
    const payload = {
      patientId: [patientId],
    }
    fetch(appointmentId, payload)
  }

  useEffect(() => {
    fetchPatientMedication({ patientIds: [Number(patientId)] })
    fetchData()
  }, [patientId, fetchPatientMedication])

  useEffect(() => {
    if (patientId) {
      fetchWorkingDiagnosis(
        patientId,
        String(selectedAppointment.appointmentId),
      )
    }
  }, [selectedAppointment, patientId, fetchWorkingDiagnosis])

  const headerItems = [
    { title: 'Title', value: selectedAppointment.service },
    { title: 'Type', value: selectedAppointment.visitType },
    { title: 'Provider', value: selectedAppointment.providerName },
    {
      title: 'Supervisor',
      value: selectedAppointment?.metadata?.createdByFullName,
    },
    {
      title: 'Date',
      value: selectedAppointment.appointmentDate,
      type: 'date' as const,
    },
    {
      title: 'Time',
      value: selectedAppointment.appointmentDate,
      type: 'time' as const,
    },
  ]

  const printId = 'after-visit-summary-print'

  return (
    <Flex direction="column" width="100%">
      <AfterSummaryHeaderWidgetHeader
        appointments={pastAppointments}
        selectedAppointment={selectedAppointment}
        onAppointmentChange={setSelectedAppointment}
        onPrint={() => handlePrint(printId, 'After Visit Summary')}
      />
      <Separator className="w-full" />

      <Flex id={printId} direction="column" width="100%">
        <AfterVisitHeaderItemsBlock
          headerItems={headerItems}
          appointment={selectedAppointment}
        />
        <ProvidersRecommendationsBlock
          appointmentId={String(selectedAppointment.appointmentId)}
        />
        <UpcomingAppointmentsBlock appointments={upcomingAppointments} />
        <MedicationsBlock />
        <ReferralView referrals={referrals} />
        <LabOrders />
        <LabInstructionsBlock labOrders={data?.labOrders ?? []} />
        <DiagnosisView />
        <AdditionalInformationBlock />
      </Flex>
    </Flex>
  )
}

export { AfterVisitSummaryView }
