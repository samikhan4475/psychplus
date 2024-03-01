'use client'

import { Cross2Icon, Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Flex, Table } from '@radix-ui/themes'
import { format } from 'date-fns'
import { UpcomingAppointments } from '@psychplus/appointments'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { formatDateToCst } from '@psychplus/utils/time'
import { renderSpecialistName } from '..'

const FutureAppointmentsDialog = ({
  upcomingAppointments,
}: {
  upcomingAppointments: UpcomingAppointments
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button size="3" className="h-11 font-bold">
          View Future Appointments
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="relative font-bold">
        <Dialog.Close className="absolute right-4 top-4 cursor-pointer">
          <Cross2Icon />
        </Dialog.Close>

        <Flex direction="column" align="center" py="5">
          <Dialog.Title mb="5" size="8">
            Future Appointments
          </Dialog.Title>
          <Box mb="4">
            <Table.Root variant="surface" className="whitespace-nowrap">
              <Table.Header>
                <Table.Row className="bg-accent-11 text-3 text-[white]">
                  {['Date/Time', 'Appointment Type', 'Provider', 'Action'].map(
                    (heading) => (
                      <Table.ColumnHeaderCell align="center" key={heading}>
                        {heading}
                      </Table.ColumnHeaderCell>
                    ),
                  )}
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {upcomingAppointments.appointments.map((appointment) => (
                  <Table.Row key={appointment.id} className="text-3">
                    <Table.RowHeaderCell align="center">
                      {format(
                        formatDateToCst(new Date(appointment?.startDate)),
                        'MM/dd/yyyy hh:mm a',
                      )}
                    </Table.RowHeaderCell>

                    <Table.RowHeaderCell align="center">
                      {appointment.type === 'InPerson'
                        ? 'IN-PERSON'
                        : 'VIRTUAL'}
                    </Table.RowHeaderCell>

                    <Table.RowHeaderCell align="center">
                      {renderSpecialistName(
                        appointment?.specialist,
                      ).toLocaleUpperCase()}
                    </Table.RowHeaderCell>

                    <Table.RowHeaderCell align="center">
                      <Flex gap="2">
                        <Pencil2Icon color="black" height="18" width="18" />
                        <Cross2Icon color="black" height="18" width="18" />
                      </Flex>
                    </Table.RowHeaderCell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { FutureAppointmentsDialog }
