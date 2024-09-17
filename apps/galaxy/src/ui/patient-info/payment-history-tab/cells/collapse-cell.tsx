'use client'

import { Button, Flex } from '@radix-ui/themes'
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { PropsWithRow } from '@/components'
import { PaymentHistory } from '../types'

const CollapseCell = ({ row }: PropsWithRow<PaymentHistory>) => {
  return (
    <Flex
      justify="center"
      align="center"
      width="100%"
      height="100%"
      overflow="hidden"
    >
      {row.depth > 0 ? null : (
        <Button
          {...{
            onClick: row.getToggleExpandedHandler(),
          }}
          className="text-black !outline-none"
          type="button"
          variant="ghost"
          color="gray"
          size="1"
        >
          {row.getIsExpanded() ? (
            <ChevronDownIcon size={16} />
          ) : (
            <ChevronRightIcon size={16} />
          )}
        </Button>
      )}
    </Flex>
  )
}

export { CollapseCell }
