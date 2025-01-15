'use client'

import { Appointment, QuickNoteSectionItem } from '@/types'
import { SpravatoWidget } from './spravato-widget'

interface SpravatoWidgetClientLoaderProps {
  appointment: Appointment
  data?: QuickNoteSectionItem[]
}

const SpravatoWidgetClientLoader = ({
  appointment,
  data,
}: SpravatoWidgetClientLoaderProps) => {
  return (
    <SpravatoWidget
      procedureSpravatoData={data ?? []}
      appointmentData={appointment}
    />
  )
}

export { SpravatoWidgetClientLoader }
