import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { ListIcon, XIcon } from 'lucide-react'

const VitalsTabsList = () => {
  return (
    <Tabs.List>
      <Flex gap="2">
        <Flex gap="2">
          <TabsTrigger value="SheetView">
            <Flex align="center" gap="2">
              <ListIcon size={16} />
              Sheet View
            </Flex>
          </TabsTrigger>
        </Flex>
        {/* <Flex gap="2">
          <TabsTrigger value="DataView">
            <Flex align="center" gap="2">
              <ListIcon size={16} />
              Data View
            </Flex>
          </TabsTrigger>
        </Flex> */}
      </Flex>
    </Tabs.List>
  )
}

interface TabsTriggerProps {
  value: string
  children: React.ReactNode
  onClose?: () => void
}

const TabsTrigger = ({ value, children, onClose }: TabsTriggerProps) => (
  <Tabs.Trigger
    value={value}
    className="bg-white data-[state=active]:border-pp-focus-bg data-[state=active]:bg-pp-focus-bg rounded-2 border border-gray-6 px-2 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:font-[500] data-[state=active]:text-accent-12"
  >
    <Flex align="center" gap="2">
      {children}
      {onClose ? (
        <Flex
          align="center"
          justify="center"
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

export { VitalsTabsList }
