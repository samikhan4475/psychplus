import { useEffect, useState } from 'react'
import { ClipboardIcon, Link2Icon, TokensIcon } from '@radix-ui/react-icons'
import { Box } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import { getDocumnetAgainstLaborder } from '@psychplus/lab-orders/api.client'
import { LabDocument, LabOrder, LabOrderPdf, MenuItemType } from '../types'

const DocumentResultPreviewCell = ({
  row,
  appointmentId,
  openPdfModal,
  setModalOpen,
}: {
  row: Row<LabOrder>
  appointmentId: string
  openPdfModal: (url: string, type: string) => void
  setModalOpen: React.Dispatch<
    React.SetStateAction<{ type: string; data: any }>
  >
}) => {
  const { resultsPdf, requisitionPdf } = LabOrderPdf

  const resultPdfDetails = row?.original?.labDocuments?.find(
    (item: LabDocument) => item?.documentType === resultsPdf,
  )
  const requisitionPdfDetails = row?.original?.labDocuments?.find(
    (item: LabDocument) => item?.documentType === requisitionPdf,
  )
  const [documentBase64, setDocumentBase64] = useState('')
  useEffect(() => {
    async function fetchDocument() {
      if (resultPdfDetails?.documentName && resultPdfDetails?.orderId) {
        const documentBase64 = await getDocumnetAgainstLaborder(
          appointmentId,
          resultPdfDetails.orderId,
          resultPdfDetails.documentName,
        )
        setDocumentBase64(documentBase64)
      } else if (
        requisitionPdfDetails?.documentName &&
        requisitionPdfDetails?.orderId
      ) {
        const documentBase64 = await getDocumnetAgainstLaborder(
          appointmentId,
          requisitionPdfDetails.orderId,
          requisitionPdfDetails.documentName,
        )
        setDocumentBase64(documentBase64)
      }
    }
    if (resultPdfDetails || requisitionPdfDetails) {
      fetchDocument()
    }
  }, [appointmentId, resultPdfDetails, requisitionPdfDetails])

  if (!openPdfModal || !row) {
    return null
  }
  const handlerClick = () => {
    setModalOpen({
      type: MenuItemType.ResultPreview,
      data: row.original,
    })
  }
  return (
    <Box>
      {resultPdfDetails && (
        <Link2Icon
          onClick={() => openPdfModal(documentBase64 || '', 'ResultsPdf')}
        />
      )}
      {requisitionPdfDetails && (
        <ClipboardIcon
          onClick={() => openPdfModal(documentBase64 || '', 'RequisitionPdf')}
        />
      )}
      <TokensIcon onClick={handlerClick} />
    </Box>
  )
}

export { DocumentResultPreviewCell }
