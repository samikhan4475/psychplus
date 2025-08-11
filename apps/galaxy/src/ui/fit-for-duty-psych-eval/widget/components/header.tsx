import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'
import { ClearButton } from '@/ui/hpi/hpi-widget/clear-button'

interface Props {
  heading: string
}

const NeuroPsychWidgetHeader = ({ heading }: Props) => {
  return (
    <TabContentHeading title={heading} className="sticky top-0 z-[11]">
      <Flex align="center" justify="end" gap="1" className="flex-1">
        <ClearButton shouldCheckPermission />
        <WidgetSaveButton shouldCheckPermission variant="filled" />
      </Flex>
    </TabContentHeading>
  )
}

export { NeuroPsychWidgetHeader }
