'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, Flex } from '@radix-ui/themes'
import { FileText, Image as ImageIcon } from 'lucide-react'
import { GET_PATIENT_FACESHEET_IMAGE } from '@/api/endpoints'
import { PictureFallback } from '@/components/icons'
import { Facesheet } from '@/types'
import { downloadFile } from '@/utils/download'

interface ImageViewProps {
  visit: Facesheet
}

const ImageView = ({ visit }: ImageViewProps) => {
  const [open, setOpen] = useState(false)
  const [hasError, setHasError] = useState(false)

  const srcURL = visit.isHasFaceSheetDocument
    ? '/ehr' + GET_PATIENT_FACESHEET_IMAGE(visit.patientId, visit.id)
    : ''

  const downloadPdf = async () => {
    await downloadFile(
      GET_PATIENT_FACESHEET_IMAGE(visit.patientId, visit.id),
      'facesheet',
      'GET',
    )
  }

  const handleError = () => {
    setHasError(true)
  }

  if (visit.documentType === 'Pdf') {
    return <FileText className="h-4 w-4" onClick={downloadPdf} />
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger onClick={() => setOpen(true)}>
        <ImageIcon className="h-4 w-4" aria-label="Preview image icon" />
      </Dialog.Trigger>
      <Dialog.Content>
        <Flex direction="column" gap="3" align="center" p="3">
          {!hasError ? (
            <Image
              src={srcURL}
              alt="Preview"
              width={300}
              height={300}
              onError={handleError}
             
            />
          ) : (
            <PictureFallback width={150} height={150} />
          )}
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ImageView }
