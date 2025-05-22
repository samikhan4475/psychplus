'use client'

import { useEffect, useState } from 'react'
import { Document, DocumentType } from '@psychplus-v2/types'
import { cn } from '@psychplus-v2/utils'
import * as Tabs from '@radix-ui/react-tabs'
import { Box, Button, Dialog } from '@radix-ui/themes'
import parse from 'html-react-parser'
import { getDocument } from '@/actions'
import {
  CloseDialogIcon,
  CONSENT_DOCUMENT_MAP,
  LoadingPlaceholder,
  PolicyMeta,
} from '@/components-v2'

interface ConsentViewProps {
  open: boolean
  setOpen: (open: boolean) => void
  activeTab?: DocumentType
  documentType?: DocumentType
  tabsToShow?: PolicyMeta[]
}

const ConsentView = ({
  open,
  setOpen,
  activeTab: activeTabProp,
  tabsToShow,
}: ConsentViewProps) => {
  const tabs = tabsToShow ?? Object.values(CONSENT_DOCUMENT_MAP).flat()
  const [activeTab, setActiveTab] = useState<DocumentType>(
    activeTabProp ?? tabs[0]?.slug,
  )

  useEffect(() => {
    if (activeTabProp) setActiveTab(activeTabProp)
  }, [activeTabProp])

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content className="relative !m-0 max-w-[700px] overflow-hidden !p-0">
        <Dialog.Title className="px-5 pt-4 font-sans -tracking-[0.25px]">
          Policies
          <CloseDialogIcon />
        </Dialog.Title>
        <Tabs.Root value={activeTab}>
          <Tabs.List className="no-scrollbar border-pp-gray-4/50 flex gap-2 overflow-x-scroll border-b px-5 pb-4">
            {tabs.map((tab) => (
              <Tabs.Trigger
                key={tab.name}
                value={tab.slug}
                className={cn(
                  'border-pp-gray-4 whitespace-nowrap rounded-5 border p-2 text-[12px] font-medium',
                  activeTab === tab.slug && 'bg-pp-blue-3 text-white',
                )}
                onClick={() => setActiveTab(tab.slug)}
              >
                {tab.name}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          {tabs.map((tab) => (
            <Tabs.Content key={tab.name} value={tab.slug}>
              {activeTab === tab.slug && (
                <ConsentViewContent documentType={tab.slug} />
              )}
            </Tabs.Content>
          ))}
        </Tabs.Root>
        <Box className="border-pp-gray-4/50 border-t px-4 py-4">
          <Dialog.Close>
            <Button
              variant="outline"
              color="gray"
              highContrast
              className="w-full"
            >
              Close
            </Button>
          </Dialog.Close>
        </Box>
      </Dialog.Content>
    </Dialog.Root>
  )
}

const ConsentViewContent = ({
  documentType,
}: {
  documentType: DocumentType
}) => {
  const [document, setDocument] = useState<Document | undefined>(undefined)

  useEffect(() => {
    setDocument(undefined)
    getDocument(documentType).then((res) => {
      if (res.state === 'error') {
        throw new Error(res.error)
      }
      setDocument(res.data)
    })
  }, [documentType])

  return (
    <>
      {document ? (
        <Box className="no-scrollbar h-96 overflow-y-auto px-5">
          {parse(document.content)}
        </Box>
      ) : (
        <LoadingPlaceholder />
      )}
    </>
  )
}

export { ConsentView }
