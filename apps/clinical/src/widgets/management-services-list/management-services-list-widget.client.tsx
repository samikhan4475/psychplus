'use client'

import { useRef } from 'react'
import * as Toast from '@radix-ui/react-toast'
import { Flex } from '@radix-ui/themes'
import { MANAGEMENT_SERVICES_LIST_WIDGET } from '@psychplus/widgets'
import { usePublishLoaded, usePublishSize } from '@psychplus/widgets/hooks'
import { LocationServicesTable } from './components'

const ManagementServicesListWidgetClient = () => {
  const ref = useRef<HTMLDivElement>(null)

  usePublishLoaded(MANAGEMENT_SERVICES_LIST_WIDGET)
  usePublishSize(MANAGEMENT_SERVICES_LIST_WIDGET, ref)
  return (
    <Toast.Provider>
      <Flex direction="column" className="min-h-[200px] min-w-fit" ref={ref}>
        <LocationServicesTable />
      </Flex>
    </Toast.Provider>
  )
}

export { ManagementServicesListWidgetClient }
