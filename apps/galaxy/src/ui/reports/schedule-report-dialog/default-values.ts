import { getCalendarDate } from '@/utils'
import {
  ScheduledReport,
  Template,
} from '../types'
import { decryptCronExpression } from '../utils'

const defaultValues = (
  selectedTemplate?: Template | null,
  data?: ScheduledReport,
) => {
  let forDuration = ''
  let numberOfDuration = ''
  let durationInterval = ''
  let parameters = data
    ? data.parameters
      .map((param) => ({
        ...param,
        id: param.templateParameterId,
        scheduleParameterValue: (!param.scheduleParameterValue?.includes('::') && typeof param.scheduleParameterValue === 'string')
          ? param.scheduleParameterValue.split(",")
          : param.scheduleParameterValue,
      }))
    : selectedTemplate?.parameters

  let repeatInterval = ''
  let repeatCount = ''
  let scheduleDays: string[] = []

  if (data?.cronScheduleJobDefinition) {
    const {
      repeatInterval: decryptedRepeatInterval,
      scheduleDays: decryptedScheduleDays,
      repeatCount: decryptedRepeatCount,
    } = decryptCronExpression(data.cronScheduleJobDefinition)

    repeatInterval = decryptedRepeatInterval
    scheduleDays = decryptedScheduleDays
    repeatCount = decryptedRepeatCount
  }

  const distributionGroups = data
    ? data.distributionGroups?.map((group) => group.distributionGroupId)
    : []
  if (parameters?.length) {
    parameters = parameters.map((param) => {
      if (param.scheduleParameterValue && typeof param.scheduleParameterValue === 'string') {
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
    terminateOn: data ? getCalendarDate(data.terminateOn) : undefined,
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
  }
}

export { defaultValues }
