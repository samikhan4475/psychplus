'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions, useHasPermission } from '@/hooks'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { isReferralDeleted } from '@/ui/referrals/patient-referrals-widget/utils'
import { PermissionAlert } from '@/ui/schedule/shared'
import { EDIT_REFERRAL_STATUS } from '../constants'
import { useStore } from '../store'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}
const ReferralStatusCell = ({
  row: { original: referral },
  disabled,
}: Props) => {
  const store = useStore()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const hasPermission = useHasPermission('changeReferralStatusIntReferralTab')
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    referral?.resourceStatus ?? '',
  )
  const options = useCodesetOptions(CODESETS.ResourceStatus)

  const updateReferralStatus = async (value: string) => {
    if (!hasPermission) {
      setIsOpen(true)
      return
    }
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      resourceStatus: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.resourceStatus ?? '')
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          resourceStatus: value,
        }
      }
      return item
    })
    setData(updatedData ?? [])
    toast.success('Successfully updated!')
  }

  return (
    <>
      <PermissionAlert
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        message={EDIT_REFERRAL_STATUS}
      />
      <StatusSelect
        value={
          isReferralDeleted(referral?.resourceStatus)
            ? referral.resourceStatus
            : selectedValue
        }
        onValueChange={updateReferralStatus}
        options={options}
        disabled={disabled || isReferralDeleted(referral?.resourceStatus)}
      />
    </>
  )
}

export { ReferralStatusCell }
