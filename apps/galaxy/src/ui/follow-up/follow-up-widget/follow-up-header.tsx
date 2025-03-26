import { Flex, Text } from '@radix-ui/themes'
import { FollowupSaveButton } from './follow-up-save-button'

const FollowUpHeader = ({ appointmentId }: { appointmentId: string }) => (
  <Flex
    p="2"
    className="bg-[white] drop-shadow [box-shadow:0_4px_4px_0_#00000014]"
    justify="between"
  >
    <Text className="text-[16px] font-[600] text-accent-12">Follow Up</Text>
    <FollowupSaveButton appointmentId={appointmentId} />
  </Flex>
)

export { FollowUpHeader }
