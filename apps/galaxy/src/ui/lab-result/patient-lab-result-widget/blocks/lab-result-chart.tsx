'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
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

  const selectedSubRow = selectedTest?.subRows.find((sub: SubRow) =>
    Object.values(sub.resultsByDate ?? {}).some(
      (entry) => entry.resultId === selectedTestId,
    ),
  )

  const selectedResultName = selectedSubRow?.resultName ?? 'No Result Name'
  const entries = selectedSubRow?.resultsByDate
    ? (Object.values(selectedSubRow.resultsByDate) as ResultByDateEntry[])
    : []

  const filteredEntries = entries.filter(
    (entry) => !isNaN(Number(entry.resultValue)),
  )

  const chartData = filteredEntries
    .map((entry) => {
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
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

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
