import { UploadIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Heading, Text } from '@radix-ui/themes'
import { CopyIcon, PrinterIcon, SaveIcon, SignIcon } from '@/components/icons'

const PageHeader = ({ title }: { title: string }) => (
  <Box className="mb-[1px] rounded-[2px] bg-[#ffffff] px-2 py-1.5">
    <Flex width="100%" justify="between" align="center">
      <Heading className="text-[14px]">{title}</Heading>

      <Flex gap="2" align="center">
        <Button
          variant="outline"
          color="gray"
          className="cursor-pointer border border-[#9E9898] text-[12px] font-[400] text-[9E9898]"
        >
          <PrinterIcon /> Print
        </Button>

        <Button
          variant="outline"
          color="gray"
          className="cursor-pointer border border-[#9E9898] text-[12px] font-[400] text-[9E9898]"
        >
          <CopyIcon /> Copy Previous
        </Button>

        <Button className="cursor-pointer bg-[#151B4A] text-[12px] font-[400]">
          <SaveIcon /> Save
        </Button>

        <Button className="cursor-pointer bg-[#151B4A] text-[12px] font-[400]">
          <UploadIcon /> Upload
        </Button>

        <Button className="cursor-pointer bg-[#151B4A] text-[12px] font-[400]">
          <SignIcon /> Sign
        </Button>
      </Flex>
    </Flex>
  </Box>
)

export { PageHeader }
