import { Box, Flex, IconButton, Text } from '@radix-ui/themes'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../store'
import { formatDate } from '../utils'

const DateStepper = () => {
  const { weekStartDate, addWeek, subtractWeek } = useStore(
    (state) => ({
      weekStartDate: state.weekStartDate,
      addWeek: state.addWeek,
      subtractWeek: state.subtractWeek,
    }),
  )
  const weekEndDate = weekStartDate.add({days: 6})

  return (
    <Flex className="flex-1 gap-x-2" align="center" justify="center">
      <IconButton
        variant="outline"
        className="h-5 w-5 cursor-pointer rounded-[50%] bg-[#FFF] [border:2px_solid_#DDDDE3] [box-shadow:none]"
        onClick={subtractWeek}
      >
        <ChevronLeft width={12} height={12} className="text-[#60646C]" />
      </IconButton>
      <Flex className="gap-x-2" align="center">
        <Text className="text-[12px] font-[500]">
          {formatDate(weekStartDate)}
        </Text>
        <Box className="h-[1.4px] w-[12.6px] rounded-[1px] bg-[#A0B6DC]"></Box>
        <Text className="text-[12px] font-[500]">
          {formatDate(weekEndDate)}
        </Text>
      </Flex>
      <IconButton
        variant="outline"
        className="h-5 w-5 cursor-pointer rounded-[50%] bg-[#FFF] [border:2px_solid_#DDDDE3] [box-shadow:none]"
        onClick={addWeek}
      >
        <ChevronRight width={12} height={12} className="text-[#60646C]" />
      </IconButton>
    </Flex>
  )
}

export { DateStepper }
