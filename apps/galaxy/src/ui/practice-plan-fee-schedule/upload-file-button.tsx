import { UploadIcon } from '@radix-ui/react-icons'
import { Button, Flex } from '@radix-ui/themes'

const UploadFileButton = () => {
  return (
    <Flex className="ml-auto w-[150px]">
      <Button
        size="1"
        className="bg-pp-black-1 text-white h-[25px] flex-1 cursor-pointer px-3 py-1.5"
      >
        <UploadIcon /> Upload Excel File
      </Button>
    </Flex>
  )
}

export { UploadFileButton }
