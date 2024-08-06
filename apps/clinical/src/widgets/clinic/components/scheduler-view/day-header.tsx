import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { NavigationButton } from './navigation-button'
import { days, PROVIDERS } from './pseudo-data'

const DayHeader = () => {
  const handleForwardNavigation = () => {
    // TODO: Remove log on API integration
    console.log('handle Navigation')
  }

  const handleBackwardNavigation = () => {
    // TODO: Remove log on API integration
    console.log('handle Navigation')
  }

  return (
    <Grid columns="17" className="mt-[7px]">
      <Text className="col-span-2 px-[17px] text-[14px] font-[590] text-[#1C2024]">{`${PROVIDERS.length} Providers`}</Text>
      <Box className="relative col-[3_/_span_14]">
        <NavigationButton
          className="absolute left-0 top-[50%] -translate-x-1/2 -translate-y-1/2"
          onClick={handleBackwardNavigation}
          direction="left"
        />
        <NavigationButton
          className="absolute right-0 top-[50%] -translate-y-1/2 translate-x-1/2"
          onClick={handleForwardNavigation}
          direction="right"
        />
        <Grid
          columns="14"
          className="h-7 w-full border border-b-[2px] border-[#D9E2FC]"
        >
          {days.map((day, i) => (
            <Flex
              align="center"
              justify="center"
              key={day.date}
              className={cn('relative px-2', {
                "after:absolute after:bottom-0 after:right-0 after:top-0 after:w-[2px] after:translate-x-1/2 after:bg-[#D9E2FC] after:content-['']":
                  i === 6,
              })}
            >
              <Flex
                align="center"
                justify="center"
                className={cn('gap-x-[3px] text-[12px]')}
              >
                <span className="text-[12px] font-[510] text-[#60646C]">
                  {day.day}
                </span>
                <span className="text-[12px] font-[510]">{day.monthDay}</span>
              </Flex>
            </Flex>
          ))}
        </Grid>
      </Box>
    </Grid>
  )
}

export { DayHeader }
