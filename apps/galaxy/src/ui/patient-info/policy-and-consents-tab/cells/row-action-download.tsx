'use client'

import { ArrowDownToLine } from 'lucide-react'
import toast from 'react-hot-toast'
import { GET_PATIENT_CONSENT_SIGNED_PDF_ENDPOINT } from '@/api/endpoints'
import { downloadFile } from '@/utils/download'
import { RowActionProps } from '../types'
import { ActionItem } from './action-item'

const RowActionDownload = ({
  row: {
    original: { patientId, id },
  },
  toggleRowClick,
  id: actionId,
  disabled,
}: RowActionProps) => {
  const handlDownload = async () => {
    toggleRowClick?.()
    try {
      const endpoint = GET_PATIENT_CONSENT_SIGNED_PDF_ENDPOINT(patientId, id)
      const fileName = `consents_${id}`

      await downloadFile(endpoint, fileName)

      toast.success('Downloaded successfully')
    } catch (error) {
      const message =
        (error instanceof Error && error.message) || 'Failed to download.'
      toast.error(message)
    } finally {
      toggleRowClick?.()
    }
  }
  return (
    <ActionItem
      Icon={ArrowDownToLine}
      title={actionId}
      disabled={disabled}
      onClick={handlDownload}
    />
  )
}

export { RowActionDownload }
