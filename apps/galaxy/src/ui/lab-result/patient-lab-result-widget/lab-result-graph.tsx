'use client'

import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import LabResultChart from './blocks/lab-result-chart'
import LabResultChartSidebar from './blocks/lab-result-chart-sidebar'
import { processSubRows } from './columns'
import { useLabTestStore, useStore } from './store'
import { ProcessedTestData } from './types'
import { updateResultsKey } from './utils'

const LabResultGraph = () => {
  const { data, loading } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
  }))

  const { setProcessedData, setSelectedTest } = useLabTestStore()

  useEffect(() => {
    if (!data) return

    const processed = updateResultsKey(data).map((test) => ({
      ...test,
      subRows: processSubRows(test.subRows || []),
    }))

    setProcessedData(processed as ProcessedTestData[])

    const firstSubRow = processed?.[0]?.subRows?.[0]
    const firstEntry = firstSubRow?.resultsByDate
      ? Object.values(firstSubRow.resultsByDate)[0]
      : undefined

    if (firstEntry?.resultId) {
      setSelectedTest(
        firstEntry.resultId,
        processed[0].testName,
        firstEntry?.resultName ?? '',
      )
    }
  }, [data])

  if (loading) {
    return <LoadingPlaceholder className="bg-white h-full" />
  }

  return (
    <Flex className="h-screen bg-gray-1">
      <LabResultChartSidebar />
      <Box className="flex-1 p-6">
        <LabResultChart />
      </Box>
    </Flex>
  )
}

export { LabResultGraph }
