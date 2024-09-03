import { PropsWithChildren } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { SignIcon, WarningIcon } from '@/components/icons'
import { ActionButton } from './action-button'

const LeftPanelActions = ({ children }: PropsWithChildren) => {
  return (
    <Flex wrap="wrap" className="gap-2 pl-2 pt-2">
      <ActionButton mode="primary">
        <SignIcon />
        Send to Cosigner
      </ActionButton>
      <ActionButton mode="ghost" variant="outline">
        <WarningIcon />
        Mark as Error
      </ActionButton>
      <ActionButton mode="ghost" variant="outline">
        <PlusIcon color="#8B8D98" width={16} height={16} />
        Addendum
      </ActionButton>
      <ActionButton mode="ghost" variant="outline">
        <Trash2 color="#8B8D98" width={16} height={16} />
        Remove Cosigner
      </ActionButton>
      {children}
    </Flex>
  )
}

export { LeftPanelActions }
