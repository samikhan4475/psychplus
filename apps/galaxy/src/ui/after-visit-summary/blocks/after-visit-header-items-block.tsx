import React from 'react'
import { Flex } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { AfterVisitVHeaderView } from './header-view'

interface HeaderItem {
  title: string
  value?: string
  type?: 'date' | 'time'
}

interface AfterVisitHeaderBlockProps {
  headerItems: HeaderItem[]
  appointment: Appointment
}

const AfterVisitHeaderItemsBlock = ({
  headerItems,
  appointment,
}: AfterVisitHeaderBlockProps) => {
  return (
    <Flex
      align="center"
      gap="2"
      p="2"
      className="bg-white -mt-[1px] border border-gray-5"
    >
      {headerItems.map((item) => (
        <AfterVisitVHeaderView
          appointment={appointment}
          key={item.title}
          title={item.title}
          value={item.value}
          type={item.type}
        />
      ))}
    </Flex>
  )
}

export { AfterVisitHeaderItemsBlock }
