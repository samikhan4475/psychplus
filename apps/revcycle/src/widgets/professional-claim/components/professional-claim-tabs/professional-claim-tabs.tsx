import { Box } from '@radix-ui/themes'
import { Tabs } from '@psychplus/ui/tabs'
import { AdditionalInfo } from '../additional-info/additional-info'
import { AmbulanceInfo } from '../ambulance-info/ambulance-info'
import { Charges } from '../charges/charges'
import { Claim } from '../claim/claim'

const ProfessionalClaimTabs = () => {
  return (
    <>
      <Box mb="7">
        <Tabs.Root defaultValue="claim">
          <Tabs.List size="2">
            <Tabs.Trigger value="claim">Claim</Tabs.Trigger>
            <Tabs.Trigger value="charges">Charges</Tabs.Trigger>
            <Tabs.Trigger value="additionalInfo">Additional Info</Tabs.Trigger>
            <Tabs.Trigger value="ambulanceInfo">Ambulance Info</Tabs.Trigger>
          </Tabs.List>

          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="claim">
              <Claim />
            </Tabs.Content>

            <Tabs.Content value="charges">
              <Charges />
            </Tabs.Content>

            <Tabs.Content value="additionalInfo">
              <AdditionalInfo />
            </Tabs.Content>

            <Tabs.Content value="ambulanceInfo">
              <AmbulanceInfo />
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
    </>
  )
}

export { ProfessionalClaimTabs }
