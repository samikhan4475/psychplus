import React, { useState } from 'react'
import { Button } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { DOWNLOAD_HCFA_FILE_ENDPOINT } from '@/api/endpoints'
import { useStore as useRootStore } from '../store'
import { getRandomId, previewFile } from '../utils'
import { useStore } from './store'

const ViewHcfaButton = () => {
  const [loading, setLoading] = useState(false)
  const [selectedRows, filteredInsurancePolicyPriority] = useStore((state) => [
    state.selectedRows,
    state.filteredInsurancePolicyPriority,
  ])

  const { setSelectedPdfFileUrl, setActiveTab, selectedPdfFileUrl } =
    useRootStore((state) => ({
      setActiveTab: state.setActiveTab,
      setSelectedPdfFileUrl: state.setSelectedPdfFileUrl,
      selectedPdfFileUrl: state.selectedPdfFileUrl,
    }))

  const previewHcfaFile = async () => {
    if (selectedRows.length === 0) {
      toast.error('Please select claim to view HCFA file')
      return
    }
    setLoading(true)
    try {
      const payload = {
        claimIds: selectedRows,
        insurancePolicyPriority: filteredInsurancePolicyPriority,
        claimType: 'Professional',
      }
      const url = await previewFile(
        DOWNLOAD_HCFA_FILE_ENDPOINT,
        `hcfa_file`,
        'POST',
        payload,
        true,
      )
      if (url) {
        const tabId = getRandomId()
        const selectedObject = selectedPdfFileUrl
        selectedObject[tabId] = url
        setSelectedPdfFileUrl(selectedObject)
        setActiveTab('File ' + tabId)
      }
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
