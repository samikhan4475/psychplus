import { Flex, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import {
  FormFieldContainer,
  FormFieldError,
  MultiSelectField,
} from '@/components'
import { INTERVAL } from '../types'
import {
  hourOptions,
  minuteOptions,
  monthDateOptions,
  monthOptions,
  weekdayOptions,
} from './constants'
import { IntervalSelect } from './interval-select'
import { ScheduleTemplateSchemaType } from './schedule-report-form'

const CronJobFields = () => {
  const { watch, setValue } = useFormContext<ScheduleTemplateSchemaType>()
  const repeatInterval = watch('repeatInterval')

  const renderYearSelect = () =>
    repeatInterval === INTERVAL.YEAR && (
      <Flex gap="1" align="center">
        <Text size="1">in</Text>
        <FormFieldContainer>
          <MultiSelectField
            defaultValues={watch('monthSelection')}
            options={monthOptions}
            onChange={(values) => setValue('monthSelection', values)}
            className="w-full min-w-[120px]"
            placeholder="every month"
          />
          <FormFieldError name="monthOptions" />
        </FormFieldContainer>
      </Flex>
    )

  const renderWeekdaysSelect = () =>
    repeatInterval === INTERVAL.WEEK && (
      <Flex gap="1" align="center">
        <Text size="1">on</Text>
        <FormFieldContainer>
          <MultiSelectField
            defaultValues={watch('weekdaysSelection')}
            options={weekdayOptions}
            onChange={(values) => setValue('weekdaysSelection', values)}
            className="w-full min-w-[120px]"
            placeholder="everyday of the week"
          />
          <FormFieldError name="weekdaysSelection" />
        </FormFieldContainer>
      </Flex>
    )

  const renderTimeSelect = () =>
    repeatInterval !== INTERVAL.MINUTE && (
      <Flex className="flex-1" gap="1" align="center">
        <Text size="1">at</Text>
        {repeatInterval !== INTERVAL.HOUR && (
          <>
            <FormFieldContainer>
              <MultiSelectField
                defaultValues={watch('hourSelection')}
                options={hourOptions}
                onChange={(values) => setValue('hourSelection', values)}
                className="w-full min-w-[60px]"
                placeholder="every hour"
              />
              <FormFieldError name="hourSelection" />
            </FormFieldContainer>
            <Text size="1">:</Text>
          </>
        )}
        <FormFieldContainer>
          <MultiSelectField
            defaultValues={watch('minuteSelection')}
            options={minuteOptions}
            onChange={(values) => setValue('minuteSelection', values)}
            className="w-full min-w-[60px]"
            placeholder="every minute"
          />
          <FormFieldError name="minuteSelection" />
        </FormFieldContainer>
      </Flex>
    )

  const renderMonthDateSelect = () => {
    if (
      repeatInterval &&
      ![INTERVAL.WEEK, INTERVAL.HOUR, INTERVAL.MINUTE, INTERVAL.DAY].includes(
        repeatInterval as INTERVAL,
      )
    )
      return (
        <Flex gap="1" align="center">
          <Text size="1">on</Text>
          <FormFieldContainer>
            <MultiSelectField
              defaultValues={watch('monthDateSelection')}
              options={monthDateOptions}
              onChange={(values) => setValue('monthDateSelection', values)}
              className="w-full min-w-[120px]"
              placeholder="every day of month"
            />
            <FormFieldError name="monthOptions" />
          </FormFieldContainer>
        </Flex>
      )
  }
  return (
    <FormFieldContainer className="flex-row flex-wrap items-start gap-2">
      <Text size="1" className="pt-1">
        Every
      </Text>
      <IntervalSelect />
      {renderYearSelect()}
      {renderMonthDateSelect()}
      {renderWeekdaysSelect()}
      {renderTimeSelect()}
    </FormFieldContainer>
  )
}

export { CronJobFields }
