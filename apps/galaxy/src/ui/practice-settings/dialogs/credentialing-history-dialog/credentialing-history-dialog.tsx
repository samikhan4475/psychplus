import { useState } from 'react'
import { useParams } from 'next/navigation'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { PropsWithRow, SelectCell } from '@/components'
import { updateCredentialingManagerAction } from '../../actions'
import { CredentialingManager } from '../../types'

const statuses = [
  { value: 'Active', label: 'Active' },
  { value: 'Inactive', label: 'Inactive' },
]

const CredentialingHistoryDialog = ({
  row,
}: PropsWithRow<CredentialingManager>) => {
  const { id } = useParams<{ id: string; type: string }>()
  const [status, setStatus] = useState(row.original.status)
  const [loading, setLoading] = useState(false)

  const onStatusChange = async (value: string) => {
    setLoading(true)
    const result = await updateCredentialingManagerAction(id, row.original.id, {
      ...row.original,
      status: value,
    })
    if (result.state === 'error') {
      toast.error(result.error)
      setLoading(false)
      return
    }
    toast.success('Status Updated Successfully')
    setStatus(value)
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
            </Flex>
          </Popover.Content>
        </Flex>
      </Popover.Root>
      <SelectCell
        options={statuses}
        className="min-w-[125px] flex-1"
        onValueChange={onStatusChange}
        value={status}
        disabled={loading}
      />
    </Flex>
  )
}

export { CredentialingHistoryDialog }
