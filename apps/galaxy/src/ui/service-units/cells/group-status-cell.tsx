import { useState } from 'react'
import { useParams } from 'next/navigation'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import toast from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { updateServiceUnitAction } from '../actions'
import { GROUP_STATUSES } from '../constants'
import { HxListTable } from '../hx-list-table'
import { useStore } from '../store'
import { ServiceUnit } from '../types'

const ServiceUnitHistoryDialog = ({ row }: PropsWithRow<ServiceUnit>) => {
  const { id } = useParams<{ id: string }>()
  const [status, setStatus] = useState(row.original.resourceStatus)
  const [loading, setLoading] = useState(false)
  const { search, page } = useStore((state) => ({
    search: state.search,
    page: state.page,
  }))

  const onStatusChange = async (value: string) => {
    setLoading(true)
    setStatus(value)
    const response = await updateServiceUnitAction(
      {
        ...row.original,
        resourceStatus: value,
      },
      row.original.locationId,
      row.original.serviceId,
      row.original.id,
    )
    if (response.state === 'error') {
      setStatus(row.original.resourceStatus)
      toast.error(response.error)
      setLoading(false)

      return
    }

    toast.success('Status updated successfully')
    search({ serviceId: id }, page, true)
    setLoading(false)
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
              <HxListTable
                unitId={row.original.id}
                locationId={row.original.locationId}
              />
            </Flex>
          </Popover.Content>
        </Flex>
      </Popover.Root>
      <SelectCell
        options={GROUP_STATUSES}
        className="min-w-[125px] flex-1"
        onValueChange={onStatusChange}
        value={status}
        disabled={loading}
      />
    </Flex>
  )
}

export { ServiceUnitHistoryDialog }
