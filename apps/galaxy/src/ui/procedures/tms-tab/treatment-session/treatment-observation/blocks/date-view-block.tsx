import React from 'react'
import { Text } from '@radix-ui/themes'

const DateViewBlock = ({ date }: { date: string }) => {
  const currentDate = new Date(date)

  const formattedDate = currentDate.toLocaleString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })
  return (
    <Text className="text-pp-black-3 text-1 font-regular">{formattedDate}</Text>
  )
}

export default DateViewBlock
