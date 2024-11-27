import { Button, Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { AddClinicScheduleButton } from './add-clinic-schedule-button'

const ClinicTimeHeader = () => {
  return (
    <TabContentHeading title="Clinic Time" className="border-white flex-1">
      <Flex flexGrow="1" justify="end" align="center">
        <Flex align="center" gap="2">
          <Button
            variant="outline"
            color="gray"
            size="1"
            className="text-black"
          >
            Active Clinic Visits
          </Button>
          <AddClinicScheduleButton />
        </Flex>
      </Flex>
    </TabContentHeading>
  )
}

export { ClinicTimeHeader }
