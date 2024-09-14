import { useMemo, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Flex, Grid, Text } from '@radix-ui/themes'
import { cn } from '@psychplus/ui/cn'
import { useSpecialistTypeOptions } from '../../hooks'
import { useStore } from '../../store'
import { AppointmentAvailability, SlotsByDay } from '../../types'
import {
  currentWeekTotalSlots,
  extractTime,
  nextWeekTotalSlots,
} from '../../utils'

interface Props {
  provider: AppointmentAvailability
  value: string
}

const ThisWeekSlots = ({ slots }: { slots: SlotsByDay }) => {
  const dates = useStore((state) => state.appointmentDays)
  const thisWeekDays = dates.slice(0, dates.length / 2)

  return (
    <Flex
      align="center"
      className="col-span-5 justify-end gap-x-1 py-2.5 pr-2 text-[12px]"
    >
      {thisWeekDays.map((day, i) => (
        <span
          className={cn('font-[510]', {
            "after:content-[',']": i < dates.length / 2 - 1,
          })}
          key={day.monthAndDay}
        >
          {day.day} {'(' + (slots[`${day.monthAndDay}`]?.length || 0) + ')'}
        </span>
      ))}
    </Flex>
  )
}

const NextWeekSlots = ({ slots }: { slots: SlotsByDay }) => {
  const dates = useStore((state) => state.appointmentDays)
  const nextWeekDays = dates.slice(dates.length / 2, dates.length)
  return (
    <Flex
      align="center"
      className="col-span-5 justify-end gap-x-1 py-2.5 pr-2 text-[12px]"
    >
      {nextWeekDays.map((day, i) => (
        <span
          className={cn('font-[510]', {
            "after:content-[',']": i < dates.length / 2 - 1,
          })}
          key={day.monthAndDay}
        >
          {day.day} {'(' + (slots[`${day.monthAndDay}`]?.length || 0) + ')'}
        </span>
      ))}
    </Flex>
  )
}

type SpecialistTypeIndex = { [key: string]: string }

const AccordionItem = ({ provider, value }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dates = useStore((state) => state.appointmentDays)
  const specialistTypeOptions = useSpecialistTypeOptions()
  const specialistTypeIndex = useMemo(
    () =>
      specialistTypeOptions?.reduce(
        (acc, specialistType) => ({
          ...acc,
          [specialistType.value]: specialistType.label,
        }),
        {} as SpecialistTypeIndex,
      ),
    [specialistTypeOptions],
  )

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
            <Flex className="w-full gap-x-4">
              {isOpen ? (
                <ChevronUpIcon width={18} height={18} />
              ) : (
                <ChevronDownIcon width={18} height={18} />
              )}

              <Flex direction="column">
                <Text className="text-[12px] font-[510] text-[#656565]">
                  {`${provider.specialist.legalName.firstName} 
                  ${provider.specialist.legalName.lastName}, `}
                  {provider.specialist.legalName.honors}
                </Text>

                <Text className="text-[12px] font-[510] text-[#151B4A]">
                  {specialistTypeIndex?.[provider.specialistTypeCode] ?? ''}
                </Text>
              </Flex>
            </Flex>
          </Accordion.Trigger>
        </Accordion.Header>
        {!isOpen && (
          <Box className="col-[3_/_span_14] border-b-2 border-r border-t border-[#D9E2FC]">
            <Grid columns="14" className="h-full">
              <Flex
                align="center"
                className="col-span-2 py-2.5 pl-2 text-[12px]"
              >
                <Flex direction="column">
                  <span>This Week Available</span>
                  <span>{`Slots ${
                    '(' +
                    currentWeekTotalSlots(dates, provider.allSlotsByDay) +
                    ')'
                  }`}</span>
                </Flex>
              </Flex>
              <ThisWeekSlots slots={provider.allSlotsByDay} />
              <Flex
                align="center"
                className="relative col-span-2 py-2.5 pl-2 pl-2 text-[12px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:-translate-x-1/2 before:bg-[#D9E2FC] before:content-['']"
              >
                <Flex direction="column">
                  <span>Next Week Available</span>
                  <span>{`Slots ${
                    '(' +
                    nextWeekTotalSlots(dates, provider.allSlotsByDay) +
                    ')'
                  }`}</span>
                </Flex>{' '}
              </Flex>
              <NextWeekSlots slots={provider.allSlotsByDay} />
            </Grid>
          </Box>
        )}
        <Accordion.Content className="col-[3_/_span_14]">
          <Grid
            columns="14"
            className="h-full border-b-[2px] border-r border-t border-[#D9E2FC]"
          >
            {dates.map((day, i) => (
              <Box
                key={day.monthAndDay}
                className={cn('relative col-span-1 px-2 py-3', {
                  "after:absolute after:bottom-0 after:right-0 after:top-0 after:w-[1px] after:bg-[#D9E2FC] after:content-['']":
                    i === 6,
                  'col-span-full': !isOpen,
                  "before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:bg-[#D9E2FC] before:content-['']":
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
                            className="h-6 rounded-[4px] border border-[#DDDDE3] px-[15px] py-1 text-[12px] font-[510]"
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
