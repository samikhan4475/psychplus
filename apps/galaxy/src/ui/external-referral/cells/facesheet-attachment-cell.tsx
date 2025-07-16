'use client'

import { useState } from 'react'
import { Flex, IconButton } from '@radix-ui/themes'
import { PropsWithRow } from '@/components'
import { EyeIcon } from '@/components/icons'
import { Patient } from '../types'
import { handleExternalReferralAttachmentExport } from '../utils'

const FacesheetAttachmentCell = ({
  row: { original: patient },
}: PropsWithRow<Patient>) => {
  const [loading, setLoading] = useState(false)
  const attachments = patient?.attachments || []

  const facesheet = attachments.find((att) => att.documentType === 'Facesheet')

  const handleExport = async (
    externalReferralId: number,
    attachmentId: string,
  ) => {
    setLoading(true)

    await handleExternalReferralAttachmentExport(
      externalReferralId,
      attachmentId,
    )

    setLoading(false)
  }

  return (
    <Flex justify="center" align="center" width="100%">
      {facesheet && (
        <IconButton
          variant="ghost"
          disabled={loading}
          onClick={() => handleExport(patient.id, facesheet.id)}
        >
          <EyeIcon width={15} height={15} />
        </IconButton>
      )}
    </Flex>
  )
}

export { FacesheetAttachmentCell }
