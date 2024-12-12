'use client'

import { IconButton } from '@radix-ui/themes'
import { Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { ContactMadeStatuses, PatientReferral } from '@/types'
import { updatePatientReferralAction } from '../actions'
import { useStore } from './store'
import { isContactStatusError } from './utils'

interface DeleteButtonProps {
  referral: PatientReferral
}
const DeleteButton = ({ referral }: DeleteButtonProps) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))

  const deleteReferral = async () => {
    const result = await updatePatientReferralAction({
      ...referral,
      contactStatus: ContactMadeStatuses.Error,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
      if (!data) return
      const updatedData = data?.referrals.map((item) => {
        if (referral.id === item.id) {
          return {
            ...item,
            contactStatus: ContactMadeStatuses.Error,
          }
        }
        return item
      })
      setData(updatedData)
    } else if (result.state === 'error') {
      toast.error(result.error ?? 'Failed to update!')
    }
  }

  return (
    <IconButton
      size="1"
      color="gray"
      variant="ghost"
      className="text-black !m-0"
      type="button"
      disabled={isContactStatusError(referral.contactStatus)}
      onClick={deleteReferral}
    >
      <Trash2 size={14} />
    </IconButton>
  )
}

export { DeleteButton }
