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
      appointments.map((appointment) => {
        const hasDate = !!appointment.appointmentDate
        const hasTimezone = !!appointment.locationTimezoneId
        const label = hasDate && hasTimezone
          ? `${formatDateCell(
              appointment.appointmentDate,
              appointment.locationTimezoneId,
              false,
            )} ${formatTimeCell(
              appointment.appointmentDate,
              appointment.locationTimezoneId,
            )}, ${appointment.visitMedium}, ${appointment.visitType ?? ''}`
          : `${appointment.visitMedium}, ${appointment.visitType ?? ''}`
        return {
          label,
          value: String(appointment.appointmentId),
        }
      }),
    [appointments],
  )

  return (
    <TabContentHeading
      title="After Visit Summary"
      className="sticky top-0 z-[11]"
    >
      {selectedAppointment && Object.keys(selectedAppointment).length > 0 && (
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
      )}
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <PrintButton onClick={onPrint} />
      </Flex>
    </TabContentHeading>
  )
}

export { AfterSummaryHeaderWidgetHeader }
