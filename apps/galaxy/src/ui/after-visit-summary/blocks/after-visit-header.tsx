import React, { useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { SelectCell, TabContentHeading } from '@/components'
import { Appointment } from '@/types'
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
        const hasStartDate = !!appointment?.startDate
        let label = ''
        
        if (hasStartDate) {
          const date = new Date(appointment.startDate!)
          const formattedDate = date.toLocaleDateString('en-US', {
            month: '2-digit',
            day: '2-digit',
            year: '2-digit'
          })
          const formattedTime = date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
          })
          label = `${formattedDate} ${formattedTime}, ${appointment.type}, ${appointment.visitType ?? ''}`
        } else {
          label = `${appointment.type}, ${appointment.visitType ?? ''}`
        }
        
        return {
          label,
          value: String(appointment.id),
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
            value={String(selectedAppointment.id)}
            onValueChange={(value: string) => {
              const appointment = appointments.find(
                (app) => String(app.id) === value,
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
