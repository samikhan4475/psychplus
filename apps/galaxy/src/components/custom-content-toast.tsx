import { Cross1Icon } from '@radix-ui/react-icons'
import { Box, Flex, Text } from '@radix-ui/themes'
import { TriangleAlert } from 'lucide-react'
import { toast } from 'react-hot-toast'

interface CustomToasterProps {
  title: string
  message: string
  details?: string[]
}
const CustomToaster = ({ title, message, details }: CustomToasterProps) => {
  return toast.custom(
    (t) => (
      <Box className="bg-blackA-5 fixed -inset-4 z-[99999] flex h-[100dvh] w-[100vw] items-center justify-center bg-opacity-40">
        <Flex className="bg-pp-warning-bg-1 border-pp-warning-border relative w-full max-w-[440px] gap-5 overflow-hidden rounded-2 border p-6">
          <Flex
            align="center"
            justify="center"
            className="rounded-full absolute right-4 top-4 h-[35px] w-[35px] cursor-pointer text-gray-11 transition-colors hover:bg-gray-3"
            onClick={() => toast.dismiss(t.id)}
          >
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </Flex>
          <TriangleAlert className="min-w-6 text-pp-warning-border" size={24} />
          <Flex direction="column" gap="5" p="2">
            <Text className="text-4 font-medium">{title}</Text>
            <Text as="p" className="text-2">
              {message}
            </Text>
            {details?.length && (
              <ul className="!list-disc !pl-4">
                {details.map((item, idx) => (
                  <li className="text-2" key={`${idx}-${item}`}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </Flex>
        </Flex>
      </Box>
    ),
    { duration: Infinity },
  )
}

export { CustomToaster }
