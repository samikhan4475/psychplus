import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { ChartView } from './chart-view'
import { SheetView } from './sheet-view'

const HistoryView = () => {
  return (
    <Tabs.Root defaultValue="SheetView" className="flex w-full flex-col">
      <Flex mt="2">
        <Tabs.List>
          <Flex gap="2">
            <TabsTrigger value="SheetView">Sheet View</TabsTrigger>
            <TabsTrigger value="DataView">Data View</TabsTrigger>
          </Flex>
        </Tabs.List>
      </Flex>

      <TabsContent value="SheetView">
        <SheetView />
      </TabsContent>

      <TabsContent value="DataView">
        <ChartView />
      </TabsContent>
    </Tabs.Root>
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
    className="bg-white rounded-2 border border-accent-6 px-2 py-0.5 text-[12px] text-gray-12 first:border-l data-[state=active]:cursor-default data-[state=active]:border-gray-5 data-[state=active]:bg-accent-4 data-[state=active]:font-[500] data-[state=active]:text-accent-12"
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

const TabsContent = ({
  value,
  children,
  className,
}: {
  value: string
  children: React.ReactNode
  className?: string
}) => {
  return (
    <Tabs.Content className={className} value={value}>
      {children}
    </Tabs.Content>
  )
}

export { HistoryView }
