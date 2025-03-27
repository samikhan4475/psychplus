'use client'

import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { DayIsFullDoNotAllowCheckbox } from './day-is-full-do-not-allow-checkbox'
import { DayIsFullDoNotShowCheckbox } from './day-is-full-do-not-show-checkbox'
import { MinutesLeftDoNotAllowRadio } from './minutes-left-do-not-allow-radio'
import { MinutesLeftDoNotShowRadio } from './minutes-left-do-not-show-radio'

const StaffPreferencesPublicView = ({
  isAdminView,
}: {
  isAdminView: boolean
}) => {
  return (
    <>
      <Box className="bg-gray-3 px-3 py-1 text-1 font-medium">
        Personal Info
      </Box>
      <Flex direction="column">
        <Grid columns="2" gap="2">
          <Box pl="3">
            <Text size="1">
              Once the amount of mins left prior to start of visit, do not show
              on public view
            </Text>
          </Box>
          <Box>
            <MinutesLeftDoNotShowRadio isAdminView={isAdminView} />
          </Box>
        </Grid>
        <Grid columns="2" gap="2" className="bg-pp-bg-table-cell">
          <Box pl="3">
            <Text size="1">
              Once the amount of mins left prior to start of visit, do not allow
              staff to book that day of unless have permission?
            </Text>
          </Box>
          <Box>
            <MinutesLeftDoNotAllowRadio isAdminView={isAdminView} />
          </Box>
        </Grid>
        <Grid columns="2" gap="2">
          <Box pl="3">
            <Text size="1">
              Once the day is full following %, do not show on public view?
            </Text>
          </Box>
          <Box>
            <DayIsFullDoNotShowCheckbox isAdminView={isAdminView} />
          </Box>
        </Grid>
        <Grid columns="2" gap="2" className="bg-pp-bg-table-cell">
          <Box pl="3">
            <Text size="1">
              Once the day is full following %, do not allow staff to book that
              day of unless have permission?
            </Text>
          </Box>
          <Box>
            <DayIsFullDoNotAllowCheckbox isAdminView={isAdminView} />
          </Box>
        </Grid>
      </Flex>
    </>
  )
}

export { StaffPreferencesPublicView }
