import { Flex, Text } from '@radix-ui/themes'
import { WidgetHxButton } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HistoryButton } from './history'
import { HospitalInitialSaveButton } from './hospital-initial-save-button'

interface PhysicalExamHeaderProps {
  title: string
  patientId: string
  sectionName: QuickNoteSectionName
}

const HospitalHeader = ({
  title,
  patientId,
  sectionName,
}: PhysicalExamHeaderProps) => {
  return (
    <Flex className="ml-[-10px] mr-[20px] mt-[-20px] bg-accent-3" width="102%">
      <Flex
        justify="between"
        align="center"
        className="my-1 w-full bg-[white] py-1 pl-2 pr-4"
      >
        <Text className="text-[16px] font-[600]">{title}</Text>

        <Flex className="gap-x-2 text-[20px]" align="center">
          {/* <HistoryButton patientId={patientId} sectionName={sectionName} /> */}
          <WidgetHxButton />
          <HospitalInitialSaveButton />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { HospitalHeader }
