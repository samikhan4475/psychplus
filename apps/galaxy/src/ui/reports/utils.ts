import toast from 'react-hot-toast'
import { addTemplateReportAction } from './actions'
import { ScheduleTemplateSchemaType } from './schedule-report-dialog/schedule-report-form'
import { ParameterCodeSet, ParsedCron } from './types'

export const parseGeneratedReport = (report: string) => {
  const lines = report.trim().split('\n')
  const parseLine = (line: string) => {
    const result = []
    let isInQuotes = false
    let currentField = ''

    for (let i = 0; i < line.length; i++) {
      const char = line[i]

      if (char === '"') {
        isInQuotes = !isInQuotes
      } else if (char === ',' && !isInQuotes) {
        result.push(currentField.trim())
        currentField = ''
      } else {
        currentField += char
      }
    }

    result.push(currentField.trim())
    return result
  }

  const headers = parseLine(lines[0])
  const rows = lines.slice(1).map(parseLine)

  const data = rows.map((row) => {
    const rowData: { [key: string]: string } = {}
    headers.forEach((header, index) => {
      rowData[header.trim()] = row[index].trim()
    })
    return rowData
  })

  return { headers, data }
}

export const formatHeader = (header: string) => {
  return header.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/_/g, ' ')
}

const truncateFileName = (fileName: string, maxLength = 15) => {
  if (fileName.length <= maxLength) return fileName
  return `${fileName.substring(0, maxLength)}...`
}

const getFieldType = (parameters: ParameterCodeSet[], code: string): string => {
  const fieldType = parameters.find(
    (parameter) => parameter.code === code,
  )?.displayName
  return fieldType ?? ''
}

