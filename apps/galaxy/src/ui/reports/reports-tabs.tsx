'use client'

import { useEffect } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder, TabsTrigger } from '@/components'
import { Code } from '@/types'
import { ReportsTemplateTabs } from './reports-template-tabs'
import { useStore } from './store'

const ReportsTabs = () => {
  const {
    reports,
    loading,
    fetchReportsAndTemplates,
    selectedReport,
    setSelectedReport,
    setGeneratedReport,
    setSelectedTemplate,
    fetchStaffData,
    resetData,
  } = useStore()

  useEffect(() => {
    fetchReportsAndTemplates()
    fetchStaffData()
  }, [fetchReportsAndTemplates, fetchStaffData])

  const filteredReports = reports.filter(
    (report) =>
      report.code === 'Provider' ||
      report.codeAttributes?.every((attr) => attr.content !== '99'),
  )

  const handleTabClick = (reportItem: Code) => {
    setSelectedReport(reportItem)
    resetData()
    setSelectedTemplate(null)
    setGeneratedReport(null)
  }

  if (loading) {
    return (
      <Flex
        height="100%"
        align="center"
        justify="center"
        width="100%"
        className="h-[600px]"
      >
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <Flex className="w-full overflow-hidden rounded-1 shadow-2 ">
      <Tabs.Root className="flex w-full flex-col">
        <Flex direction="row" className="gap-1">
          <Tabs.List>
            {filteredReports.map((item) => (
              <TabsTrigger
                value={item.code}
                onClick={() => handleTabClick(item)}
                key={item.code}
              >
                {item.displayName}
              </TabsTrigger>
            ))}
          </Tabs.List>
        </Flex>
        <Tabs.Content
          value={selectedReport ? selectedReport.code : ''}
          className="flex flex-1 flex-col gap-2 data-[state=active]:flex"
        >
          {selectedReport && <ReportsTemplateTabs />}
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  )
}

export { ReportsTabs }
