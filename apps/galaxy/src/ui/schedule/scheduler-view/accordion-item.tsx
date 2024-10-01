'use client'

import { useMemo, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { cn } from '@/utils'
import { useStore } from './store'
import { AppointmentAvailability, SlotsByDay } from './types'
import { currentWeekTotalSlots, extractTime, nextWeekTotalSlots } from './utils'

interface Props {
  provider: AppointmentAvailability
  value: string
}

const ThisWeekSlots = ({ slots }: { slots: SlotsByDay }) => {
  const dates = useStore((state) => state.dates)
  const thisWeekDays = dates.slice(0, dates.length / 2)

  return (
    <Flex
      align="center"
      className="col-span-5 justify-end gap-x-1 py-2.5 pr-2 text-[12px]"
    >
      {thisWeekDays.map((day, i) => (
        <Text
          className={cn('font-[510]', {
            "after:content-[',']": i < dates.length / 2 - 1,
          })}
          key={day.monthAndDay}
        >
          {day.day} {'(' + (slots[`${day.monthAndDay}`]?.length ?? 0) + ')'}
        </Text>
      ))}
    </Flex>
  )
}

const NextWeekSlots = ({ slots }: { slots: SlotsByDay }) => {
  const dates = useStore((state) => state.dates)
  const nextWeekDays = dates.slice(dates.length / 2, dates.length)
  return (
    <Flex
      align="center"
      className="col-span-5 justify-end gap-x-1 py-2.5 pr-2 text-[12px]"
    >
      {nextWeekDays.map((day, i) => (
        <Text
          className={cn('font-[510] ', {
            "after:content-[',']": i < dates.length / 2 - 1,
          })}
          key={day.monthAndDay}
        >
          {day.day} {'(' + (slots[`${day.monthAndDay}`]?.length ?? 0) + ')'}
        </Text>
      ))}
    </Flex>
  )
}

const AccordionItem = ({ provider, value }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dates = useStore((state) => state.dates)
  const codes = useCodesetCodes(CODESETS.SpecialistType)

  const specialistTypeIndex: Record<string, string> = useMemo(
    () =>
      codes?.reduce(
        (acc, specialistType) => ({
          ...acc,
          [specialistType.value]: specialistType.display,
        }),
        {},
      ),
    [codes],
  )

  return (
    <Accordion.Item value={value}>
      <Grid columns="16" className="mx-[26px]">
        <Accordion.Header
          className={cn(
            'border-pp-focus-bg col-span-2 border-b-2 border-l border-t',
          )}
        >
          <Accordion.Trigger
            asChild
            onClick={() => setIsOpen(!isOpen)}
            className={cn('cursor-pointer py-2.5 pl-2')}
          >
            <Flex className="w-full gap-x-4">
              {isOpen ? (
                <ChevronUpIcon width={18} height={18} />
              ) : (
                <ChevronDownIcon width={18} height={18} />
              )}

              <Flex direction="column">
                <Text className="text-pp-dark-grey text-[12px] font-[510]">
                  {`${provider.specialist.legalName.firstName} 
                  ${provider.specialist.legalName.lastName}, `}
                  {provider.specialist.legalName.honors}
                </Text>

                <Text className="text-pp-black-1 text-[12px] font-[510]">
                  {specialistTypeIndex?.[provider.specialistTypeCode] ?? ''}
                </Text>
              </Flex>
            </Flex>
          </Accordion.Trigger>
        </Accordion.Header>
        {!isOpen && (
          <Box className="border-pp-focus-bg col-[3_/_span_14] border-b-2 border-r border-t">
            <Grid columns="14" className="h-full">
              <Flex
                align="center"
                className="col-span-2 py-2.5 pl-2 text-[12px]"
              >
                <Flex direction="column">
                  <Text>This Week Available</Text>
                  <Text>{`Slots ${
                    '(' +
                    currentWeekTotalSlots(dates, provider.allSlotsByDay) +
                    ')'
                  }`}</Text>
                </Flex>
              </Flex>
              <ThisWeekSlots slots={provider.allSlotsByDay} />
              <Flex
                align="center"
                className="before:bg-pp-focus-bg relative col-span-2 py-2.5 pl-2 pl-2 text-[12px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:-translate-x-1/2 before:content-['']"
              >
                <Flex direction="column">
                  <Text>Next Week Available</Text>
                  <Text>{`Slots ${
                    '(' +
                    nextWeekTotalSlots(dates, provider.allSlotsByDay) +
                    ')'
                  }`}</Text>
                </Flex>
              </Flex>
              <NextWeekSlots slots={provider.allSlotsByDay} />
            </Grid>
          </Box>
        )}
        <Accordion.Content className="col-[3_/_span_14]">
          <Grid
            columns="14"
            className="border-pp-focus-bg h-full border-b-[2px] border-r border-t"
          >
            {dates.map((day, i) => (
              <Box
                key={day.monthAndDay}
                className={cn('relative col-span-1 px-2 py-3', {
                  "after:bg-pp-focus-bg after:absolute after:bottom-0 after:right-0 after:top-0 after:w-[1px] after:content-['']":
                    i === 6,
                  'col-span-full': !isOpen,
                  "before:bg-pp-focus-bg before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:content-['']":
                    i === 7,
                })}
              >
                <Flex direction="column" className="gap-y-2 px-[1.5px]">
                  {provider.allSlotsByDay[`${day.monthAndDay}`]
                    ? provider.allSlotsByDay[`${day.monthAndDay}`]?.map(
                        (slot) => (
                          <Flex
                            justify="center"
                            align="center"
                            className="border-pp-grey h-6 rounded-[4px] border px-[15px] py-1 text-[12px] font-[510]"
                            key={slot.startDate}
                          >
                            {extractTime(slot.startDate, slot.timeZoneId)}
                          </Flex>
                        ),
                      )
                    : null}
                </Flex>
              </Box>
            ))}
          </Grid>
        </Accordion.Content>
      </Grid>
    </Accordion.Item>
  )
}

export { AccordionItem }
