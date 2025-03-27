'use client'

import { useMemo, useState } from 'react'
import * as Accordion from '@radix-ui/react-accordion'
import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Grid, Text } from '@radix-ui/themes'
import { CODESETS } from '@/constants'
import { useCodesetCodes, useHasPermission } from '@/hooks'
import { NewPatient } from '@/types'
import { AddVisit } from '@/ui/visit/add-visit'
import { cn, getCodesetDisplayName } from '@/utils'
import { CLICK_AVAILABLE_SLOTS } from '../constants'
import { PermissionAlert } from '../shared'
import { AvailableSlots } from '../types'
import { useStore } from './store'
import { AppointmentAvailability, SlotsByDay } from './types'
import { currentWeekTotalSlots, extractTime, nextWeekTotalSlots } from './utils'

interface Props {
  onVisitAdd?: () => void
  provider: AppointmentAvailability
  value: string
  patient: undefined | NewPatient
  isFollowup: boolean
  consultationDate?: string
}

const Slots = ({
  slots,
  days,
  noOfDays,
}: {
  slots: SlotsByDay
  days: Array<any>
  noOfDays: number
}) => (
  <Flex
    align="center"
    className={cn(
      `${
        noOfDays === 7 ? 'col-span-10' : 'col-span-5'
      } justify-end gap-x-1 py-2.5 pr-2 text-[12px]`,
    )}
  >
    {days.map((day, i) => (
      <Text
        className={cn('font-medium', {
          "after:content-[',']": i < days.length - 1,
        })}
        key={day.monthAndDay}
      >
        {day.day} {'(' + (slots[`${day.monthAndDay}`]?.length ?? 0) + ')'}
      </Text>
    ))}
  </Flex>
)

const AccordionItem = ({
  onVisitAdd,
  provider,
  value,
  patient,
  isFollowup,
  consultationDate,
}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [isAlertOpen, setIsAlertOpen] = useState<boolean>(false)
  const { dates, formData, fetchData } = useStore((state) => ({
    dates: state.dates,
    formData: state.formData,
    fetchData: state.fetchAppointments,
  }))
  const codes = useCodesetCodes(CODESETS.SpecialistType)
  const stateCodes = useCodesetCodes(CODESETS.UsStates)
  const hasPermissionToClickOnAvailableSlots = useHasPermission(
    'clickAvailableSlotsInSchedulerView',
  )
  const providerState = provider.clinic?.contact?.addresses?.[0]?.state ?? ''
  const stateLabel = getCodesetDisplayName(providerState, stateCodes)

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

  // Check if days are 7 or if accordion is open
  const displayInSingleSection = dates.length === 7 || isOpen
  const thisWeekDays = dates.slice(0, dates.length / 2)
  const nextWeekDays = dates.slice(dates.length / 2)

  return (
    <Accordion.Item value={value}>
      <Grid columns="16" className="ml-2.5 mr-[20px]">
        <Accordion.Header
          className={cn(
            'border-pp-focus-bg col-span-2 border-b-2 border-l border-t',
          )}
        >
          <Accordion.Trigger
            asChild
            onClick={() => setIsOpen(!isOpen)}
            className={cn('cursor-pointer py-2.5')}
          >
            <Flex className="w-full gap-x-4">
              {isOpen ? (
                <ChevronUpIcon width={18} height={18} />
              ) : (
                <ChevronDownIcon width={18} height={18} />
              )}
              <Flex direction="column">
                <Text className="text-pp-dark-grey text-[12px] font-medium">
                  {`${provider.specialist.legalName.firstName} 
                  ${provider.specialist.legalName.lastName}, `}
                  {provider.specialist.legalName.honors}
                </Text>
                <Text className="text-pp-black-1 text-[12px] font-bold">
                  {specialistTypeIndex?.[provider.specialistTypeCode] ?? ''}
                </Text>
                <Text className="text-[12px] font-medium">{`${provider.clinic.name}`}</Text>
                <Text className="text-[12px] font-medium">{`${stateLabel}`}</Text>
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
              <Slots
                slots={provider.allSlotsByDay}
                days={displayInSingleSection ? dates : thisWeekDays}
                noOfDays={dates.length}
              />
              {!displayInSingleSection && (
                <Flex
                  align="center"
                  className="before:bg-pp-focus-bg relative col-span-2 py-2.5 pl-2 text-[12px] before:absolute before:bottom-0 before:left-0 before:top-0 before:w-[1px] before:-translate-x-1/2 before:content-['']"
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
              )}
              {!displayInSingleSection && (
                <Slots
                  slots={provider.allSlotsByDay}
                  days={nextWeekDays}
                  noOfDays={dates.length}
                />
              )}
            </Grid>
          </Box>
        )}
        <Accordion.Content className="col-[3_/_span_14]">
          <Grid
            columns={String(dates.length)}
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
                      (slot) => {
                        const slotTime = extractTime(slot.startDate, slot.timeZoneId);
                        if (!hasPermissionToClickOnAvailableSlots) {
                          return (
                            <Button
                              variant="outline"
                              size="1"
                              color="gray"
                              onClick={() => setIsAlertOpen(true)}
                              key={slot.startDate}
                              className="text-black text-[12px]"
                            >
                              {slotTime}
                            </Button>
                          )
                        }

                        return (
                          <AddVisit
                            dateTime={slot.startDate}
                            timezone={slot.timeZoneId}
                            onAdd={() => {
                              fetchData(formData)
                              onVisitAdd?.()
                            }}
                            slotDetails={getSlotDetails(
                              slot,
                              provider,
                              specialistTypeIndex,
                            )}
                            isTimed
                            key={slot.startDate}
                            patient={patient}
                            isFollowup={isFollowup}
                            consultationDate={consultationDate}
                          >
                            <Button
                              variant="outline"
                              size="1"
                              color="gray"
                              className="text-black text-[12px]"
                            >
                              {slotTime}
                            </Button>
                          </AddVisit>
                        )
                      },
                    )
                    : null}
                </Flex>
              </Box>
            ))}
          </Grid>
        </Accordion.Content>
      </Grid>
      <PermissionAlert
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        message={CLICK_AVAILABLE_SLOTS}
      />
    </Accordion.Item>
  )
}

const getSlotDetails = (
  slot: AvailableSlots,
  provider: AppointmentAvailability,
  specialistTypeIndex: Record<string, string>,
) => {
  const slotRes = {
    state: provider.clinic?.contact?.addresses?.[0]?.state ?? '',
    location: provider.clinic.id,
    providerType: specialistTypeIndex?.[provider.specialistTypeCode] ?? '',
    providerId: `${provider.specialist.id}`,
    duration: `${slot.duration}`,
    service: slot.servicesOffered[0] ?? '',
  }
  return slotRes
}

export { AccordionItem }
