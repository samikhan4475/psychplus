import { CodingPOSWidgetClient } from '@/widgets/coding-pos'
import { CptmasterfeeServer } from '@/widgets/cptmasterfee/cptmasterfee.server'
import { Box, Tabs } from '@radix-ui/themes'
import './style.css'

const Coding = () => {
  return (
    <Box>
      <Tabs.Root defaultValue="CPT">
        <Tabs.List className="bg-[#f0f4ff]">
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="CPT"
          >
            CPT
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="POS"
          >
            POS
          </Tabs.Trigger>
        </Tabs.List>
        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="CPT">
            <CptmasterfeeServer />
          </Tabs.Content>
          <Tabs.Content value="POS">
            <CodingPOSWidgetClient />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  )
}

export { Coding }

