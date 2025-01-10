'use client'

import { DropdownMenu, IconButton } from '@radix-ui/themes'
import { Paperclip } from 'lucide-react'
import { RequisitionPdfView } from '../requisition-pdf-view'
import { ResultsPdfView } from '../results-pdf-view'
import { LabDocument, LabOrderPdf } from '../types'

const RowResultAttachment = ({ row }: any) => {
  const { ResultsPdf, RequisitionPdf } = LabOrderPdf

  const { labDocuments } = row.original
  const resultPdfDetails = labDocuments.find(
    (item: LabDocument) => item?.documentType === ResultsPdf,
  )
  const requisitionPdfDetails = labDocuments.find(
    (item: LabDocument) => item?.documentType === RequisitionPdf,
  )

  return (
    <IconButton size="1" color="gray" variant="ghost" type="button">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton size="1" color="gray" variant="ghost">
            <Paperclip size={14} className="text-pp-black-3" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex flex-col" align="start" size="1">
          <ResultsPdfView resultPdfDetails={resultPdfDetails} />
          <DropdownMenu.Separator className="m-0 p-0" />
          <RequisitionPdfView requisitionPdfDetails={requisitionPdfDetails} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </IconButton>
  )
}

export { RowResultAttachment }
