import { useParams } from 'next/navigation'
import { Flex, Text } from '@radix-ui/themes'
import { WidgetSaveButton } from '@/components'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { HistoryButton } from '../history'

const UdsHeader = () => {
  const patientId = useParams().id as string
  return (
    <Flex
      justify="between"
      align="center"
      className="bg-white rounded-b-[4px] px-2 py-1 pr-3 shadow-2"
    >
      <Text className="flex items-center gap-x-[11px] text-[20px] font-bold">
        Urine Drug Screen
      </Text>
      <Flex className="gap-x-2 text-[20px]" align="center">
        <HistoryButton
          sectionName={QuickNoteSectionName.QuicknoteSectionUds}
          patientId={patientId}
        />
        <WidgetSaveButton variant="filled" />
      </Flex>
    </Flex>
  )
}

export { UdsHeader }
