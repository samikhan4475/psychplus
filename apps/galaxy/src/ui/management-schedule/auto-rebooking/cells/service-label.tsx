import { Flex, Text } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { ServiceVisit } from '../types'

const ServiceLabel = ({ row }: PropsWithRow<ServiceVisit>) => {
  const hasChildren = row.original.subRows && row.original.subRows.length > 0
  const isExpanded = row.getIsExpanded()

  return (
    <Flex align="center" gap="1">
      {hasChildren && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            row.toggleExpanded()
          }}
          className="hover:bg-gray-200 rounded flex h-4 w-4 items-center justify-center"
        >
          {isExpanded ? (
            <ChevronDownIcon className="h-3 w-3" />
          ) : (
            <ChevronRightIcon className="h-3 w-3" />
          )}
        </button>
      )}
      {!hasChildren && <div className="w-4" />}
      <Text size="1" className="text-black font-[400]">
        {row.original.label.replaceAll('_', ' ')}
      </Text>
    </Flex>
  )
}

export { ServiceLabel }