const downloadCSVReport = (data: string, reportType: string) => {
  let blob
  if (reportType === 'csv') {
    if (typeof data !== 'string') {
      data = convertToCSV(data)
    }

    blob = new Blob([data], { type: 'text/csv;charset=utf-8;' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `report.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  } else {
    console.error('Unsupported report type')
  }
}

const convertToCSV = (data: any[]): string => {
  if (!data.length) return ''

  const headers = Object.keys(data[0]).join(',')
  const rows = data.map((obj) =>
    Object.values(obj)
      .map((val) => `"${val}"`)
      .join(','),
  )

  return [headers, ...rows].join('\n')
}

const handleUploadReport = async (
  definitionPayloadUrl: File,
  templateId: string,
  isNewFileAttached: boolean,
) => {
  const formData = new FormData()
  formData.append('file', definitionPayloadUrl)
  const reportResponse = await addTemplateReportAction({
    templateId,
    data: formData,
    isNewFileAttached,
  })

  if (reportResponse.state === 'error') {
    toast.error(
      reportResponse.error ??
        'There was a problem uploading the report. Please try again.',
    )
    return false
  }

  return true
}

const generateCronExpression = ({
  beginDate,
  repeatInterval,
  scheduleDays,
  intervalOption,
  repeatCount,
}: {
  beginDate: Date
  repeatInterval?: string
  scheduleDays?: string[]
  intervalOption?: string
  repeatCount?: string
}): string => {
  const minute = beginDate.getMinutes()
  const hour = beginDate.getHours()
  const month = beginDate.getMonth() + 1

  let cronExpression = ''

  switch (repeatInterval) {
    case 'day':
      if (scheduleDays && scheduleDays.length > 0) {
        const daysOfWeek = scheduleDays
          .map((day) => {
            const dayMap: { [key: string]: string } = {
              Sunday: '0',
              Monday: '1',
              Tuesday: '2',
              Wednesday: '3',
              Thursday: '4',
              Friday: '5',
              Saturday: '6',
            }
            return dayMap[day]
          })
          .join(',')
        cronExpression = `${minute} ${hour} * * ${daysOfWeek}`
      } else {
        cronExpression = `${minute} ${hour} * * *`
      }
      break

    case 'week': {
      const weekDays =
        scheduleDays
          ?.map((day) => {
            const dayMap: { [key: string]: string } = {
              Sunday: '0',
              Monday: '1',
              Tuesday: '2',
              Wednesday: '3',
              Thursday: '4',
              Friday: '5',
              Saturday: '6',
            }
            return dayMap[day]
          })
          .join(',') ?? '*'
      cronExpression = `${minute} ${hour} * * ${weekDays}`
      break
    }
    case 'month':
      cronExpression = intervalOption
        ? `${minute} ${hour} ${intervalOption} ${month}/${repeatCount} *`
        : `${minute} ${hour} ${beginDate.getDate()} ${month} *`
      break

    case 'year':
      cronExpression = intervalOption
        ? `${minute} ${hour} ${intervalOption} *`
        : `${minute} ${hour} ${beginDate.getDate()} ${
            beginDate.getMonth() + 1
          } *`
      break

    default:
      cronExpression = `${minute} ${hour} * * *`
      break
  }

  return cronExpression
}
const processParameters = (
  parameters: any[],
  selectedTemplateId: string | undefined,
  numberOfDuration: string,
  durationInterval: string,
  forDuration: string,
) => {
  return parameters.map((param) => {
    if (
      param.parameterCode === 'EndDate' ||
      param.parameterCode === 'StartDate' ||
      (param.scheduleParameterValue &&
        typeof param.scheduleParameterValue === 'string' &&
        param.scheduleParameterValue.includes('::'))
    ) {
      return {
        ...param,
        templateParameterId: param.templateParameterId
          ? param.templateParameterId
          : param.id,
        reportTemplateId: selectedTemplateId,
        scheduleParameterValue: `${forDuration}::${
          forDuration === 'last' ? numberOfDuration : 0
        }::${durationInterval}`,
      }
    }
    return {
      ...param,
      templateParameterId: param.templateParameterId
        ? param.templateParameterId
        : param.id,
      reportTemplateId: selectedTemplateId,
      scheduleParameterValue: Array.isArray(param.scheduleParameterValue)
        ? param.scheduleParameterValue.join(', ')
        : param.scheduleParameterValue,
    }
  })
}

function getRandomThreeDigit(): number {
  if (typeof window !== 'undefined' && window.crypto?.getRandomValues) {
    const array = new Uint32Array(1)
    window.crypto.getRandomValues(array)
    return (array[0] % 900) + 100
  } else {
    return 0
  }
}

const formatJobData = (
  cronScheduleDefinition: string,
  selectedTemplate: any,
  numberOfDuration: string,
) => {
  const updatedParameters =
    selectedTemplate?.parameters?.map((param: any) => ({
      ...param,
      shortName:
        param.displayName.replace(/\s+/g, '') +
        numberOfDuration +
        getRandomThreeDigit(),
      defaultValueContent: '',
    })) ?? []

  return {
    cronScheduleDefinition,
    runHistoryExpireDays: 45,
    shortName:
      selectedTemplate.displayName.replace(/\s+/g, '') +
      numberOfDuration +
      getRandomThreeDigit(),
    category: 'Reporter',
    scheduleType: 'Cron',
    displayName: selectedTemplate?.displayName,
    taskDefinitions: [
      {
        displayName: selectedTemplate?.displayName,
        implementationKey: 'ReportingJob',
        parameters: updatedParameters,
        defaultValueContent: ' ',
      },
    ],
  }
}

const dayMapReverse: { [key: string]: string } = {
  '0': 'Sunday',
  '1': 'Monday',
  '2': 'Tuesday',
  '3': 'Wednesday',
  '4': 'Thursday',
  '5': 'Friday',
  '6': 'Saturday',
}

const decryptCronExpression = (cron: string): ParsedCron => {
  const [minuteStr, hourStr, dayOfMonth, month, dayOfWeek] = cron.split(' ')

  const minute = parseInt(minuteStr, 10)
  const hour = parseInt(hourStr, 10)

  const now = new Date()
  now.setHours(hour)
  now.setMinutes(minute)
  now.setSeconds(0)
  now.setMilliseconds(0)

  let repeatInterval = ''
  let scheduleDays: string[] = []
  let intervalOption = ''
  let repeatCount = '1'

  if (dayOfWeek !== '*' && dayOfMonth === '*' && month === '*') {
    repeatInterval = 'week'
    scheduleDays = dayOfWeek.split(',').map((d) => dayMapReverse[d])
  } else if (month.includes('/')) {
    repeatInterval = 'month'
    intervalOption = dayOfMonth
    repeatCount = month.split('/')[1]
  } else if (dayOfMonth !== '*' && month !== '*') {
    repeatInterval = 'year'
    intervalOption = dayOfMonth
  } else {
    repeatInterval = 'week'
  }

  return {
    beginDate: now,
    repeatInterval,
    scheduleDays,
    intervalOption,
    repeatCount,
  }
}

const getScheduleText = (repeatInterval: string, scheduleDays: string[]) => {
  if (repeatInterval === 'day') {
    return `Every day ${scheduleDays.join(', ')}`
  }

  if (repeatInterval === 'week') {
    return `Weekly On ${scheduleDays.join(', ')}`
  }

  if (repeatInterval === 'month') {
    return 'Monthly'
  }

  if (repeatInterval === 'year') {
    return 'Annually'
  }

  return 'Not scheduled'
}

const convertToNumber = (data: ScheduleTemplateSchemaType) => {
  return {
    ...data,
    monthSelection: data.monthSelection.map(Number),
    monthDateSelection: data.monthDateSelection.map(Number),
    weekdaysSelection: data.weekdaysSelection.map(Number),
    hourSelection: data.hourSelection.map(Number),
    minuteSelection: data.minuteSelection.map(Number),
  }
}

const getPeriodFromCronString = (cronString: string): string => {
  const cronParts = cronString.split(' ')

  const [minute, hour, dayOfMonth, month, weekday] = cronParts

  if (weekday && weekday !== '*' && weekday !== '?') {
    return 'week'
  }

  if (dayOfMonth && dayOfMonth !== '*' && dayOfMonth !== '?') {
    return 'month'
  }

  if (
    month &&
    month !== '*' &&
    month !== '?' &&
    dayOfMonth === '1' &&
    hour === '0' &&
    minute === '0'
  ) {
    return 'year'
  }

  return 'day'
}

export {
  truncateFileName,
  getFieldType,
  downloadCSVReport,
  handleUploadReport,
  generateCronExpression,
  processParameters,
  formatJobData,
  decryptCronExpression,
  getScheduleText,
  convertToNumber,
  getPeriodFromCronString,
}
