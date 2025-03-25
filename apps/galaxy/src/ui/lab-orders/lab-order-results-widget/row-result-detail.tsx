'use client'

import { DropdownMenu, IconButton } from '@radix-ui/themes'
import { EyeIcon } from 'lucide-react'
import { ResultsPdfView } from '../lab-orders-widget/results-pdf-view'
import { LabDocument, LabOrderPdf } from './types'

const RowResultDetail = ({ row }: any) => {
  const { ResultsPdf } = LabOrderPdf

  const labDocuments = row?.original?.labDocuments || []

  const resultPdfDetails = labDocuments.find(
    (item: LabDocument) => item?.documentType === ResultsPdf,
  )
 
  return (
    <IconButton size="1" color="gray" variant="ghost" type="button">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <IconButton size="1" color="gray" variant="ghost">
            <EyeIcon size={14} className="text-pp-black-3" />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className="flex flex-col" align="start" size="1">
          <ResultsPdfView resultPdfDetails={resultPdfDetails} />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </IconButton>
  )
}

export { RowResultDetail }
