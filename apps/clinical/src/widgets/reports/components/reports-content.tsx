import { useEffect, useRef, useState } from 'react'
import { PlusIcon } from '@radix-ui/react-icons'
import { Button, Flex, Tabs } from '@radix-ui/themes'
import { usePubsub } from '@psychplus/utils/event'
import { ADD_TEMPLATE_WIDGET } from '@psychplus/widgets'
import { EventType } from '@psychplus/widgets/events'
import { ReportLayout, TabsContentLayout, TabsLayout } from '../layout'
import { useStore } from '../store'
import { EditTemplateButton } from './edit-template-button'
import { Header } from './header'
import PdfButtonsGroup from './pdf-buttons-group'

const tabButtonClasses =
  'justify-start text-[14px] data-[state=active]:font-[510] data-[state=active]:before:bg-transparent data-[state=active]:bg-[#0144FF26] pr-5 truncate pl-0.5 py-1 rounded-[4px] text-[#000000] w-full'

const ReportsContent = ({
  category,
  title,
}: {
  category: string
  title: string
}) => {
  const templatesIndex = useStore((state) => state.templatesIndex)
  const { publish } = usePubsub()
  const [tabValue, setTabValue] = useState<string>('')
  const [reportContent, setReportContent] = useState<string | undefined>(
    undefined,
  )
  const reportWindowRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    if (tabValue) setReportContent(undefined)
  }, [tabValue])

  const printReport = () => {
    const iframe = reportWindowRef.current
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.print()
    }
  }

  return (
    <ReportLayout
      onChange={setTabValue}
      defaultValue={templatesIndex[category]?.[0]?.shortName ?? ''}
    >
      <TabsLayout title={title}>
        <Button
          variant="outline"
          className="mb-2 flex h-6 w-[82px] gap-x-1 px-1 text-[12px] text-[#000000] [box-shadow:inset_0_0_0_0.5px_#9E9898CC]"
          onClick={() => publish(`${ADD_TEMPLATE_WIDGET}:${EventType.Opened}`)}
        >
          <PlusIcon width={12} height={12} />
          Add New
        </Button>
        {templatesIndex[category]?.map((template) => (
          <Tabs.Trigger
            key={template.id}
            value={template.shortName}
            className={tabButtonClasses}
          >
            {template.displayName}
          </Tabs.Trigger>
        ))}
      </TabsLayout>
      <TabsContentLayout>
        {templatesIndex[category]?.map((template) => (
          <Tabs.Content
            key={`content-${template.id}`}
            value={template.shortName}
            className="h-full"
          >
            <Flex direction="column" className="h-full">
              <Header
                title={template.displayName}
                parameters={template.reportTemplateParameters}
                onGenerate={(report) => setReportContent(report)}
                isAdhocAllowed={template.isAdhocAllowed}
              >
                <EditTemplateButton template={template} />
              </Header>
              {reportContent && <PdfButtonsGroup handlePrint={printReport} />}
              <iframe
                ref={reportWindowRef}
                className="w-full flex-1"
                srcDoc={reportContent}
              />
            </Flex>
          </Tabs.Content>
        ))}
      </TabsContentLayout>
    </ReportLayout>
  )
}

export { ReportsContent }
