import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DOWNLOAD_HCFA_FILE_ENDPOINT } from '@/api/endpoints'
import { previewFile } from '../utils'
import { useStore } from './store'

const ViewHcfaButton = () => {
  const [loading, setLoading] = useState(false)
  const [selectedRows, filterInsurancePolicyPriority] = useStore((state) => [
    state.selectedRows,
    state.filterInsurancePolicyPriority,
  ])

  const previewHcfaFile = async () => {
    if (selectedRows.length === 0) {
      toast.error('Please select claim to view HCFA file')
      return
    }
    setLoading(true)
    try {
      const payload = {
        claimIds: selectedRows,
        insurancePolicyPriority: filterInsurancePolicyPriority,
        claimType: 'Professional',
      }
      await previewFile(
        DOWNLOAD_HCFA_FILE_ENDPOINT,
        `hcfa_file`,
        'POST',
        payload,
      )
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
      color="gray"
      className="text-black"
      size="1"
      variant="outline"
      type="button"
      onClick={previewHcfaFile}
      loading={loading}
    >
      View HCFA
    </Button>
  )
}
export { ViewHcfaButton }
