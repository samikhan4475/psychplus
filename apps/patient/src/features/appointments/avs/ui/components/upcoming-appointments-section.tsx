import React, { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { getUpcomingAppointmentsAction } from '../../api'
import { TitleSection } from '../../common'
import { Appointment } from '../../types'
import UpcomingApointmentsTable from './upcoming-apointments-table'

const UpcomingAppointmentsSection = () => {
  const [loading, setLoading] = useState(true)
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUpcomingAppointmentsAction()
      if (response.state === 'success') {
        setAppointments(response?.data?.appointments ?? [])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Box>
      <TitleSection title="Upcoming Appointments" />
      <UpcomingApointmentsTable loading={loading} appointments={appointments} />
    </Box>
  )
}

export { UpcomingAppointmentsSection }
