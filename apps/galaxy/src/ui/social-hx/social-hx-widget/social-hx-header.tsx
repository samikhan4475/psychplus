import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { HistoryButton } from './history-button'
import { SocialSaveButton } from './social-save-button'


interface SocialHxHeaderProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}
const SocialHxHeader = ({ patientId, getData }: SocialHxHeaderProps) => {
  return (
    <TabContentHeading title="Social Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <SocialSaveButton patientId={patientId} getData={getData} />

      </Flex>
    </TabContentHeading>
  )
}

export { SocialHxHeader }
