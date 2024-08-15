import { Select } from '@psychplus/ui/select'
import { Box, Button, Flex, Tabs, Text } from '@radix-ui/themes'
import { SubmissionTable } from './submission-table/submission-table'
import './style.css'

const SubmissionView = () => {
  return (
    <>
      <Flex
        py="1"
        justify="between"
        className="border  border-[#b9b3b322] bg-[#fefdfd] shadow-lg px-3"
      >
        <Text size="5" weight="bold">Submission</Text>
        <Flex justify="between" align="center" gap="2">
          <Text size="3" weight="bold">Clearinghouse</Text>
          <Select.Root size="2" defaultValue="Change Healthcare" disabled>
            <Select.Trigger />
            <Select.Content>
              <Select.Group>
                <Select.Item value="Change Healthcare">Change Healthcare</Select.Item>
                <Select.Item value="Change Paper">Change Paper</Select.Item>
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Button className="h-25 ml-2 bg-[#151B4A] text-[#fff]" disabled>
            Submit
          </Button>
        </Flex>
      </Flex>
      <Box mb="7">
        <Tabs.Root className='submission' defaultValue="Electronic Submission">
          <Tabs.List>
            <Tabs.Trigger
              value="Electronic Submission"
            >
              Electronic Submission
            </Tabs.Trigger>
            <Tabs.Trigger
              value="Paper Submission"
            >
              Paper Submission
            </Tabs.Trigger>
            <Tabs.Trigger
              value="Submission History"
            >
              Submission History
            </Tabs.Trigger>
          </Tabs.List>
          <Box px="4" pt="3" pb="2">
            <Tabs.Content value="Electronic Submission">
              <SubmissionTable type="electronic" />
            </Tabs.Content>
            <Tabs.Content value="Paper Submission">
              <SubmissionTable type="paper" />
            </Tabs.Content>
            <Tabs.Content value="Submission History">
              <Text size="2">Submission History Content will come here</Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
    </>
  )
}

export { SubmissionView }
