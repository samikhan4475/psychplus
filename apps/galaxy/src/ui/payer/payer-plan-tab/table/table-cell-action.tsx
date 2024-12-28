import { useState } from 'react'
import { Pencil1Icon } from '@radix-ui/react-icons'
import { Flex, IconButton } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { DeleteConfirmDialog } from '@/components'
import { DeleteIcon } from '@/components/icons'
import { PayerPlanResponse } from '@/types'
import { deletePayerPlanRecord } from '../../actions'
import { useStore } from '../../store'
import { useStore as useSearchStore } from '../store'

interface ActionsCellProps {
  row: Row<PayerPlanResponse>
}

const ActionsCell = ({ row }: ActionsCellProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { setActiveTab, setSelectedPayerPlan } = useStore((state) => ({
    setActiveTab: state.setActiveTab,
    setSelectedPayerPlan: state.setSelectedPayerPlan,
  }))
  const { search, payload, page } = useSearchStore((state) => ({
    search: state.search,
    payload: state.payload,
    page: state.page,
  }))
  const handlePayerPlanEdit = () => {
    setActiveTab('Plan# ' + row.original.name)
    setSelectedPayerPlan(row.original.id)
  }

  const deleteRecord = async () => {
    if (row.original.payerId) {
      setLoading(true)
      const result = await deletePayerPlanRecord(
        row.original.payerId,
        row.original.id,
      )
      if (result.state === 'error') {
        toast.error(result.error ?? 'Failed to delete the record')
      } else if (result.state === 'success') {
        toast.success('The record has been deleted successfully')
        search(payload, page)
      }
      setLoading(false)
    }
  }

  const toggleOpen = (open: boolean) => {
    setOpen(open)
  }

  return (
    <Flex gap="1" align="center" justify="start" className="flex-1">
      <IconButton variant="ghost" onClick={handlePayerPlanEdit}>
        <Pencil1Icon width={16} height={16} className="text-pp-gray-1" />
      </IconButton>
      <DeleteConfirmDialog
        isOpen={open}
        toggleOpen={toggleOpen}
        onDelete={deleteRecord}
        loading={loading}
        title="payer record"
      >
        <IconButton variant="ghost" className="text-pp-gray-1">
          <DeleteIcon height={18} />
        </IconButton>
      </DeleteConfirmDialog>
    </Flex>
  )
}

export { ActionsCell }
