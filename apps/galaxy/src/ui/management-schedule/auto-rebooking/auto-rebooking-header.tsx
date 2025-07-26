import { Button } from '@radix-ui/themes'
import { SaveIcon } from 'lucide-react'
import { TabContentHeading } from '@/components'

interface AutoRebookingHeaderProps {
  onClickHandler: () => void
}

const AutoRebookingHeader = ({ onClickHandler }: AutoRebookingHeaderProps) => {
  return (
    <TabContentHeading title="Auto-Rebooking" className="border-white flex-1">
      <Button
        size="1"
        highContrast
        className="flex items-center gap-1"
        onClick={onClickHandler}
      >
        <SaveIcon size={14} />
        Save
      </Button>
    </TabContentHeading>
  )
}

export { AutoRebookingHeader }
