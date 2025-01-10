'use client'

import { Button } from '@radix-ui/themes'
import { getLabOrderPdfAction } from './actions'
import { LabDocument } from './types'

interface ViewDocumentButtonProps {
  pdfDetails: LabDocument | null
  appointmentId: string | null
  buttonText: string
  title: string
}

const ViewDocumentButton = ({
  pdfDetails,
  appointmentId,
  buttonText,
  title,
}: ViewDocumentButtonProps) => {
  const openPdfInNewWindow = (base64Data: string, title: string) => {
    const src = `data:application/pdf;base64,${base64Data}`
    const newWindow = window.open()
    if (newWindow) {
      newWindow.document.title = title
      const iframe = newWindow.document.createElement('iframe')
      iframe.src = src
      iframe.style.width = '100%'
      iframe.style.height = '100%'
      newWindow.document.body.appendChild(iframe)
    }
  }
  const handleViewPdf = async () => {
    if (appointmentId && pdfDetails) {
      const response = await getLabOrderPdfAction(
        appointmentId,
        pdfDetails.orderId,
        pdfDetails.id,
      )

      if (response.state === 'success') {
        openPdfInNewWindow(response.data, title)
      }
    }
  }

  return (
    <Button
      disabled={!pdfDetails}
      onClick={handleViewPdf}
      type="button"
      size="2"
      className={`bg-white text-pp-blue  ${!pdfDetails && '!text-gray-6'}`}
    >
      {buttonText}
    </Button>
  )
}

export { ViewDocumentButton }
