'use client'

import { useEffect, useState } from 'react'
import { Document, DocumentType } from '@psychplus-v2/types'
import { Box, Button, Dialog } from '@radix-ui/themes'
import parse from 'html-react-parser'
import { getDocument } from '@/actions'
import { CloseDialogIcon, LoadingPlaceholder } from '@/components-v2'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@psychplus-v2/utils'

interface ConsentViewProps {
  open: boolean
  setOpen: (open: boolean) => void
  documentType?: DocumentType
}

const ConsentView = ({ open, setOpen }: ConsentViewProps) => {
  const [activeTab, setActiveTab] = useState(DocumentType.TERMS_AND_CONDITIONS)
  const tabs = [
    {
      id: '1',
      label: 'Terms of Service',
      documentType: DocumentType.TERMS_AND_CONDITIONS,
    },
    {
      id: '2',
      label: 'Privacy Policy',
      documentType: DocumentType.PRIVACY_POLICY,
    },
    {
      id: '3',
      label: 'Notice of Privacy Practice',
      documentType: DocumentType.PRIVACY_PRACTICE,
    },
    {
      id: '4',
      label: 'Patient Service Agreement',
      documentType: DocumentType.PATIENT_SERVICE_AGREEMENT,
    },
    {
      id: '5',
      label: 'Consent for Treatment',
      documentType: DocumentType.CONSENT_FOR_TREATMENT,
    },
  ]

  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <Dialog.Content className="relative max-w-[700px] !p-0 !m-0 overflow-hidden">
      <Dialog.Title className="font-sans -tracking-[0.25px] px-5 pt-4">
            Policies
        <CloseDialogIcon />
          </Dialog.Title>
        <Tabs.Root value={activeTab} className="w-full">
            <Tabs.List className="overflow-x-scroll flex gap-2 no-scrollbar px-5 border-b border-pp-gray-4/50 pb-4">
              {tabs.map((tab) => (
                <Tabs.Trigger
                  key={tab.id}
                  value={tab.id}
                  className={cn("text-[12px] font-medium border border-pp-gray-4 rounded-5 whitespace-nowrap p-2",
                    activeTab === tab.documentType && 'text-[12px] bg-pp-blue-3 text-white'
                  )}
                  onClick={() => setActiveTab(tab.documentType)}
                >
                  {tab.label}
                </Tabs.Trigger>
              ))}
            </Tabs.List>
            
            <Tabs.Content value={activeTab}>
              <ConsentViewContent documentType={activeTab} />
            </Tabs.Content>
          </Tabs.Root>
        <Box className='border-t border-pp-gray-4/50 py-4 px-4'>
          <Dialog.Close className="">
            <Button variant="outline" color="gray" highContrast className='w-full'>
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
        <>
          <Box className="h-96 overflow-y-auto px-5 no-scrollbar">
            {parse(document.content)}
          </Box>
        </>
      ) : (
        <LoadingPlaceholder />
      )}
    </>
  )
}

export { ConsentView }
