import { TabContentHeading } from '@/components'
import { Flex } from '@radix-ui/themes'
import { CredentialingListing } from './credentialing-listing'
import { SaveButton } from './save-button'

const CredentialingTabView = () => {
  return (
    <Flex direction="column" className="gap-0.5">
      <TabContentHeading title="Credentialing">
        <SaveButton />
      </TabContentHeading>
      <CredentialingListing />
    </Flex>
  )
}

export { CredentialingTabView }
