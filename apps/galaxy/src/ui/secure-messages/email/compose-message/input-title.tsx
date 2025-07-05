import React from 'react'
import { Text } from '@radix-ui/themes'

const InputTitle = ({ label }: { label: string }) => {
  return (
    <Text className="text-pp-text-sub mr-1 text-[14px] pl-2" size="1">
      {label}:
    </Text>
  )
}

export { InputTitle }
