import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { SubstanceUseSaveButton } from './substance-use-save-button'

const SubstanceUseHxHxHeader = () => {
  return (
    <TabContentHeading title="Substance Use Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <SubstanceUseSaveButton />
      </Flex>
    </TabContentHeading>
  )
}

export { SubstanceUseHxHxHeader }
