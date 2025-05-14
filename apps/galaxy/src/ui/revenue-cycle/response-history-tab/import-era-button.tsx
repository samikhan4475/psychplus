import React, { useRef, useState } from 'react'
import { Button, Text } from '@radix-ui/themes'
import { ArrowUpFromLine } from 'lucide-react'
import toast from 'react-hot-toast'
import { formatDateToISOString, sanitizeFormData } from '@/utils'
import { importEraAction } from '../actions/import-era-action'
import { ResponseHistoryPayload } from '../types'
import { eraExtensions } from './constants'
import { useStore } from './store'

const ImportEraButton = () => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isUploading, setIsUploading] = useState(false)
  const { search, payload } = useStore((state) => ({
    search: state.search,
    payload: state.payload,
  }))

  const uploadFiles = async (files: FileList) => {
    const formData = new FormData()
    Array.from(files).forEach((file) => formData.append('files', file))

    const response = await importEraAction(formData)
    if (response.state === 'success') {
      toast.success('Files imported successfully')
      const sanitizedData = sanitizeFormData({
        ...payload,
        createdOn: payload?.createdOn
          ? formatDateToISOString(payload?.createdOn)
          : undefined,
      }) as ResponseHistoryPayload
      search(sanitizedData, 1, true)
    } else if (response.state === 'error') {
      toast.error(response.error ?? 'Files import failed')
    }
  }

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files
    if (files && files.length > 0) {
      const invalidFiles = Array.from(files).filter(
        (file) =>
          !eraExtensions.some((ext) => file.name.toLowerCase().endsWith(ext)),
      )
      if (invalidFiles.length > 0) {
        return toast.error(
          `Only files with the following extensions are allowed: ${eraExtensions.join(
            ', ',
          )}`,
        )
      }

      setIsUploading(true)
      await uploadFiles(files)
      setIsUploading(false)
    }
  }

  return (
    <>
      <input
        type="file"
        multiple
        ref={fileInputRef}
        className="hidden"
        accept={eraExtensions.join(', ')}
        onClick={(e) => (e.currentTarget.value = '')}
        onChange={handleFileChange}
        disabled={isUploading}
      />
      <Button
        disabled={isUploading}
        size="1"
        className="min-w-fit space-x-1 px-2 "
        type="button"
        variant="outline"
        color="gray"
        onClick={() => fileInputRef.current?.click()}
      >
        <ArrowUpFromLine size={14} />
        <Text size="1" weight="bold">
          Import ERA Files
        </Text>
      </Button>
    </>
  )
}

export { ImportEraButton }
