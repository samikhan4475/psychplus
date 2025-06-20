'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { DateRangeInput } from '@/ui/schedule/calendar-view/filter-fields'
import { useStore as useDateRangeStore } from '@/ui/schedule/calendar-view/store'
import {
  convertToCalendarDate,
  formatEndOfDay,
  formatStartOfDay,
} from '@/utils/date'
import { useLabTestStore } from '../store'
import { LabResults } from '../types'
import { LabResultChartData } from './lab-result-chart-data'

interface ResultByDateEntry {
  resultId: string
  resultValue: string
  observationTime: string
  resultUnit: string
  recomendedValue: string
}
interface SubRow {
  resultName: string
  resultsByDate: Record<string, LabResults>
  testName?: string
  observationTime?: Date | string
}
const LabResultChart = () => {
  const { selectedTestId, selectedTestName, processedData } = useLabTestStore()
  const selectedTest = processedData.find(
    (test) => test.testName === selectedTestName,
  )

  const { weekStartDate } = useDateRangeStore((s) => ({
    weekStartDate: s.weekStartDate,
  }))

  const startDate = new Date(
    formatStartOfDay(convertToCalendarDate(weekStartDate)),
  )
  const endDate = new Date(
    formatEndOfDay(convertToCalendarDate(weekStartDate.add({ days: 7 }))),
  )
  const selectedSubRow = selectedTest?.subRows.find((sub: SubRow) =>
    Object.values(sub.resultsByDate ?? {}).some(
      (entry) => entry.resultId === selectedTestId,
    ),
  )

  const selectedResultName = selectedSubRow?.resultName ?? 'No Result Name'
  const entries = selectedSubRow?.resultsByDate
    ? (Object.values(selectedSubRow.resultsByDate) as ResultByDateEntry[])
    : []

  const filteredEntries = entries
    .filter((entry) => !isNaN(Number(entry.resultValue)))
    .filter((entry) => {
      const obsDate = new Date(entry.observationTime)
      return obsDate >= startDate && obsDate <= endDate
    })

  const chartData = filteredEntries.map((entry) => {
    const value = Number(entry.resultValue)
    const [minStr, maxStr] = entry.recomendedValue?.split('-') ?? []
    const min = minStr ? parseFloat(minStr) : undefined
    const max = maxStr ? parseFloat(maxStr) : min

    return {
      date: entry.observationTime,
      value,
      unit: entry.resultUnit,
      recommendedMin: min,
      recommendedMax: max,
    }
  })

  return (
    <Box className="bg-white rounded-lg shadow-md h-[400px] w-full p-5">
      <Flex
        direction="row"
        justify="between"
        align="center"
        className="border-gray-200 mb-5 border-b pb-2"
      >
        <Flex direction="row" align="center">
          <Text size="2" weight="bold" className="text-gray-800">
            {selectedTestName}
          </Text>
          <Text size="1" className="text-sm text-gray-600 mx-3">
            -
          </Text>
          <Text size="1" className="text-sm text-gray-600">
            {selectedResultName}
          </Text>
        </Flex>

        <Box>
          <DateRangeInput hideLabel={true} />
        </Box>
      </Flex>

      {chartData.length > 0 ? (
        <LabResultChartData
          dailyRevenue={chartData}
          tooltipLabel={selectedResultName}
        />
      ) : (
        <Text size="2" className="text-gray-500 text-center">
          No valid chart data available.
        </Text>
      )}
    </Box>
  )
}

export default LabResultChart
