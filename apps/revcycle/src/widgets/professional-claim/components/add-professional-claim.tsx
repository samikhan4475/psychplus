import { Box, Flex } from '@radix-ui/themes'
import { Tabs } from '@psychplus/ui/tabs'
import {
  AdditionalInfoTab,
  AmbulanceInfoTab,
  CancelClaimButton,
  ChargesTab,
  ClaimTab,
  MoreActionsMenu,
  PrintActionsMenu,
  ReviewActionsMenu,
  SaveClaimButton,
} from '.'

const AddProfessionalClaim = () => {
  return (
    <>
      <Flex align="center" gap="2">
        <SaveClaimButton />
        <CancelClaimButton />
        <PrintActionsMenu />
        <ReviewActionsMenu />
        <MoreActionsMenu />
      </Flex>
      <Tabs.Root defaultValue="claim">
        <Tabs.List size="2">
          <Tabs.Trigger value="claim">Claim</Tabs.Trigger>
          <Tabs.Trigger value="charges">Charges</Tabs.Trigger>
          <Tabs.Trigger value="additionalInfo">Additional Info</Tabs.Trigger>
          <Tabs.Trigger value="ambulanceInfo">Ambulance Info</Tabs.Trigger>
        </Tabs.List>
        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="claim">
            <ClaimTab />
          </Tabs.Content>
          <Tabs.Content value="charges">
            <ChargesTab />
          </Tabs.Content>
          <Tabs.Content value="additionalInfo">
            <AdditionalInfoTab />
          </Tabs.Content>
          <Tabs.Content value="ambulanceInfo">
            <AmbulanceInfoTab />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </>
  )
}

export { AddProfessionalClaim }
