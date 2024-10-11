import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { XIcon } from 'lucide-react'
import { QuickNoteHistory } from '@/types'
import { ChartVisits } from './chart-visits'

interface ChartViewProps {
  data: QuickNoteHistory[]
  questionnaire?: string
}

const ChartView = ({ data, questionnaire }: ChartViewProps) => {
  return (
    <Tabs.Root defaultValue="7 Visits" className="flex w-full flex-col">
      <Flex mt="2" ml="2">
        <Tabs.List>
          <Flex gap="4">
            <TabsTrigger value="7 Visits">7 Visits</TabsTrigger>
            {data.length > 7 && (
              <TabsTrigger value="30 Visits">30 Visits</TabsTrigger>
            )}
            {data.length > 30 && (
              <TabsTrigger value="60 Visits">60 Visits</TabsTrigger>
            )}
          </Flex>
        </Tabs.List>
      </Flex>

      <TabsContent value="7 Visits">
        <ChartVisits data={data.slice(0, 7)} questionnaire={questionnaire} />
      </TabsContent>

      <TabsContent value="30 Visits">
        <ChartVisits data={data.slice(0, 30)} questionnaire={questionnaire} />
      </TabsContent>
      <TabsContent value="60 Visits">
        <ChartVisits data={data.slice(0, 60)} questionnaire={questionnaire} />
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
    className="border-b-4 border-l-0 border-r-0 border-t-0 border-transparent data-[state=active]:cursor-default data-[state=active]:border-b-4 data-[state=active]:border-b-[#0F6CBD] data-[state=active]:font-[500]"
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

export { ChartView }
