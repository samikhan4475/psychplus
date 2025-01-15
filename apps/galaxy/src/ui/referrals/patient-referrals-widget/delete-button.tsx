import React, { useState } from 'react'
import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { DeleteConfirmDialog } from '@/components'
import { PatientReferral, ReferralStatuses } from '@/types'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { sendEvent } from '@/utils'
import { updatePatientReferralAction } from '../actions'
import { useStore } from './store'
import { isReferralDeleted } from './utils'

interface DeleteReferralButtonProps {
  referral: PatientReferral
}
const DeleteReferralButton = ({ referral }: DeleteReferralButtonProps) => {
  const { isQuickNoteView } = useQuickNoteUpdate()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const toggleOpen = (open: boolean) => setIsOpen(open)

  const deleteReferral = async () => {
    setLoading(true)
    const result = await updatePatientReferralAction({
      ...referral,
      resourceStatus: ReferralStatuses.Deleted,
    })
    if (result.state === 'error') {
      setLoading(false)
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          resourceStatus: ReferralStatuses.Deleted,
        }
      }
      return item
    })
    setData(updatedData ?? [])
    toast.success('Successfully deleted!')

    if (isQuickNoteView) {
      sendEvent({
        widgetId: QuickNoteSectionName.QuicknoteSectionReferrals,
        eventType: 'widget:save',
      })
    }
    toggleOpen(false)
    setLoading(false)
  }

  return (
    <DeleteConfirmDialog
      isOpen={isOpen}
      toggleOpen={toggleOpen}
      onDelete={deleteReferral}
      loading={loading}
      title="referral"
    >
      <IconButton
        size="1"
        color="gray"
        variant="ghost"
        className="text-black !m-0"
        type="button"
        disabled={isReferralDeleted(referral?.resourceStatus)}
      >
        <Trash2 size={14} />
      </IconButton>
    </DeleteConfirmDialog>
  )
}

export { DeleteReferralButton }
