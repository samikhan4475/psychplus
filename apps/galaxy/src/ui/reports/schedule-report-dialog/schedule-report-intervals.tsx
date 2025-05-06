'use client'

import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { REPEAT_INTERVAL } from '../types'
import { CronJobFields } from './cron-job-fields'
import { DataRangeAndParameter } from './data-range-and-parameter'
import { EndDate } from './end-date-input'
import { RepeatSelect } from './repeat-select'
import { ScheduleTemplateSchemaType } from './schedule-report-form'
import { StartDate } from './start-date-input'

const ScheduleReportIntervals = () => {
  const form = useFormContext<ScheduleTemplateSchemaType>()
  const repeatCount = form.watch('repeatCount')
  return (
    <>
      <Flex className="mt-2 gap-x-3.5 py-2" align="start">
        <StartDate />
        <RepeatSelect />
      </Flex>
      {repeatCount !== REPEAT_INTERVAL.NOREPEAT && <CronJobFields />}

      <DataRangeAndParameter />
      <Text size="1" weight="medium" className="my-2">
        Occurs until
      </Text>
      <EndDate />
    </>
  )
}

export { ScheduleReportIntervals }
