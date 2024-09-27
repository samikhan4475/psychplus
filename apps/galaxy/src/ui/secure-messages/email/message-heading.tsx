import React from 'react'
import { Text } from '@radix-ui/themes'
import { ActiveComponent } from '../types'

const MessageHeading = ({
  activeComponent,
}: {
  activeComponent?: ActiveComponent
}) => {
  return (
    <Text size="2" weight="medium" className="pl-4 text-[16px]">
      {activeComponent}
    </Text>
  )
}

export { MessageHeading }
