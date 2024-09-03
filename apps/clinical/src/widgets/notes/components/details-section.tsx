import { useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import { SignIcon, WarningIcon } from '@/components/icons'
import { NoteIcon } from '@/components/icons/note-icon'
import { useRowSelectionContext } from '../context'
import { ActionButton } from './action-button'
import { AddendumForm } from './addendum-form'
import { NoteDetail } from './note-detail'

const DetailsSection = () => {
  const [addAddendum, setAddAddendum] = useState<boolean>(false)
  const { selectedRow } = useRowSelectionContext()

  return (
    <>
      <Flex wrap="wrap" className="gap-2 border-b border-[#DDDDE3] px-4 py-2.5">
        <Heading className="text-[18px] font-[590]">Details</Heading>
        <ActionButton mode="primary">
          <SignIcon width={16} height={16} />
          Send to Sign
        </ActionButton>
        <ActionButton mode="ghost" variant="outline">
          Send to Sign
        </ActionButton>
        <ActionButton mode="ghost" variant="outline">
          <WarningIcon width={16} height={16} />
          Mark as Error
        </ActionButton>
        <ActionButton
          mode="ghost"
          variant="outline"
          onClick={() => setAddAddendum(true)}
        >
          <PlusIcon color="#8B8D98" width={16} height={16} />
          Addendum
        </ActionButton>
        <ActionButton mode="ghost" variant="outline">
          <Trash2 color="#8B8D98" width={16} height={16} />
          Remove Cosigner
        </ActionButton>
      </Flex>
      {selectedRow === undefined ? (
        <Flex direction="column" align="center" className="gap-y-1.5 pt-[15px]">
          <NoteIcon width={24} height={24} />
          <Text className="w-full text-center text-[14px] text-[#60646C]">
            Please select Note to see details
          </Text>
        </Flex>
      ) : (
        <NoteDetail>
          {addAddendum ? (
            <AddendumForm onCancel={() => setAddAddendum(false)} />
          ) : null}
        </NoteDetail>
      )}
    </>
  )
}

export { DetailsSection }
