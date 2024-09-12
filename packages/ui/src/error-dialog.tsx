import { Cross2Icon,ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Box, Button, Dialog, Flex, Text } from '@radix-ui/themes'

const ErrorDialog = ({ text, isOpen, closeDialog }: { text: string, isOpen: boolean, closeDialog: () => void }) => {

    return (
        <Dialog.Root
            open={isOpen}
            onOpenChange={(dialogNewState) => {
                if (dialogNewState === false && isOpen) {
                    closeDialog()
                }
            }}
        >
            <Dialog.Content className="relative w-full max-w-[448px] rounded-6 px-[18px] py-[15px] text-[#151B4A]">
                <Dialog.Close onClick={closeDialog} className="absolute right-4 top-4 cursor-pointer">
                    <Cross2Icon />
                </Dialog.Close>
                <Flex align="center" gap="2"mb="2" >
                    <Box className=" flex justify-center items-center p-2 rounded-[50%] bg-[#E5484D]">
                        <ExclamationTriangleIcon color='#ffff' className='w-[15px] h-[15px]' />
                    </Box>
                    <Dialog.Title size="4" className='m-0 font-bold '>
                        Error
                    </Dialog.Title>
                </Flex>
                <Text >
                    {text}
                </Text>
                <Flex justify="end">
                    <Dialog.Close >
                        <Button
                            className="mt-4  w-[100px] cursor-pointer bg-[#1f2d5c] text-[#ffffff]"
                        >
                            Close
                        </Button>
                    </Dialog.Close>
                </Flex>
            </Dialog.Content>
        </Dialog.Root>
    )
}

export { ErrorDialog }