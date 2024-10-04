import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'

const TabsTrigger = ({
  value,
  children,
  onClose,
}: {
  value: string
  children: React.ReactNode
  onClose?: () => void
}) => (
  <Tabs.Trigger
    value={value}
    className="bg-white data-[state=active]:border-pp-focus-bg data-[state=active]:bg-pp-focus-bg rounded-2 border border-gray-6 px-2 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:font-[500] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="1">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
          className="rounded-full hover:text-black h-[18px] w-[18px] cursor-pointer text-gray-11 transition-colors hover:bg-gray-3"
          onPointerDown={(e) => {
            e.preventDefault()
          }}
          onClick={onClose}
        >
          <XIcon width={14} height={14} strokeWidth={1.5} />
        </Flex>
      ) : null}
    </Flex>
  </Tabs.Trigger>
)

export { TabsTrigger }
