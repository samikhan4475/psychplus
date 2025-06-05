import React from 'react'
import { Box } from '@radix-ui/themes'
import AppointmentHistoryView from '@/features/appointments/history/ui/appointment-history-view'

const HistoryAppointmentsPage = () => {
  return (
    <>
      <Box className="text-pp-blue-8 mb-4 text-[24px] font-[600] leading-6 tracking-[0.36px]">
        History
      </Box>
      <AppointmentHistoryView />
    </>
  )
}

export default HistoryAppointmentsPage
