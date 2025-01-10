'use client'

import { useSearchParams } from 'next/navigation'
import { LabDocument } from './types'
import { ViewDocumentButton } from './view-document-button'

interface RequistionPdfViewProps {
  requisitionPdfDetails: LabDocument
}
const RequisitionPdfView = ({
  requisitionPdfDetails,
}: RequistionPdfViewProps) => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  return (
    <ViewDocumentButton
      pdfDetails={requisitionPdfDetails}
      appointmentId={appointmentId}
      buttonText="Requisition File"
      title="Requisition PDF"
    />
  )
}

export { RequisitionPdfView }
