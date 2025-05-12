import { SetStateAction } from 'react'
import { converter, PeriodType } from 'react-js-cron'
import { getCalendarDate } from '@/utils'
import { ScheduledReport, Template } from '../types'

const parseCronExpression = (cronExpression: string) => {
  let cronParts = cronExpression.split(' ')
  if (cronParts.length > 5) cronParts.shift()
  cronParts = cronParts.map((part) => (part === '?' ? '*' : part))
  return cronParts.join(' ')
}

const mapCronSelections = (
  cronExpression: string,
  internalValueRef: React.MutableRefObject<string>,
) => {
  let cronMinuteSelection: SetStateAction<number[] | undefined> = []
  let cronHourSelection: SetStateAction<number[] | undefined> = []
  let cronMonthSelection: SetStateAction<number[] | undefined> = []
  let cronMonthDateSelection: SetStateAction<number[] | undefined> = []
  let cronWeekdaysSelection: SetStateAction<number[] | undefined> = []
  let repeatInterval: SetStateAction<PeriodType> = 'minute'

  const cronExpressionParsed = parseCronExpression(cronExpression)

  converter.setValuesFromCronString(
    cronExpressionParsed,
    () => {},
    () => {},
    'always',
    internalValueRef,
    false,
    {},
    false,
    (minuteValue: SetStateAction<number[] | undefined>) => {
      cronMinuteSelection = minuteValue || []
    },
    (hourValue: SetStateAction<number[] | undefined>) => {
      cronHourSelection = hourValue
    },
    (monthDayValue: SetStateAction<number[] | undefined>) => {
      cronMonthDateSelection = monthDayValue
    },
    (monthValue: SetStateAction<number[] | undefined>) => {
      cronMonthSelection = monthValue
    },
    (weekDayValue: SetStateAction<number[] | undefined>) => {
      cronWeekdaysSelection = weekDayValue
    },
    (periodValue: SetStateAction<PeriodType>) => {
      repeatInterval = periodValue
    },
  )

  return {
    cronMinuteSelection,
    cronHourSelection,
    cronMonthSelection,
    cronMonthDateSelection,
    cronWeekdaysSelection,
    repeatInterval,
  }
}
const defaultValues = (
  internalValueRef: React.MutableRefObject<string>,
  selectedTemplate?: Template | null,
  data?: ScheduledReport,
) => {
  let forDuration = ''
  let numberOfDuration = ''
  let durationInterval = ''
  let parameters = data
    ? data.parameters.map((param) => ({
        ...param,
        id: param.id,
        scheduleParameterValue:
          !param.scheduleParameterValue?.includes('::') &&
          typeof param.scheduleParameterValue === 'string'
            ? param.scheduleParameterValue.split(',')
            : param.scheduleParameterValue,
        templateParameterId: param.templateParameterId,
      }))
    : selectedTemplate?.parameters

  if (parameters?.length && selectedTemplate?.parameters) {
    parameters = parameters.map((param) => {
      const matchingTemplateParam = selectedTemplate?.parameters?.find(
        (templateParam) => templateParam.id === param.templateParameterId,
      )
      if (matchingTemplateParam) {
        param.displayOrder = matchingTemplateParam.displayOrder
      }
      return param
    })
  }

  let repeatInterval: SetStateAction<PeriodType> = 'minute'
  let repeatCount = 'notrepeat'
  const scheduleDays: string[] = []

  let monthSelection: string[] = []
  let monthDateSelection: string[] = []
  let weekdaysSelection: string[] = []
  let hourSelection: string[] = []
  let minuteSelection: string[] = []

  const cronData = data?.cronScheduleJobDefinition
    ? mapCronSelections(data.cronScheduleJobDefinition, internalValueRef)
    : ''

  if (cronData) {
    monthSelection = cronData.cronMonthSelection.map(String)
    monthDateSelection = cronData.cronMonthDateSelection.map(String)
    weekdaysSelection = cronData.cronWeekdaysSelection.map(String)
    hourSelection = cronData.cronHourSelection.map(String)
    minuteSelection = cronData.cronMinuteSelection.map(String)
    repeatInterval = cronData.repeatInterval
    repeatCount = '1'
  }

  const distributionGroups = data
    ? data.distributionGroups?.map((group) => group.distributionGroupId)
    : []
  if (parameters?.length) {
    parameters = parameters.map((param) => {
      if (
        param.scheduleParameterValue &&
        typeof param.scheduleParameterValue === 'string'
      ) {
        const decryptedValue = param.scheduleParameterValue?.split('::')
        if (decryptedValue && decryptedValue.length === 3) {
          forDuration = decryptedValue[0] || ''
          numberOfDuration = decryptedValue[1] || ''
          durationInterval = decryptedValue[2] || ''
        }
      }
      return param
    })
  }

  return {
    beginOn: data ? getCalendarDate(data.beginOn) : undefined,
    terminateOn: data?.terminateOn
      ? getCalendarDate(data.terminateOn)
      : undefined,
    repeatCount,
    intervalOption: data ? data.intervalOption : '',
    forDuration,
    numberOfDuration,
    durationInterval,
    isSchedule: false,
    parameters: parameters?.sort((a, b) => a.displayOrder - b.displayOrder),
    repeatInterval,
    scheduleDays,
    distributionGroups,
    isEnabled: data ? data.isEnabled : true,
    monthSelection,
    monthDateSelection,
    weekdaysSelection,
    hourSelection,
    minuteSelection,
  }
}

export { defaultValues }
