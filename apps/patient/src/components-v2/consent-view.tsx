'use client'

import { useEffect, useState } from 'react'
import { Document, DocumentType } from '@psychplus-v2/types'
import { Box, Button, Dialog, Flex } from '@radix-ui/themes'
import parse from 'html-react-parser'
import { getDocument } from '@/actions'
import { CloseDialogIcon, LoadingPlaceholder } from '@/components-v2'

interface ConsentViewProps {
  documentType: DocumentType
  open: boolean
  setOpen: (open: boolean) => void
}

const ConsentView = ({ open, setOpen, documentType }: ConsentViewProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(open) => {
        setOpen(open)
      }}
    >
      <Dialog.Content className="relative max-w-[700px]">
        <CloseDialogIcon />

        <ConsentViewContent documentType={documentType} />
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="outline" color="gray" highContrast>
              Close
            </Button>
          </Dialog.Close>
        </Flex>
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
          <Dialog.Title className="font-sans -tracking-[0.25px]">
            {document.name}
          </Dialog.Title>
          <Box className="mt-2 h-96 overflow-y-auto">
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
