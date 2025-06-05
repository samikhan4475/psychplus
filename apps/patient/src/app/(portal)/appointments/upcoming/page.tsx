import React from 'react'
import { UpcomingAppointmentsSummary } from '@/features/appointments/upcoming'
import { Box } from '@radix-ui/themes'

const UpcomingAppointmentsPage = () => {
  return (
    <>
      <Box className="text-pp-blue-8 mb-4 text-[24px] font-[600] leading-6 tracking-[0.36px]">
        Upcoming
      </Box>
      <UpcomingAppointmentsSummary />
    </>
  )
}

export default UpcomingAppointmentsPage
