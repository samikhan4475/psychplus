import React, { useMemo, useState } from 'react'
import { Box, Tabs } from '@radix-ui/themes'
import { SidebarContext } from '../context'

interface ReportLayoutProps {
  defaultValue: string
  onChange?: (arg: string) => void
}

const ReportLayout = ({
  defaultValue,
  onChange,
  children,
}: React.PropsWithChildren<ReportLayoutProps>) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false)

  const ctxValue = useMemo(() => (
    {
      onCollapse: setIsCollapsed,
      isCollapsed,
    }
  ), [isCollapsed])

  return (
    <Tabs.Root defaultValue={defaultValue} className="h-full" onValueChange={(value) => {
      if (onChange)
      onChange(value)
    }}>
      <SidebarContext.Provider
        value={ctxValue}
      >
        <Box
          className={`grid ${
            isCollapsed
              ? 'grid-cols-[0.1fr_0.1fr_1fr_1fr_1fr]'
              : 'grid-cols-[1fr_1fr_1fr_1fr_1fr]'
          } relative z-0 h-full gap-x-1`}
        >
          {children}
        </Box>
      </SidebarContext.Provider>
    </Tabs.Root>
  )
}

export { ReportLayout }
