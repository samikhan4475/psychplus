import { Link1Icon } from "@radix-ui/react-icons"
import { Box, Flex, Text } from "@radix-ui/themes"
import Image from "next/image"
import { PreferredUsersDialog } from "./preferred-users-dialog"

const NoRecordFound = () => {
  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      width="100%"
      className="h-[calc(100vh-130px)]"
    >
      <Box className="-mt-[106px] mb-12">
        <Image
          src="/images/user-img-icon.png"
          alt="User Image Icon"
          width={133.7}
          height={175.92}
        />
      </Box>
      <Text className="text-base font-medium">No Record Found</Text>
      <Text className="mb-[26px] mt-6 text-[12px] text-[#757575]">
        Your data will appear here, upload excel sheet to add users or
        add manually.
      </Text>

      <Flex align="center" justify="center" className="gap-3">
        <Flex className="cursor-pointer gap-[3px]" align="center">
          <Link1Icon className="-rotate-45" />
          <Text className="text-black text-[12px] font-bold">
            Link Users
          </Text>
        </Flex>

        <PreferredUsersDialog />
      </Flex>
    </Flex>
  )
}
export { NoRecordFound }