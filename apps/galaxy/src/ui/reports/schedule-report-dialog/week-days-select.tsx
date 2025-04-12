import { useEffect, useRef, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { weekdays } from './constants'
import { ScheduleTemplateSchemaType } from './schedule-report-form'
import { WeekdayButton } from './weekday-button'

const WeekdaysSelect = () => {
  const [activeDays, setActiveDays] = useState<string[]>([])
  const form = useFormContext<ScheduleTemplateSchemaType>()
  const isInitialRender = useRef(true)

  const toggleDay = (day: string) => {
    setActiveDays((prevDays) =>
      prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day],
    )
  }

  useEffect(() => {
    if (isInitialRender.current) {
      const initialDays = form.getValues('scheduleDays') || []
      setActiveDays(initialDays)
      isInitialRender.current = false
    }
  }, [form])

  useEffect(() => {
    form.setValue('scheduleDays', activeDays)
  }, [activeDays, form])

  return (
    <Flex gap="2" justify="start" align="center" className="my-4">
      <Text size="1" weight="medium">
        on
      </Text>
      {weekdays.map((day) => (
        <WeekdayButton
          key={day}
          day={day}
          isActive={activeDays.includes(day)}
          onToggle={() => toggleDay(day)}
        />
      ))}
    </Flex>
  )
}

export { WeekdaysSelect }
