'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { Button, Dialog, Flex, Text } from '@radix-ui/themes'
import { RoundGreenCheckIcon } from '@/components'

const RatingThankYouDialog = ({
  openDialog,
  setOpenDialog,
}: {
  openDialog: boolean
  setOpenDialog: () => void
}) => {
  const handleClose = () => {
    window.location.href = 'https://psychplus.com/'
  }
  return (
    <Dialog.Root open={openDialog} onOpenChange={setOpenDialog}>
      <Dialog.Content className="relative mt-[123px] max-w-[392px] rounded-[12px] p-6">
        <Dialog.Close
          className="absolute right-8 top-8 cursor-pointer"
          onClick={handleClose}
        >
          <Cross2Icon />
        </Dialog.Close>

        <Flex
          justify="center"
          align="center"
          className="h-[56px] w-[56px] rounded-[30px] bg-[#ecfdf3]"
        >
          <RoundGreenCheckIcon />
        </Flex>

        <Text
          as="div"
          className="mt-4 text-[18px] font-[600] leading-7 text-[#101828]"
        >
          Thank you for sharing your feedback!
        </Text>
        <Text as="div" className="mb-8 text-[14px]">
          Your ratings mean a lot to us. We appreciate your time and valuable
          insights.
        </Text>

        <Dialog.Close>
          <Button
            onClick={handleClose}
            className="text-base text-white h-[44px] w-full cursor-pointer bg-[#151B4A] font-bold"
            radius="full"
          >
            Close
          </Button>
        </Dialog.Close>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { RatingThankYouDialog }
