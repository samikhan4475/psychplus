import { useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { Provider, SlotsTable } from '../../types'
import { currentWeekTotalSlots, nextWeekTotalSlots } from './date-utils'
import { days } from './pseudo-data'

interface Props {
  provider: Provider
  value: string
}

const ThisWeekSlots = ({ slots }: { slots: SlotsTable }) => {
  const thisWeekDays = days.slice(0, days.length / 2)
  return (
    <Flex
      align="center"
      className="col-span-5 justify-end gap-x-1 py-2.5 pr-2 text-[12px]"
    >
      {thisWeekDays.map((day, i) => (
        <span className={cn("font-[510]", {
          "after:content-[',']": i < (days.length/2 - 1)
        })} key={day.date}>
          {day.day} {'(' + slots[`${day.day}${day.monthDay}`].length + ')'}
        </span>
      ))}
    </Flex>
  )
}

const NextWeekSlots = ({ slots }: { slots: SlotsTable }) => {
  const nextWeekDays = days.slice(days.length / 2, days.length)
  return (
    <Flex
      align="center"
      className="col-span-5 justify-end gap-x-1 py-2.5 text-[12px] pr-2"
    >
      {nextWeekDays.map((day, i) => (
        <span className={cn("font-[510]", {
          "after:content-[',']": i < (days.length/2 - 1)
        })} key={day.date}>
          {day.day} {'(' + slots[`${day.day}${day.monthDay}`].length + ')'}
        </span>
      ))}
    </Flex>
  )
}

const AccordionItem = ({ provider, value }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <Accordion.Item value={value}>
      <Grid columns="17">
        <Accordion.Header
          className={cn(
            'col-span-2 ml-[17px] border-b-2 border-l border-t border-[#D9E2FC]',
          )}
        >
          <Accordion.Trigger
            asChild
            onClick={() => setIsOpen(!isOpen)}
            className={cn('cursor-pointer py-2.5 pl-2')}
          >
            <Flex justify="between" className="w-full">
              {isOpen ? (
                <ChevronUpIcon width={18} height={18} />
              ) : (
                <ChevronDownIcon width={18} height={18} />
              )}

              <Flex direction="column">
                <Text className="text-[12px] font-[510] text-[#656565]">
                  Dr. Morgan Roish, MD
                </Text>

                <Text className="text-[12px] font-[510] text-[#151B4A]">
                  {provider.speciality}
                </Text>
              </Flex>
            </Flex>
          </Accordion.Trigger>
        </Accordion.Header>
        {!isOpen && (
          <Box className="col-[3_/_span_14] border-b-2 border-t border-r border-[#D9E2FC]">
            <Grid columns="14" className="h-full">
              <Flex
                align="center"
                className="col-span-2 py-2.5 pl-2 text-[12px]"
              >
                <Flex direction="column">
                  <span>This Week Available</span>
                  <span>{`Slots ${
                    '(' + currentWeekTotalSlots(days, provider.slots) + ')'
                  }`}</span>
                </Flex>
              </Flex>
              <ThisWeekSlots slots={provider.slots} />
              <Flex
                align="center"
                className="relative col-span-2 py-2.5 pl-2 pl-2 text-[12px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:-translate-x-1/2 before:bg-[#D9E2FC] before:content-['']"
              >
                <Flex direction="column">
                  <span>Next Week Available</span>
                  <span>{`Slots ${
                    '(' + nextWeekTotalSlots(days, provider.slots) + ')'
                  }`}</span>
                </Flex>{' '}
              </Flex>
              <NextWeekSlots slots={provider.slots} />
            </Grid>
          </Box>
        )}
        <Accordion.Content className="col-[3_/_span_14]">
          <Grid
            columns="14"
            className="border-b-[2px] border-r border-t border-[#D9E2FC]"
          >
            {days.map((day, i) => (
              <Box
                key={day.date}
                className={cn('relative col-span-1 px-2 py-3', {
                  "after:absolute after:bottom-0 after:right-0 after:top-0 after:w-[1px] after:bg-[#D9E2FC] after:content-['']":
                    i === 6,
                  'col-span-full': !isOpen,
                  "before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:bg-[#D9E2FC] before:content-['']":
                    i === 7,
                })}
              >
                <Flex direction="column" className="gap-y-2 px-[1.5px]">
                  {provider.slots[`${day.day}${day.monthDay}`]
                    ? provider.slots[`${day.day}${day.monthDay}`].map(
                        (slot) => (
                          <Flex
                            justify="center"
                            align="center"
                            className="h-6 rounded-[4px] border border-[#DDDDE3] px-[15px] py-1 text-[12px] font-[510]"
                            key={slot.id}
                          >
                            {slot.duration}
                          </Flex>
                        ),
                      )
                    : null}
                </Flex>
              </Box>
            ))}
            {/* <Box className="col-span-1 py-3">
              <Flex direction="column" justify="between" className="h-full">
                <Text className="mx-2 rounded-[4px] rounded-[4px] border border-[#DDDDE3] px-2 text-center text-[12px] font-[510]">
                  Next Available Slots
                </Text>
                {provider.nextAvailability.map((availability) => (
                  <Flex
                    key={availability.date}
                    direction="column"
                    className="mx-2 rounded-[4px] border border-[#DDDDE3] px-2 py-1"
                    align="center"
                    justify="center"
                  >
                    <Flex className="gap-x-[3px]">
                      <span className="text-[12px] font-[510] text-[#60646C]">
                        {availability.day}
                      </span>
                      <span className="text-[12px] font-[510]">
                        {availability.monthDay}
                      </span>
                    </Flex>
                    <Text className="text-[12px] font-[510]">
                      {availability.time}
                    </Text>
                  </Flex>
                ))}
              </Flex>
            </Box> */}
          </Grid>
        </Accordion.Content>
      </Grid>
    </Accordion.Item>
  )
}

export { AccordionItem }
