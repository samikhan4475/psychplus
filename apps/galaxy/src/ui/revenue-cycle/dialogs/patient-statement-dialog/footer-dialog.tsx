import { useState } from 'react'
import { Box, Button, Dialog } from '@radix-ui/themes'
import { toast } from 'react-hot-toast'
import { DOWNLOAD_PATIENT_STATEMENTS_ENDPOINT } from '@/api/endpoints'
import { generatePatientStatementAction } from '../../actions'
import { useStore as useRootStore } from '../../store'
import {
  FileFormats,
  patientStatementRecordStatuses,
  patientStatementSlaimStatusCodes,
} from '../../types'
import { getRandomId, previewFile } from '../../utils'
import { useStore } from './store'

const FooterDialog = ({ patientId }: { patientId: number }) => {
  const { setSelectedPdfFileUrl, setActiveTab, selectedPdfFileUrl } =
    useRootStore((state) => ({
      setActiveTab: state.setActiveTab,
      setSelectedPdfFileUrl: state.setSelectedPdfFileUrl,
      selectedPdfFileUrl: state.selectedPdfFileUrl,
    }))
  const [previewLoading, setPreviewLoading] = useState(false)
  const [loading, setLoading] = useState(false)
  const { selectedStatements, setSelectedStatements } = useStore((state) => ({
    selectedStatements: state.selectedStatements,
    setSelectedStatements: state.setSelectedStatements,
  }))

  const onSubmit = async () => {
    if (selectedStatements.length === 0) {
      return toast.error('Please select at least one statement')
    }
    setLoading(true)
    const response = await generatePatientStatementAction({
      patientIds: [patientId],
      claimIds: selectedStatements,
    })

    if (response.state === 'error') {
      setLoading(false)
      return toast.error(response.error)
    }

    toast.success('Statement generated successfully')
    setLoading(false)
  }

  const onPreview = async () => {
    if (selectedStatements.length === 0) {
      return toast.error('Please select at least one statement')
    }
    setPreviewLoading(true)
    try {
      const endpoint = DOWNLOAD_PATIENT_STATEMENTS_ENDPOINT(FileFormats.PDF)
      const params = new URLSearchParams()
      const fullUrl = `${endpoint}?${params.toString()}`

      const payload = {
        patientIds: [patientId],
        claimStatusCodes: [
          patientStatementSlaimStatusCodes.BILLED_TO_PATIENT,
          patientStatementSlaimStatusCodes.PATIENT_RESPONSIBILITY,
        ],
        recordStatuses: [patientStatementRecordStatuses.ACTIVE],
        includeServiceLinePayment: true,
        isGroupedByPatient: true,
        claimIds: selectedStatements,
      }

      const url = await previewFile(
        fullUrl,
        `patient_statement_${patientId}`,
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
      setSelectedStatements([])
      setPreviewLoading(false)
    }
  }

  return (
    <Box className="mt-4 flex justify-end">
      <Dialog.Close>
        <Button
          variant="outline"
          highContrast
          className="bg-white mr-2"
          size="2"
        >
          Cancel
        </Button>
      </Dialog.Close>
      <Button
        variant="outline"
        highContrast
        className="bg-white mr-2"
        size="2"
        onClick={onPreview}
        disabled={previewLoading}
      >
        View Statement
      </Button>
      <Button
        className="bg-pp-black-1"
        size="2"
        onClick={onSubmit}
        disabled={loading}
      >
        Submit
      </Button>
    </Box>
  )
}

export { FooterDialog }
