import { Flex } from '@radix-ui/themes'
import type { FieldValues } from 'react-hook-form'
import { TabContentHeading, WidgetSaveButton } from '@/components'
import { ClearButton } from './clear-button'

interface Props<T extends FieldValues> {
  heading: string
  getInitialValues?: () => T
}

const NeuroPsychWidgetHeader = <T extends FieldValues>({
  heading,
  getInitialValues,
}: Props<T>) => {
  return (
    <TabContentHeading title={heading} className="sticky top-0 z-[11]">
      <Flex align="center" justify="end" gap="1" className="flex-1">
        <ClearButton<T> getInitialValues={getInitialValues} />
        <WidgetSaveButton shouldCheckPermission variant="filled" />
      </Flex>
    </TabContentHeading>
  )
}

export { NeuroPsychWidgetHeader }
