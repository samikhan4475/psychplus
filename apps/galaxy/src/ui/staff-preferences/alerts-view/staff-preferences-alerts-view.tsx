'use client'

import { Box, Grid, Text } from '@radix-ui/themes'
import { AllowDoubleBookingTimeDependentRadio } from './allow-double-booking-time-dependent-radio'
import { MinutesLeftFromPatientRadio } from './minutes-left-from-patient-radio'
import { PatientIsInRoomRadio } from './patient-is-in-room-radio'
import { ShowNeitherOnTherapyTimeDependentVisitsRadio } from './show-neither-on-therapy-time-dependent-visits-radio'

const StaffPreferencesAlertsView = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  return (
    <>
      <Box className="bg-gray-3 px-3 py-1 text-1 font-medium">Alerts</Box>
      <Grid columns="3" gap="2" px="3" py="2">
        <Box className="border-pp-gray-2 rounded col-span-2 grid grid-cols-3 border">
          <Box className="border-pp-gray-2 col-span-2 border-b border-r pl-1">
            <Text size="1">When patient is in room</Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center border-b first:border-b">
            <PatientIsInRoomRadio isAdminView={isAdminView} />
          </Box>
          <Box className="border-pp-gray-2 col-span-2 border-b border-r pl-1">
            <Text size="1">
              When a patient is scheduled for a visit and the visit is less than
              ___ minutes from the scheduled time.
            </Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center border-b first:border-b">
            <MinutesLeftFromPatientRadio isAdminView={isAdminView} />
          </Box>
          <Box className="border-pp-gray-2 col-span-2 border-b border-r pl-1">
            <Text size="1">
              Show “Neither” on Therapy Add On code section for Time-Dependent
              Visits
            </Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center border-b first:border-b">
            <ShowNeitherOnTherapyTimeDependentVisitsRadio
              isAdminView={isAdminView}
            />
          </Box>
          <Box className="border-pp-gray-2 col-span-2 border-r pl-1">
            <Text size="1">
              Allow double booking over unconfirmed timed dependent visits
            </Text>
          </Box>
          <Box className="border-pp-gray-2 col-span-1 flex items-center">
            <AllowDoubleBookingTimeDependentRadio isAdminView={isAdminView} />
          </Box>
        </Box>
        <br />
      </Grid>
    </>
  )
}

export { StaffPreferencesAlertsView }
