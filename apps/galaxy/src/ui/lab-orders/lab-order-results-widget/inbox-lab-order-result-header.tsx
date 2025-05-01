import { Button, Flex, Text } from '@radix-ui/themes'
import { RefreshCcw } from 'lucide-react'
import { TabContentHeading } from '@/components'
import { useStore } from './store'
import { SignIcon } from '@/components/icons'
import { addSingedOrderApi } from './api'
import { useStore as useGlobalStore } from '@/store'
import toast from 'react-hot-toast'
import { ConfirmationDialog } from './blocks/review-confirmation-dialog'
import { useCallback } from 'react'
import { OrderStatus, SignedOrderPayload } from './types'

const InboxLabOrderResultHeader = () => {
  const { staffId } = useGlobalStore((state) => state.user)
  const {
    fetchLabOrderResults,
    loading,
    selectedRows,
    isReviewDialogOpen,
    closeReviewDialog,
    openReviewDialog,
    payload,
    data
  } = useStore((state) => ({
    fetchLabOrderResults: state.fetchLabOrderResults,
    loading: state.loading,
    selectedRows: state.selectedRows,
    isReviewDialogOpen: state.isReviewDialogOpen,
    closeReviewDialog: state.closeReviewDialog,
    openReviewDialog: state.openReviewDialog,
    payload: state.payload,
    data: state.data,
  }))

  const fetchLabOrders = useCallback(() => {
    if (!payload) return 

  fetchLabOrderResults(payload)
  }, [fetchLabOrderResults, JSON.stringify(payload)])

  const handleReviewSelected = () => {
    if (selectedRows.length === 0) return
    openReviewDialog()
  }

  const onClickSend = async () => {
    if (selectedRows.length === 0) {
      toast.error("No orders selected!")
      return
    }
    const orderIds = selectedRows.map((row) => row.id as number | string)
    const payload : SignedOrderPayload = {
      orderIds,
      resultSignedByStaffId: staffId,
      isResultSigned:true
    }
      const result = await addSingedOrderApi(payload)
      if (result.state === "success") {
        fetchLabOrders()
        toast.success("Signed Successfully!")
        closeReviewDialog()
      } else {
        toast.error(result?.error ?? "Error while signing orders")
      }
  }

  return (
    <TabContentHeading title={`Lab Results (${data?.total ?? 0})`}>
      <Flex align="center" justify="end" gap="2" className="flex-1">
        <Button
          className="border-pp-grey bg-white h-6 flex-row gap-1 rounded-2 border border-solid align-middle"
          type="button"
          disabled={loading}
          onClick={fetchLabOrders} 
        >
          <RefreshCcw className="text-pp-gray-3" width="16px" height="16px" />
          <Text className="text-pp-black-3 text-1">Refresh</Text>
        </Button>
        <Button
          className="h-6 bg-[#151B4A] text-[12px] text-[#FFF]"
          disabled={selectedRows.length === 0}
          onClick={handleReviewSelected}
        >
          <SignIcon />
          Review All Selected
        </Button>
        <ConfirmationDialog open={isReviewDialogOpen} onClick={onClickSend} onClose={closeReviewDialog} />
      </Flex>
    </TabContentHeading>
  )
}

export { InboxLabOrderResultHeader }
