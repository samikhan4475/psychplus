import { CodesetSelectCell, PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { CounterClockwiseClockIcon } from '@radix-ui/react-icons'
import { Flex, Heading, Popover } from '@radix-ui/themes'
import { X } from 'lucide-react'
import { Credentialing } from '../../types'

const CredentialingHistoryDialog = ({ row }: PropsWithRow<Credentialing>) => {
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
      <CodesetSelectCell
        codeset={CODESETS.RecordStatus}
        className="flex-1 min-w-[125px]"
      />
    </Flex>
  )
}

export { CredentialingHistoryDialog }
