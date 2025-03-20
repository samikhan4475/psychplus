'use client'

import { useSearchParams } from 'next/navigation'
import { LabDocument } from './types'
import { ViewDocumentButton } from './view-document-button'

interface ResultsPdfViewProps {
  resultPdfDetails?: LabDocument
}
const ResultsPdfView = ({ resultPdfDetails }: ResultsPdfViewProps) => {
  const searchParams = useSearchParams()
  const appointmentId = searchParams.get('id')

  return (
    <ViewDocumentButton
      pdfDetails={resultPdfDetails ?? null}
      appointmentId={appointmentId}
      buttonText="View Results"
      title="Results PDF"
    />
  )
}

export { ResultsPdfView }
