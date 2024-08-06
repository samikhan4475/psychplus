import { useEffect, useState } from 'react'
import { Box, Flex, Text } from '@radix-ui/themes'
import { addDays, format } from 'date-fns'
import { NavigationButton } from './navigation-button'

interface DateStepperProps {
  startDate: string
  step: number
}

const DateStepper = ({ startDate, step }: DateStepperProps) => {
  const [start, setStart] = useState<string>(startDate)
  const [end, setEnd] = useState<string>('')

  useEffect(() => {
    const startD = format(new Date(startDate), 'PP')
    const endDate = addDays(new Date(startDate), step)
    const endDateString = format(new Date(endDate), 'PP')
    setStart(startD)
    setEnd(endDateString)
  }, [startDate, step])

  const stepForward = () => {
    setStart((prev) => {
      const newStart = addDays(new Date(prev), step)
      return format(new Date(newStart), 'PP')
    })
    setEnd((prev) => {
      const newEnd = addDays(new Date(prev), step)
      return format(new Date(newEnd), 'PP')
    })
  }

  const stepBackward = () => {
    const newStart = addDays(new Date(start), -step)
    const newEnd = addDays(new Date(end), -step)
    const newStartFormatted = format(new Date(newStart), 'PP')
    const newEndFormatted = format(new Date(newEnd), 'PP')
    setStart(newStartFormatted)
    setEnd(newEndFormatted)
  }

  return (
    <Flex className="lg:flex-0 flex-1 gap-x-2" align="center" justify="center">
      <NavigationButton onClick={stepBackward} direction="left" />
      <Flex className="gap-x-2" align="center">
        <Text className="text-[12px] font-[500]">{start}</Text>
        <Box className="h-[1.4px] w-[12.6px] rounded-[1px] bg-[#A0B6DC]"></Box>
        <Text className="text-[12px] font-[500]">{end}</Text>
      </Flex>
      <NavigationButton onClick={stepForward} direction="right" />
    </Flex>
  )
}

export { DateStepper }
