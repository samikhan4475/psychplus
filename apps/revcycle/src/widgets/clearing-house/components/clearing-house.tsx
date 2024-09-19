import { Box, Tabs } from '@radix-ui/themes'
import { ClearingHouseReceiverListWidgetClient } from '@/widgets/clearing-house-receiver-list/clearing-house-receiver-list-widget.client'
import { ClearingHouseSubmitterServer } from '@/widgets/clearing-house-submitter'
import { useStore } from '../store'
import './style.css'
import { EDIList } from '../clearing-house-insurance-plan-edi/components'

const ClearingHouse = ({ googleApiKey }: { googleApiKey: string }) => {
  const usStatesCodeSets = useStore((state) => state.usStatesCodeSets)
  return (
    <Box mb="7">
      <Tabs.Root defaultValue="Receiver">
        <Tabs.List className="bg-[#f0f4ff]">
          <Tabs.Trigger
            className="border-r-1 border-b-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Receiver"
          >
            Receiver
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Submitter"
          >
            Submitter
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Ins. Plan"
          >
            Ins. Plan EDI
          </Tabs.Trigger>
        </Tabs.List>
        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="Receiver">
            <ClearingHouseReceiverListWidgetClient
              googleApiKey={googleApiKey}
              usStatesCodeSetsProp={usStatesCodeSets}
            />
          </Tabs.Content>
          <Tabs.Content value="Submitter">
            <ClearingHouseSubmitterServer googleApiKey={googleApiKey} />
          </Tabs.Content>
          <Tabs.Content value="Ins. Plan">
            <EDIList />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  )
}

export { ClearingHouse }
