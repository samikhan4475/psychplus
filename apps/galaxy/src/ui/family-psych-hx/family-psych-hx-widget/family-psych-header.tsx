import { Flex } from '@radix-ui/themes'
import { TabContentHeading, WidgetSaveButton } from '@/components'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'

const PastFamilyHeader = () => {
  const { isQuickNoteView } = useQuickNoteUpdate()

  return (
    <TabContentHeading title="Family Psych History">
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <WidgetSaveButton
          variant={isQuickNoteView ? 'outline' : 'filled'}
          shouldCheckPermission
        />
      </Flex>
    </TabContentHeading>
  )
}

export { PastFamilyHeader }
