'use client'

import { DropdownMenu, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { Printer } from 'lucide-react'
import { LabOrders } from '@/types'
import { LabOrderStatusEnum } from '../../add-lab-order/blocks/types'
import { RequisitionPdfView } from '../requisition-pdf-view'
import { ResultsPdfView } from '../results-pdf-view'
import { LabDocument, LabOrderPdf } from '../types'

const RowResultAttachment = ({ row }: { row: Row<LabOrders> }) => {
  const { ResultsPdf, RequisitionPdf } = LabOrderPdf

  const labDocuments = row?.original?.labDocuments || []
  const orderStatus = row.original?.orderStatus

  const resultPdfDetails = labDocuments.find(
    (item: LabDocument) => item?.documentType === ResultsPdf,
  )
  const requisitionPdfDetails = labDocuments.find(
    (item: LabDocument) => item?.documentType === RequisitionPdf,
  )
  
  const isDisabled = () =>
    orderStatus === LabOrderStatusEnum.SignedSent ||
    orderStatus === LabOrderStatusEnum.ResultReceived

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger disabled={!isDisabled()}>
        <IconButton size="1" color="gray" variant="ghost">
          <Printer
            size={14}
            className="text-pp-black-3"
            color={!isDisabled() ? 'gray' : 'black'}
          />
        </IconButton>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="flex flex-col" align="start" size="1">
        <ResultsPdfView resultPdfDetails={resultPdfDetails} />
        <DropdownMenu.Separator className="m-0 p-0" />
        <RequisitionPdfView requisitionPdfDetails={requisitionPdfDetails} />
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}

export { RowResultAttachment }
