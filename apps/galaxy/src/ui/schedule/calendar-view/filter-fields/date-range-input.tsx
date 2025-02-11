import { useEffect, useState } from 'react'
import {
  CalendarDate,
  getLocalTimeZone,
  startOfWeek,
  today,
} from '@internationalized/date'
import { I18nProvider } from 'react-aria-components'
import { START_OF_WEEK_LOCALE } from '../../constants'
import { FieldLabel, FormFieldContainer } from '../../shared'
import { DateRangePickerInput } from '../date-range-picker'
import { useStore } from '../store'

const DateRangeInput = () => {
  const dateToday = today(getLocalTimeZone())
  const { weekStartDate, setStartDate, fetchWeekOnNavigate } = useStore(
    (state) => ({
      setStartDate: state.setStartDate,
      fetchWeekOnNavigate: state.fetchWeekOnNavigate,
      weekStartDate: state.weekStartDate,
    }),
  )
  const [value, setValue] = useState<CalendarDate | undefined>(undefined)

  useEffect(() => {
    setValue((prev) => {
      const { year, month, day } = weekStartDate
      const offsetCalc = prev?.compare(weekStartDate) ?? 0
      if (!(offsetCalc >= 0 && offsetCalc < 7)) {
        // To highlight current week in the calendar when using the top navigation buttons
        return new CalendarDate(year, month, day)
      } else return prev || dateToday
    })
  }, [weekStartDate])

  return (
    <FormFieldContainer>
      <FieldLabel>Date Range</FieldLabel>
      <I18nProvider locale="en-UK">
        <DateRangePickerInput
          value={value}
          granularity={'day'}
          onChange={(val) => {
            const newWeekStart = startOfWeek(val, START_OF_WEEK_LOCALE)
            if (weekStartDate.compare(newWeekStart) !== 0) {
              // To sync top navigation bar with the selected range
              setStartDate(newWeekStart)
            }
            setValue(val)
            fetchWeekOnNavigate(newWeekStart, newWeekStart.add({ days: 7 }))
          }}
        />
      </I18nProvider>
    </FormFieldContainer>
  )
}

export { DateRangeInput }
