'use client'

import React, { useRef, useState } from 'react'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { ExcelIcon } from '@/components/icons/excel-icon'
import { jobTaskRunAction } from './actions'
import { uploadMasterFeeScheduleExcelAction } from './actions/upload-master-fee-excel'
import { ExcelMimeTypes } from './constants'
import UploadExcelErrorDialog from './dialogs/upload-excel-error-dialog/upload-excel-error-dialog'
import {
  ParsedResponse,
  parseMasterFeeScheduleLogs,
} from './dialogs/upload-excel-error-dialog/utils'
import { useStore } from './store'

const allowedTypes = [ExcelMimeTypes.XLSX, ExcelMimeTypes.XLS]
const UploadExcelButton = () => {
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState({
    isOpen: false,
    fileResponse: {} as ParsedResponse,
  })
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [loading, setLoading] = useState(false)
  const search = useStore((state) => state.search)
  const onClick = () => inputRef.current?.click()

  const pollJobUntilComplete = async (taskRunId: string) => {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const jobResponse = await jobTaskRunAction(taskRunId)

      if (jobResponse.state === 'error') {
        throw new Error(jobResponse.error ?? 'Job execution failed')
      }

      const jobData = jobResponse.data
      if (
        jobData.taskRunOutput.some((log) =>
          log.includes('[Import] Completed master fee schedule import.'),
        )
      ) {
        return jobData
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (!allowedTypes.includes(file.type as ExcelMimeTypes)) {
      toast.error('Please upload a valid Excel file')
      return
    }
    setLoading(true)

    const formData = new FormData()
    formData.append('file', file)

    const response = await uploadMasterFeeScheduleExcelAction(
      formData,
      'Xlsx',
      file.name,
    )

    if (response.state === 'error') {
      setLoading(false)
      return toast.error(response.error ?? 'File upload failed')
    }

    const { taskRunId } = response.data

    const jobData = await pollJobUntilComplete(taskRunId)
    const { taskRunOutput, successCount, failedCount, totalCount } = jobData

    if (!taskRunOutput || taskRunOutput.length === 0) {
      setLoading(false)
      return toast.error('No logs found for the task run')
    }

    const fileResponse = parseMasterFeeScheduleLogs(
      Object.values(taskRunOutput),
      {
        successCount,
        failedCount,
        totalCount,
      },
    )

    setIsErrorDialogOpen({
      fileResponse,
      isOpen: true,
    })
    setLoading(false)
  }

  const closeErrorDialog = () => {
    setIsErrorDialogOpen((prev) => ({
      ...prev,
      isOpen: false,
      fileResponse: {} as ParsedResponse,
    }))
    search({}, 1, true)
  }

  return (
    <>
      {isErrorDialogOpen.isOpen && (
        <UploadExcelErrorDialog
          closeErrorDialog={closeErrorDialog}
          fileResponse={isErrorDialogOpen.fileResponse}
        />
      )}
      <input
        ref={inputRef}
        type="file"
        accept=".xlsx,.xls"
        onClick={(e) => (e.currentTarget.value = '')}
        className="hidden"
        onChange={handleFileChange}
      />
      <Button
        loading={loading}
        size="1"
        className="bg-white text-black shadow-2"
        onClick={onClick}
      >
        <ExcelIcon /> Upload Excel File
      </Button>
    </>
  )
}

export { UploadExcelButton }
