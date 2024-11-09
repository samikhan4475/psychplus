import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { useStore } from '../../store'

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  const viewedTabs = useStore((state) => state.viewedTabs)

  return (
    <Tabs.Content
      value={value}
      forceMount={viewedTabs.has(value) ? true : undefined}
      className="hidden flex-1 flex-col gap-2 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { TabsContent }
