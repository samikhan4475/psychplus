import { SignIcon, SaveIcon, CopyIcon, PrinterIcon } from '@/components/icons'
import { UploadIcon } from '@radix-ui/react-icons'
import { Box, Flex, Heading, Text, Button } from '@radix-ui/themes'

const PageHeader = ({
  title,
}: {
  title: string
}) => (
  <Box className="bg-[#ffffff] py-1.5 px-2 rounded-[2px] mb-[1px]">
    <Flex width="100%" justify="between" align="center">
        <Heading className="text-[14px]">
            {title}
        </Heading>

        <Flex gap="2" align="center">
            <Button variant="outline" color="gray" className="cursor-pointer text-[12px] font-[400] border border-[#9E9898] text-[9E9898]">
                <PrinterIcon /> Print
            </Button>

            <Button variant="outline" color="gray" className="cursor-pointer text-[12px] font-[400] border border-[#9E9898] text-[9E9898]">
                <CopyIcon /> Copy Previous
            </Button>

            <Button className="bg-[#151B4A] cursor-pointer text-[12px] font-[400]">
                <SaveIcon /> Save
            </Button>

            <Button className="bg-[#151B4A] cursor-pointer text-[12px] font-[400]">
                <UploadIcon /> Upload
            </Button>

            <Button className="bg-[#151B4A] cursor-pointer text-[12px] font-[400]">
                <SignIcon /> Sign
            </Button>
        </Flex>
    </Flex>
    
  </Box>
)

export { PageHeader }
