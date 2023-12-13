import { Box, Flex, Heading } from '@radix-ui/themes'
import {
  FEE_SCHEDULE_CONFIG_ENUM,
  FeeScheduleConfigCheckbox,
} from './fee-schedule-config-checkbox'

const FeeScheduleConfiguration = () => {
  return (
    <>
      <Box my="2">
        <Heading>Configuration</Heading>
      </Box>
      <Flex direction="column" gap="3">
        <FeeScheduleConfigCheckbox
          label="Apply based on payer, payer type, or patient type"
          value={FEE_SCHEDULE_CONFIG_ENUM.PAYER}
        />
        <FeeScheduleConfigCheckbox
          label="Apply based on location or provider"
          value={FEE_SCHEDULE_CONFIG_ENUM.LOCATION}
          disabled={true}
        />
        <FeeScheduleConfigCheckbox
          label="Apply based on place of service or type of service"
          value={FEE_SCHEDULE_CONFIG_ENUM.SERVICE}
          disabled={true}
        />
        <FeeScheduleConfigCheckbox
          label="Apply based on modifier"
          value={FEE_SCHEDULE_CONFIG_ENUM.MODIFIER}
          disabled={true}
        />
      </Flex>
    </>
  )
}

export { FeeScheduleConfiguration }
