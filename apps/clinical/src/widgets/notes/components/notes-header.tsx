import { Flex, Heading } from '@radix-ui/themes'
import { PrinterIcon, SignIcon } from '@/components/icons'
import { ActionButton } from './action-button'
import { useRouter, useSearchParams } from 'next/navigation'

const NotesHeader = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  return (
    <Flex
      justify="between"
      className="px-2 py-1 [box-shadow:0_4px_4px_0_#00000014]"
    >
      <Heading className="text-[20px] text-[#1C2024]">Notes</Heading>
      <Flex className="gap-x-2">
        <ActionButton
          mode="ghost"
          variant="outline"
          className="gap-x-[3px] rounded-[2px]"
        >
          <PrinterIcon width={16} height={16} />
          Print
        </ActionButton>
        <ActionButton mode="primary" className="rounded-[2px]" onClick={() => router.push(`/widgets/create-note?token=${token}`)}>
          <SignIcon width={16} height={16} />
          Create New Note
        </ActionButton>
      </Flex>
    </Flex>
  )
}

export { NotesHeader }
