import { Flex, Heading, Popover, Text } from '@radix-ui/themes'
import { EditVisitDetailsButton } from './edit-visit-details-button'
import { OpenPatientChartButton } from './open-patient-chart-button'
import { VisitTypeDropdown } from './visit-type-dropdown'

const VisitDetailsPopover = ({ children }: React.PropsWithChildren) => {
  return (
    <Popover.Root>
      <Popover.Trigger>{children}</Popover.Trigger>
      <Popover.Content>
        <Flex direction="column">
          <Flex gap="3">
            <Heading className="text-[20px]">Visit Details</Heading>
            <Flex align="center">
              <Text>Visit Status</Text>
              <VisitTypeDropdown />
            </Flex>
            <Flex gap="2" align="center">
              <OpenPatientChartButton />
              <EditVisitDetailsButton />
            </Flex>
          </Flex>
          <Flex className="text-[14px]">
            <Text>Marina, Robert</Text>
            <Text className="text-gray">4/03/24 00:00</Text>
          </Flex>
          <Flex direction="column">
            <Flex justify="between">
              <Flex gap="1">
                <Text>State</Text>
                <Text className="text-gray">Texas</Text>
              </Flex>
              <Flex gap="1">
                <Text>Location</Text>
                <Text>Willowbrookclinic</Text>
              </Flex>
            </Flex>
            <Flex justify="between">
              <Flex gap="1">
                <Text>Service</Text>
                <Text>Initial appointment</Text>
              </Flex>
              <Flex gap="1">
                <Text>Provider Type</Text>
                <Text>Therapist</Text>
              </Flex>
            </Flex>
            <Flex justify="between">
              <Flex gap="1">
                <Text>Provider Name</Text>
                <Text>Dr. John Smith</Text>
              </Flex>
              <Flex gap="1">
                <Text>Visit Type</Text>
                <Text>New Pt, Psychotherapy</Text>
              </Flex>
            </Flex>
            <Flex justify="between">
              <Flex gap="1">
                <Text>Appointment Date</Text>
                <Text>4/03/24</Text>
              </Flex>
              <Flex gap="1">
                <Text>Appointment Time</Text>
                <Text>05:00- 05:20</Text>
              </Flex>
            </Flex>
            <Flex justify="between">
              <Flex gap="1">
                <Text>Duration</Text>
                <Text>60 mins</Text>
              </Flex>
              <Flex gap="1">
                <Text>Frequency</Text>
                <Text>Once</Text>
              </Flex>
            </Flex>
            <Flex>
              <Flex gap="1">
                <Text>Apt Verification</Text>
                <Text>Pending</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Popover.Content>
    </Popover.Root>
  )
}

export { VisitDetailsPopover }
