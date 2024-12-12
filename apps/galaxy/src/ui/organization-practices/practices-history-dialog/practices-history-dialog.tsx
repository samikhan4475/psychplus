import { PropsWithRow, SelectCell } from '@/components'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { STATUS_CODESET } from '../constants'
import { PracticeDetails } from '../types'
import { HistoryDataTable } from './history-table'

const PracticesHistoryDialog = ({ row }: PropsWithRow<PracticeDetails>) => {
  // Will be removed after integration
  const dummyPracticesHistory = [
    {
      user: "John Doe",
      date: "2024-12-10 10:45",
      status: "Inactive",
    },
    {
      user: "Jane Smith",
      date: "2024-12-09 03:15",
      status: "Inactive",
    },
    {
      user: "Emily Johnson",
      date: "2024-12-08 09:30",
      status: "Inactive",
    },
  ];
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
              <HistoryDataTable data={dummyPracticesHistory} />
            </Flex>
          </Popover.Content>
        </Flex>
      </Popover.Root>
      <SelectCell
        options={STATUS_CODESET}
        className="bg-gray-3 text-gray-10 w-[100px]"
      />
    </Flex>
  )
}

export { PracticesHistoryDialog }
