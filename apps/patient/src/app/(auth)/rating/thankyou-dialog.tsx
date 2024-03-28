'use client'

import { Cross2Icon} from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { RoundGreenCheckIcon } from '@/components'

const RatingThankYouDialog = ({openDialog, setOpenDialog}:{openDialog:boolean, setOpenDialog:() => void}) => {
  const handleClose = () => {
    window.location.href = "https://psychplus.com/";
  }
  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Content className="relative max-w-[392px] rounded-[12px] p-6 mt-[123px]">
        <Dialog.Close className="absolute right-8 top-8 cursor-pointer" onClick={handleClose}>
          <Cross2Icon />
        </Dialog.Close>

        <Flex justify="center" align="center" className="w-[56px] h-[56px] rounded-[30px] bg-[#ecfdf3]">
          <RoundGreenCheckIcon />
        </Flex>
        
        <Text as="div" className="font-[600] text-[18px] leading-7 text-[#101828] mt-4">Thank you for sharing your feedback!</Text>
        <Text as="div" className="text-[14px] mb-8">Your ratings mean a lot to us. We appreciate your time and valuable insights.</Text>

        <Dialog.Close>
          <Button onClick={handleClose} className="h-[44px] w-full bg-[#151B4A] text-base text-white font-bold cursor-pointer" radius="full">
            Close
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RatingThankYouDialog }