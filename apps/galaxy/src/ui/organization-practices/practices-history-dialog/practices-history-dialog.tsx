import { useState } from 'react'
import { useParams } from 'next/navigation'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { Practice } from '@/ui/organization-practice/types'
import { updatePracticeAction } from '../actions'
import { STATUS_CODESET } from '../constants'
import { HistoryDataTable } from './history-table'

const PracticesHistoryDialog = ({ row }: PropsWithRow<Practice>) => {
  const [currentStatus, setCurrentStatus] = useState(row.original.recordStatus)
  const { id } = useParams<{ id: string }>()

  const handleStatusChange = async (status: string) => {
    setCurrentStatus(status)
    const response = await updatePracticeAction(
      {
        ...row.original,
        recordStatus: status,
      },
      id,
      row.original?.id,
    )

    if (response.state === 'error') {
      setCurrentStatus(row.original.recordStatus)
      toast.error(response.error)
      return
    }
    toast.success('Status updated successfully')
  }

  return (
    <Flex>
      <Popover.Root>
        <Flex align="center" gap="1" p="1" width="100%">
          <Popover.Trigger>
            <CounterClockwiseClockIcon className="text-black cursor-pointer" />
          </Popover.Trigger>
          <Popover.Content className="min-w-[373px] rounded-[10px] p-2 shadow-2">
            <Flex className="w-full gap-1.5" direction="column">
              <Flex justify="between" align="center" gap="2">
                <Heading size="4">Status Hx</Heading>
                <Popover.Close>
                  <X
                    size={24}
                    strokeWidth={2}
                    className="text-black cursor-pointer"
                  />
                </Popover.Close>
              </Flex>
              <HistoryDataTable id={row.original.id} />
            </Flex>
          </Popover.Content>
        </Flex>
      </Popover.Root>
      <SelectCell
        options={STATUS_CODESET}
        className="w-[100px] bg-gray-3 text-gray-10"
        onValueChange={handleStatusChange}
        value={currentStatus}
        disabled
      />
    </Flex>
  )
}

export { PracticesHistoryDialog }
