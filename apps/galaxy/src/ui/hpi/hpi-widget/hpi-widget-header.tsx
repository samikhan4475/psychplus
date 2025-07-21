import { TabContentHeading, WidgetSaveButton } from '@/components'
import { Appointment } from '@/types'
import { Flex } from '@radix-ui/themes'
import { ClearButton } from './clear-button'
import { HistoryButton } from './history-button'

const HpiWidgetHeader = ({ patientId, appointment }: { patientId: string, appointment: Appointment }) => {

  return (
    <TabContentHeading
      title="HPI/Presenting Symptoms"
      className="sticky top-0 z-[11]"
    >
      <Flex align="center" justify="end" gap="1" className="flex-1">
        <HistoryButton patientId={patientId} appointment={appointment} />
        <ClearButton shouldCheckPermission />
        <WidgetSaveButton shouldCheckPermission variant="filled" />
      </Flex>
    </TabContentHeading>
  )
}

export { HpiWidgetHeader }
