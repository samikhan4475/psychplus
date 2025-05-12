import React, { PropsWithChildren, useState } from 'react'
import { Dialog } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { CloseDialogTrigger } from '@/components/close-dialog-trigger'
import { ReportIcon } from '@/components/icons'
import { Claim } from '@/types'
import { InsurancePolicyPriority } from '@/ui/patient-info/insurance-tab/constants'
import { sanitizeFormData } from '@/utils'
import { claimSubmissionAction } from '../../actions/claim-submission'
import { claimSubmissionRejectionAction } from '../../actions/claim-submission-rejection'
import { TabValue } from '../../submission-tab'
import { transformIn } from '../../submission-tab/data'
import { useStore } from '../../submission-tab/store'
import { ClaimResponseType } from '../../types'
import { ClaimSubmissionResponseView } from './claim-submission-response'

interface ClaimSubmissionDialogProps {
  claimId?: string
  clearingHouse?: string
  claims?: Claim[]
  isScrubOnly?: boolean
}
const ClaimSubmissionDialog = ({
  children,
  claimId,
  clearingHouse,
  claims,
  isScrubOnly,
}: PropsWithChildren<ClaimSubmissionDialogProps>) => {
  const [
    selectedTab,
    selectedRows,
    filteredInsurancePolicyPriority,
    search,
    setSelectedRows,
  ] = useStore((state) => [
    state.selectedTab,
    state.selectedRows,
    state.filteredInsurancePolicyPriority,
    state.search,
    state.setSelectedRows,
  ])
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [claimErrorResponses, setClaimErrorResponses] = useState<
    ClaimResponseType[]
  >([])
  const [claimCleanResponses, setClaimCleanResponses] = useState<
    ClaimResponseType[]
  >([])

  const fetchClaimResponses = async () => {
    const payload = {
      submissionType: selectedTab,
      isPaperSubmission: selectedTab === TabValue.PaperSubmission,
      claimType: 'Professional',
      claimIds: selectedRows,
      isScrubOnly: isScrubOnly ?? false,
      insurancePolicyPriority:
        filteredInsurancePolicyPriority ?? InsurancePolicyPriority.Primary,
      clearingHouseReceiverId: clearingHouse ?? '',
    }
    const sanitizedPayload = sanitizeFormData(payload)
    setIsLoading(true)

    const result = await claimSubmissionAction(sanitizedPayload)

    if (result.state === 'success') {
      const { claimErrorResponses, claimCleanResponses } = transformIn(
        {
          cleanClaimIds: result.data.cleanClaimIds,
          claimsWithErrorMessages: result.data.claimsWithErrorMessages,
        },
        claims,
      )

      setClaimErrorResponses(claimErrorResponses)
      setClaimCleanResponses(claimCleanResponses)
      setIsLoading(false)
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
  }
  const fetchSingleClaimResponse = async (claimId: string) => {
    setIsLoading(true)
    const result = await claimSubmissionRejectionAction(claimId)
    if (result.state === 'success') {
      setIsLoading(false)
      if (result.data.length === 0) {
        return toast.success('No Rejections Found')
      }

      const errorResponse = {
        [result.data[0]?.claimId]: result.data.map((error) => ({
          id: error.id,
          claimId: error.claimId,
          errorMessage: error.errorMessage,
        })),
      }
      const { claimErrorResponses, claimCleanResponses } = transformIn(
        { cleanClaimIds: [], claimsWithErrorMessages: errorResponse },
        claims,
      )
      setClaimErrorResponses(claimErrorResponses)
      setClaimCleanResponses(claimCleanResponses)
    } else if (result.state === 'error') {
      toast.error(result.error)
    }
  }

  let submissionStatus = 'Claim sent for submission'
  if (claimCleanResponses.length > 0 && claimErrorResponses.length > 0) {
    submissionStatus = 'Some Claims Not Submitted'
  } else if (claimErrorResponses.length > 0) {
    submissionStatus = 'Claims Not Submitted'
  }

  const handleOpenDialog = (modalState: boolean) => {
    if (!modalState) {
      search({}, 1, true)
      setSelectedRows([])
      setIsOpenDialog(modalState)
      return
    }
    if (claimId) {
      setIsOpenDialog(modalState)
      fetchSingleClaimResponse(claimId)
    } else if (selectedRows.length > 0) {
      setIsOpenDialog(modalState)
      fetchClaimResponses()
    } else {
      toast.error('No Rows selected for submission')
    }
  }
  const DIALOG_TITLE = isLoading ? 'Loading...' : submissionStatus

  return (
    <Dialog.Root open={isOpenDialog} onOpenChange={handleOpenDialog}>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content className="relative max-w-[800px]">
        <CloseDialogTrigger onClick={() => handleOpenDialog(false)} />
        <Dialog.Title className="flex items-end gap-1 font-sans -tracking-[0.25px]">
          <ReportIcon /> {DIALOG_TITLE}
        </Dialog.Title>
        <ClaimSubmissionResponseView
          loading={isLoading}
          claimCleanResponses={claimCleanResponses}
          claimErrorResponses={claimErrorResponses}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimSubmissionDialog }
