import React from 'react'
import { Text } from '@radix-ui/themes'
import { useStore } from '../../store'
import { ActiveComponent } from '../../types'

const MessageHeading = () => {
  const { activeComponent } = useStore((state) => state)
  if (activeComponent !== ActiveComponent.COMPOSE_MAIL) return null
  return (
    <Text size="2" weight="medium" className="pl-4 text-[16px]">
      {activeComponent}
    </Text>
  )
}

export { MessageHeading }
