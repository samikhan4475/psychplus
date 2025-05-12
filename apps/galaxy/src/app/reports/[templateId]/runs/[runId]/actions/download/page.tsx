'use client'

import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { GET_TEMPLATE_EMAIL_REPORT } from '@/api/endpoints'
import { downloadFile } from '@/utils/download'

const DownloadPage = () => {
  const params = useParams()
  const templateId = params.templateId as string
  const runId = params.runId as string

  useEffect(() => {
    const downloadReport = async () => {
      try {
        const endpoint = GET_TEMPLATE_EMAIL_REPORT(templateId, runId)
        await downloadFile(endpoint, 'Report.pdf', 'POST', {})
      } catch (error) {
        toast.error('Failed to download report')
      } finally {
        window.close()
      }
    }

    if (templateId && runId) {
      downloadReport()
    }
  }, [templateId, runId])

  return null
}

export default DownloadPage
