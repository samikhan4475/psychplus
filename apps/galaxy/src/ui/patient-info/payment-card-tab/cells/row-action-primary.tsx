import { DropdownMenu, Flex, Switch, Text } from '@radix-ui/themes'
import { type PropsWithRow } from '@/components'
import { CreditCard } from '../types'

const RowActionPrimary = ({ row: { original } }: PropsWithRow<CreditCard>) => {
  return (
    <DropdownMenu.Item
      onClick={() => {
        console.log('edit:', original)
      }}
      onSelect={(event) => event.preventDefault()}
      className="hover:!text-black hover:!bg-pp-gray-2 border-pp-gray-2 h-7 border-b"
    >
      <Text as="label" size={'1'}>
        <Flex width={'100%'} gap={'2'} align={'center'}>
          Make Primary <Switch size={'1'} color="green" />
        </Flex>
      </Text>
    </DropdownMenu.Item>
  )
}

export { RowActionPrimary }
