'use client'

import { DropdownMenu, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { EyeIcon } from 'lucide-react'
import { LabOrders } from '@/types'
import { LabOrderStatusEnum } from '../add-lab-order/blocks/types'
import { RequisitionPdfView } from '../lab-orders-widget/requisition-pdf-view'
import { LabDocument, LabOrderPdf } from './types'
import { ResultsPdfView } from '../lab-orders-widget/results-pdf-view'
const RowResultDetail = ({ row }: { row: Row<LabOrders> }) => {
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
          <EyeIcon
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

export { RowResultDetail }
