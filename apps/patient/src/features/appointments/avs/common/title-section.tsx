import React from 'react'
import { Text } from '@radix-ui/themes'

const TitleSection = ({ title }: { title: string }) => {
  return (
    <Text className="mb-5 text-4 font-[500] leading-6 tracking-[0.36px]">
      {title}
    </Text>
  )
}

export { TitleSection }
