'use client'

import { useEffect } from 'react'
import { AppointmentMinimalDetails } from '@psychplus-v2/types'
import { AppointmentsView } from '../constants'
import { useStore } from '../store'
import { AppointmentsCancelled } from './appointments-cancelled'
import { AppointmentsConfirmations } from './appointments-confirmations'
import { AppointmentsConfirmed } from './appointments-confirmed'

interface AppointmentConfirmationsProps {
  data?: AppointmentMinimalDetails
  mapKey: string
}

const AppointmentsConfirmationsFlow = ({
  data,
  mapKey,
}: AppointmentConfirmationsProps) => {
  const { appointmentView, setAppointment } = useStore()

  useEffect(() => {
    if (data) setAppointment(data)
  }, [data])

  switch (appointmentView) {
    case AppointmentsView.Confirmation:
      return <AppointmentsConfirmations />
    case AppointmentsView.Cancelled:
      return <AppointmentsCancelled />
    case AppointmentsView.Confirmed:
      return <AppointmentsConfirmed mapKey={mapKey} />
    default:
      return <AppointmentsCancelled />
  }
}

export { AppointmentsConfirmationsFlow }
