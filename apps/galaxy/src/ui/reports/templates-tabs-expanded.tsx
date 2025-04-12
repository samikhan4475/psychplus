'use client'

import { Box, Flex, ScrollArea, Text } from '@radix-ui/themes'
import { MedicalReportIcon } from '@/components/icons'
import { AddTemplateButton } from './add-template-button'
import { TabItem } from './reports-tabs-item'
import { useStore } from './store'

const ExpandedSidebar = () => {
  const {
    setSelectedTemplate,
    templates,
    selectedReport,
    selectedTemplate,
    setGeneratedReport,
    resetData,
    setScheduleReports,
    resetPageCache,
    resetScheduledReportPageCache,
  } = useStore()

  const filteredTemplates = templates.filter(
    (template) => template.reportCategoryCode === selectedReport?.code,
  )

  const handleTemplateClick = (template: any) => {
    setSelectedTemplate(template)
    resetData()
    setGeneratedReport(null)
    setScheduleReports(undefined)
    resetScheduledReportPageCache()
    resetPageCache()
  }

  return (
    <Box className="bg-white relative flex h-full w-[224px] flex-col transition-all duration-300">
      <ScrollArea className="h-[80vh]">
        <Flex direction="column" className="h-full gap-1 p-2">
          <Flex align="center" className="my-2" justify="between">
            <Flex align="center">
              <MedicalReportIcon />
              <Text className="text-pp-black-3 ml-1 font-medium">
                {selectedReport?.displayName}
              </Text>
            </Flex>
            <AddTemplateButton />
          </Flex>
          {filteredTemplates.map((item) => (
            <TabItem
              key={item.id}
              displayName={item.displayName}
              isActive={selectedTemplate?.id === item.id}
              onClick={() => handleTemplateClick(item)}
            />
          ))}
        </Flex>
      </ScrollArea>
    </Box>
  )
}

export { ExpandedSidebar }
