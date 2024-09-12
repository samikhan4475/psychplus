import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { Button } from '@psychplus/ui/button'
import { Dialog } from '@psychplus/ui/dialog'
import { getClaimSubmissionRejectionDetail } from '../../api.client'
import { useStore } from '../../store'
import { ErrorMessage } from '../../types'
import { ClaimSubmissionPopupBody } from '../claim-submission-popup-dialog/claim-submission-popup-body'

const ClaimSubmissionRejectionDetailPopupDialog = () => {
  const selectedClaim = useStore((state) => state.selectedClaim)
  const [loading, setLoading] = useState(true)
  const [errorsData, setErrorsData] = useState<{
    [claimId: string]: ErrorMessage[]
  }>({})

  const claimSubmissionRejectionDetailModal = useStore(
    (state) => state.claimSubmissionRejectionDetailModal,
  )
  const { setClaimSubmissionRejectionDetailModal } = useStore((state) => ({
    setClaimSubmissionRejectionDetailModal:
      state.setClaimSubmissionRejectionDetailModal,
  }))

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        if (selectedClaim) {
          const response = await getClaimSubmissionRejectionDetail(
            selectedClaim,
          )
          setErrorsData({
            [selectedClaim]: response,
          })
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    })()
  }, [selectedClaim])

  return (
    <Dialog.Root
      open={claimSubmissionRejectionDetailModal}
      onOpenChange={setClaimSubmissionRejectionDetailModal}
    >
      <Dialog.Content className="max-w-[600px] rounded-[0px]">
        <Dialog.Title>
          Claim Submission Detail
          <Button
            className="float-right cursor-pointer bg-transparent text-[#000]"
            onClick={() => setClaimSubmissionRejectionDetailModal(false)}
          >
            X
          </Button>
        </Dialog.Title>
        {!loading ? (
          <ClaimSubmissionPopupBody
            errorClaims={errorsData ?? {}}
            successClaims={[]}
          />
        ) : (
          'Please wait...'
        )}
        {!loading && Object.keys(errorsData).length === 0 && (
          <Box className="text-center">No data</Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}

export { ClaimSubmissionRejectionDetailPopupDialog }
