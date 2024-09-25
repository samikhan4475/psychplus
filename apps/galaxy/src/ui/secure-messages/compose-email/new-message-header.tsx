import React from 'react'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Flex } from '@radix-ui/themes'
import { MessageHeading } from '.'
import { ActiveComponent, ActiveComponentProps } from '../types'

const NewMessageHeader = ({ setActiveComponent }: ActiveComponentProps) => {
  return (
    <Flex
      className="bg-pp-table-subRows h-[40px] w-full"
      justify="between"
      align="center"
    >
      <MessageHeading />
      <Cross1Icon
        className="text-pp-text-sub pr-6"
        onClick={() => {
          setActiveComponent(ActiveComponent.NEW_EMAIL)
        }}
      />
    </Flex>
  )
}

export { NewMessageHeader }
