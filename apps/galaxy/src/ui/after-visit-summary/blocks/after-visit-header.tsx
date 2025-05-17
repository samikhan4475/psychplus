import React, { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { SelectCell, TabContentHeading } from '@/components'
import { Appointment } from '@/types'
import { formatDateCell, formatTimeCell } from '@/ui/schedule/utils'
import { PrintButton } from './print-button'

interface AfterSummaryHeaderWidgetHeaderProps {
  appointments: Appointment[]
  selectedAppointment: Appointment
  onAppointmentChange: (appointment: Appointment) => void
  onPrint: () => void
}

const AfterSummaryHeaderWidgetHeader = ({
  appointments,
  selectedAppointment,
  onAppointmentChange,
  onPrint,
}: AfterSummaryHeaderWidgetHeaderProps) => {
  const options = useMemo(
    () =>
      appointments.map((appointment) => ({
        label: `${formatDateCell(
          appointment.appointmentDate,
          appointment.locationTimezoneId,
        )} ${formatTimeCell(
          appointment.appointmentDate,
          appointment.locationTimezoneId,
        )}, ${appointment.visitMedium}, ${appointment.visitType ?? ''}`,
        value: String(appointment.appointmentId),
      })),
    [appointments],
  )

  return (
    <TabContentHeading
      title="After Visit Summary"
      className="sticky top-0 z-[11]"
    >
      <Flex ml={'2'}>
        <SelectCell
          value={String(selectedAppointment.appointmentId)}
          onValueChange={(value: string) => {
            const appointment = appointments.find(
              (app) => String(app.appointmentId) === value,
            )
            if (appointment) {
              onAppointmentChange(appointment)
            }
          }}
          options={options}
        />
      </Flex>
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <PrintButton onClick={onPrint} />
      </Flex>
    </TabContentHeading>
  )
}

export { AfterSummaryHeaderWidgetHeader }
