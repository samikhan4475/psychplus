import { ReceiverTable } from '@/widgets/clearing-house-receiver-list/components'
import { SubmitterServer } from '@/widgets/submitter'
import { Box, Tabs } from '@radix-ui/themes'
import './style.css'

const ClearingHouse = () => {

    return (
        <Box mb="7">
            <Tabs.Root defaultValue="Receiver">
                <Tabs.List className='bg-[#f0f4ff]'>
                    <Tabs.Trigger className='border-r-1 border-b-0 border-solid border-[#c0cef8] bg-[#d9e2fc]' value="Receiver">Receiver</Tabs.Trigger>
                    <Tabs.Trigger className='border-b-0 border-l-0 border-solid border-[#c0cef8] bg-[#d9e2fc]' value="Submitter">Submitter</Tabs.Trigger>
                </Tabs.List>

                <Box px="4" pt="3" pb="2">
                    <Tabs.Content value="Receiver">
                        <ReceiverTable />
                    </Tabs.Content>

                    <Tabs.Content value="Submitter">
                        <SubmitterServer />
                    </Tabs.Content>
                </Box>
            </Tabs.Root>
        </Box>
    )
}

export { ClearingHouse }
