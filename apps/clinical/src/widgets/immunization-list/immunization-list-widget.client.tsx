'use client'

import { useRef } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { ToastProvider } from 'node_modules/@psychplus/ui/src/toast-provider'
import { AddImmunizationDropdown, ImmunizationTable } from './components'

const ImmunizationListWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  return (
    <ToastProvider>
      <Flex direction="column" className="h-fit min-w-fit" ref={ref}>
        <Flex p="1" align="center" justify="between">
          <Text className="font-bold">Immunization</Text>
          <AddImmunizationDropdown />
        </Flex>
        <ImmunizationTable />
      </Flex>
    </ToastProvider>
  )
}

export { ImmunizationListWidgetClient }
