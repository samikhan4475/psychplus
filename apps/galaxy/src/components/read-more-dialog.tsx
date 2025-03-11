import { Button, Popover, ScrollArea, Text } from '@radix-ui/themes'
import { QuickNoteSectionItem } from '@/types'

interface ReadMoreDialogProps {
  title?: string
  data?: QuickNoteSectionItem[]
}
const ReadMoreDialog = ({
  title = 'Read More',
  data = [],
}: ReadMoreDialogProps) => {
  if (data.length <= 1) {
    return null
  }
  return (
    <Popover.Root>
      <Popover.Trigger>
        <Button
          variant="ghost"
          size="1"
          color="gray"
          className="!m-0"
          highContrast
        >
          {title}
        </Button>
      </Popover.Trigger>
      <Popover.Content
        minWidth="250px"
        minHeight="200px"
        className="max-w-[36vw] !p-0"
        align="start"
        side="right"
      >
        <ScrollArea
          className="h-full max-h-64 w-full p-2"
          scrollbars="vertical"
        >
          <Text size="1" className="whitespace-pre-wrap break-words">
            {data?.map((item) => item?.sectionItemValue)?.join('')}
          </Text>
        </ScrollArea>
      </Popover.Content>
    </Popover.Root>
  )
}

export { ReadMoreDialog }
