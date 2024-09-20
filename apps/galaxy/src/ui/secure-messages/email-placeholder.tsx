import { Dispatch, SetStateAction } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Text } from '@radix-ui/themes'
import { Mail1Icon } from '@/components/icons'
import { ActiveComponent } from './types'

const EmailPlaceHolder = ({
  setActiveComponent,
}: {
  setActiveComponent: Dispatch<SetStateAction<ActiveComponent>>
}) => {
  return (
    <Flex
      className="h-full w-full"
      justify="center"
      align="center"
      direction="column"
    >
      <Flex className="bg-pp-table-subRows flex h-[140px] w-[140px] items-center justify-center rounded-[50%]">
        <Mail1Icon />
      </Flex>
      <Text align="center" className="text-pp-gray-3 mt-4">
        Have something in mind?
        <br />
        Write a new email.
      </Text>
      <Button
        variant="outline"
        color="gray"
        className="text-black hover:bg-black hover:text-white  mt-4 bg-transparent transition-colors"
        onClick={() => {
          setActiveComponent(ActiveComponent.COMPOSE_MAIL)
        }}
      >
        <PlusIcon /> New Email
      </Button>
    </Flex>
  )
}

export { EmailPlaceHolder }
