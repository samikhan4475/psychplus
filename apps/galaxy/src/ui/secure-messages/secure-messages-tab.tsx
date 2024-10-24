import React from 'react'
import { Tabs } from '@radix-ui/themes'
import { SecureMessagesTab } from './types'

const Tab = ({
  value,
  onClick,
  text,
}: {
  value: SecureMessagesTab
  onClick: () => void
  text: string
}) => {
  return (
    <Tabs.Trigger
      className="text-sm text-gray-600  data-[state=active]:bg-white data-[state=active]:shadow-md text-pp-gray-3 data-[state=active]:text-black h-[24px] w-[99px] rounded-2 px-4  py-1 font-medium focus:outline-none data-[state=active]:before:w-0"
      value={value}
      onClick={onClick}
    >
      {text}
    </Tabs.Trigger>
  )
}

export { Tab }
