'use client'

import { useCallback, useEffect, useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'

type CountdownProps = {
  targetDate: string // e.g. "2025-08-28T19:00:00Z"
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer = ({ targetDate }: CountdownProps) => {
  const calculateTimeLeft = useCallback((): TimeLeft => {
    const target = new Date(targetDate)
    const now = new Date()
    const difference = target.getTime() - now.getTime()

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((difference % (1000 * 60)) / 1000)

    return { days, hours, minutes, seconds }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft)

  useEffect(() => {
    // Initial calculation
    const initialTime = calculateTimeLeft()
    setTimeLeft(initialTime)

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft()
      setTimeLeft(newTimeLeft)

      // Check if countdown has expired
      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  return (
    <Flex align="center" gap="2">
      {timeLeft.days > 0 && (
        <>
          <TimeBox value={timeLeft.days} label="Days" />
          <Text weight="bold">:</Text>
        </>
      )}
      <TimeBox value={timeLeft.hours} label="Hrs" />
      <Text weight="bold">:</Text>
      <TimeBox value={timeLeft.minutes} label="Min" />
      <Text weight="bold">:</Text>
      <TimeBox value={timeLeft.seconds} label="Sec" />
    </Flex>
  )
}

const TimeBox = ({ value, label }: { value: number; label: string }) => (
  <Box className="flex min-w-[75px] items-center rounded-[6px] border border-[#F2AE40] px-2 py-1">
    <Text weight="bold" size="5">
      {String(value).padStart(2, '0')}
    </Text>
    <Text size="2" className="ml-1">
      {label}
    </Text>
  </Box>
)

export default CountdownTimer
