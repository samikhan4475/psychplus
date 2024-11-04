'use client'

import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import { PrinterIcon } from 'lucide-react'
import toast from 'react-hot-toast'
import { DOWNLOAD_PATIENT_PAYMENTS_PDF_ENDPOINT } from '@/api/endpoints'
import { downloadFile } from '@/utils/download'
import { useStore } from './store'

interface PrintButtonProps {
  patientId: string
}
const PrintButton = ({ patientId }: PrintButtonProps) => {
  const { selectedRows } = useStore((state) => ({
    selectedRows: state.selectedRows,
  }))
  const [loading, setLoading] = useState(false)

  const handleDownload = async () => {
    if (!selectedRows.length) {
      toast.error('Please select payment to click this button')
      return
    }
    setLoading(true)
    try {
      const endpoint = DOWNLOAD_PATIENT_PAYMENTS_PDF_ENDPOINT(patientId)
      const params = new URLSearchParams()
      selectedRows.forEach((id) => params.append('paymentIds', id.toString()))
      const fullUrl = `${endpoint}?${params.toString()}`
      await downloadFile(fullUrl, `payments_${patientId}`, 'POST', {})

      toast.success('Downloaded successfully')
    } catch (error) {
      const message =
        (error instanceof Error && error.message) || 'Failed to download.'
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      color="gray"
      onClick={handleDownload}
      disabled={loading || !selectedRows.length}
      size="1"
      className="text-black/80 disabled:text-gray-8"
    >
      <PrinterIcon size={14} />
      Print
    </Button>
  )
}

export { PrintButton }
