import { Box, Tabs, Text } from '@radix-ui/themes'
import { AddClaimForm } from '@/widgets/claim-form/components'
import { ClaimTable } from '@/widgets/claim-table/components'
import './style.css'

const ClaimView = () => {
  return (
    <Box mb="7">
      <Tabs.Root defaultValue="Claims">
        <Tabs.List className="bg-[#f0f4ff]">
          <Tabs.Trigger
            className="border-r-1 border-b-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Claims"
          >
            Claims
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Submission"
          >
            Submission
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Ins. Payment"
          >
            Ins. Payment
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Patient Payment"
          >
            Patient Payment
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Patient Statement"
          >
            Patient Statement
          </Tabs.Trigger>
          <Tabs.Trigger
            className="border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]"
            value="Claim#222"
          >
            Claim#15543534
          </Tabs.Trigger>
        </Tabs.List>
        <Box px="4" pt="3" pb="2">
          <Tabs.Content value="Claims">
            <ClaimTable />
          </Tabs.Content>
          <Tabs.Content value="Submission">
            <Text size="2"> Submission Content will come here</Text>
          </Tabs.Content>
          <Tabs.Content value="Ins. Payment">
            <Text size="2">Ins. Payment Content will come here</Text>
          </Tabs.Content>
          <Tabs.Content value="Patient Payment">
            Patient Payment Content will come here
          </Tabs.Content>
          <Tabs.Content value="Patient Statement">
            Patient Statement Content will come here
          </Tabs.Content>
          <Tabs.Content value="Claim#222">
            <AddClaimForm />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </Box>
  )
}

export { ClaimView }
