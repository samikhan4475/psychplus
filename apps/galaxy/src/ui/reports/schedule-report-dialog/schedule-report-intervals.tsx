'use client'

import { Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { INTERVAL, REPEAT_INTERVAL } from '../types'
import { EndDate } from './end-date-input'
import { IntervalButtonGroup } from './interval-button-group'
import { RepeatSelect } from './repeat-select'
import { ScheduleTemplateSchemaType } from './schedule-report-form'
import { StartDate } from './start-date-input'
import { WeekdaysSelect } from './week-days-select'

const ScheduleReportIntervals = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>();
  const repeatCount = form.watch('repeatCount');
  const repeatInterval = form.watch('repeatInterval');
  return (
    <>
      <Flex className="gap-x-3.5 mt-2">
        <StartDate />
        {repeatCount === REPEAT_INTERVAL.NOREPEAT && <EndDate />}
        <RepeatSelect />
      </Flex>

      {repeatCount !== REPEAT_INTERVAL.NOREPEAT && repeatInterval !== INTERVAL.MONTH && repeatInterval !== INTERVAL.YEAR && (
        <WeekdaysSelect />
      )}
      {repeatCount !== REPEAT_INTERVAL.NOREPEAT && (repeatInterval === INTERVAL.MONTH || repeatInterval === INTERVAL.YEAR) && (
        <IntervalButtonGroup intervalType={repeatInterval as INTERVAL.MONTH | INTERVAL.YEAR} />
      )}
      {repeatCount !== REPEAT_INTERVAL.NOREPEAT && <EndDate />}
    </>
  )
}

export { ScheduleReportIntervals }

