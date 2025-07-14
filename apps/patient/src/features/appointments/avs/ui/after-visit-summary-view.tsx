'use client'

import { LoadingPlaceholder } from '@/components-v2'
import { Box, Flex } from '@radix-ui/themes'
import { useEffect } from 'react'
import { useStore } from '../../history/store'
import {
  AdditionalInfoSection,
  CurrentMedicationSection,
  LabInstructionsSection,
  LabOrdersSection,
  ProviderRecommendationSection,
  ReferralsSection,
  SelectVisitSection,
  UpcomingAppointmentsSection,
} from './components'
import DiagnosisSection from './components/diagnosis-section'

const PRINT_ID = 'after-visit-summary-print'

const AfterVisitSummaryView = () => {
  const { allAppointments, fetchAllAppointments, loading } = useStore(
    (state) => ({
      allAppointments: state.allAppointments,

      fetchAllAppointments: state.fetchAllAppointments,
      loading: state.loading,
    }),
  )

  useEffect(() => {
    if (allAppointments.length === 0) fetchAllAppointments()
  }, [allAppointments])

  if (loading) {
    return <LoadingPlaceholder />
  }

  return (
    <Flex direction="column" width="100%" gap="5" px={"4"}>
      <Box className="text-pp-blue-8 text-[24px] font-[600] leading-6 tracking-[0.36px]">
        After Visit Summary
      </Box>
      <SelectVisitSection printId={PRINT_ID} />
      <Flex id={PRINT_ID} direction="column" gap="5">
        <ProviderRecommendationSection />
        <UpcomingAppointmentsSection />
        <CurrentMedicationSection />
        <ReferralsSection />
        <LabOrdersSection />
        <LabInstructionsSection />
        <DiagnosisSection />
        <AdditionalInfoSection />
      </Flex>
    </Flex>
  )
}

export default AfterVisitSummaryView
