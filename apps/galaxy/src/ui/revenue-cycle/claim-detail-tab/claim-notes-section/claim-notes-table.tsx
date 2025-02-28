import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { DataTable, LoadingPlaceholder } from '@/components'
import { useStore } from '../store'
import { ClaimNotesAuditDialog } from './claim-note-history'
import { ClaimNotesAlertDialog } from './claim-notes-alert'
import { columns as getColumns } from './claim-notes-table/table-column'

const ClaimNotesTable = ({ claimId }: { claimId: string }) => {
  const {
    loading,
    openAlertModal,
    search,
    data,
    claimNotesId,
    openClaimNotesAudit,
    setOpenClaimNotesAudit,
  } = useStore((state) => ({
    data: state.data,
    loading: state.loading,
    search: state.search,
    setOpenClaimNotesAudit: state.setOpenClaimNotesAudit,
    openAlertModal: state.openAlertModal,
    openClaimNotesAudit: state.openClaimNotesAudit,
    claimNotesId: state.claimNotesId,
  }))
  useEffect(() => {
    fetchData()
  }, [claimId])

  const fetchData = async () => {
    if (!claimId) {
      openAlertModal(false)
      return
    }

    const requestedPayload = {
      claimId: claimId,
      recordStatuses: ['Active'],
      isAlert: [true, false],
    }

    search(requestedPayload)
  }

  if (loading) {
    return (
      <Flex height="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <>
      <ClaimNotesAuditDialog
        claimNoteId={claimNotesId}
        open={openClaimNotesAudit}
        onOpenChange={setOpenClaimNotesAudit}
      />
      <ClaimNotesAlertDialog
        data={data.filter((item) => item.isAlert) ?? []}
        claimId={claimId}
      />
      <DataTable columns={getColumns(claimId)} data={data} />
    </>
  )
}

export { ClaimNotesTable }
