import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { HistoryButton } from './history-button'
import { SubstanceUseSaveButton } from './substance-use-save-button'

interface SubstanceUseHxHxHeaderProps {
  patientId: string
  getData: (schema: any) => QuickNoteSectionItem[]
}

const SubstanceUseHxHxHeader = ({
  patientId,
  getData,
}: SubstanceUseHxHxHeaderProps) => {
  return (
    <TabContentHeading title=" Substance Use Hx">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <HistoryButton />
        <SubstanceUseSaveButton patientId={patientId} getData={getData} />
      </Flex>
    </TabContentHeading>
  )
}

export { SubstanceUseHxHxHeader }
