import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Flex, IconButton, Text } from '@radix-ui/themes'

const SearchedItem = ({
  title,
  onClick,
  disabled,
}: {
  title: string
  onClick: () => void
  disabled?: boolean
}) => {
  return (
    <IconButton
      variant="ghost"
      onClick={() => onClick()}
      disabled={disabled}
      mt="1"
    >
      <Flex flexGrow="1">
        <Text className="text-pp-black-3 text-left text-1 font-regular">
          {title}
        </Text>
      </Flex>
      <Flex flexGrow="1" className="justify-end" align="center">
        <PlusCircledIcon
          width={20}
          height={20}
          color={disabled ? '#B9BBC6' : '#151B4A'}
        />
      </Flex>
    </IconButton>
  )
}

export { SearchedItem }
