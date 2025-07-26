'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { useHasPermission } from '@/hooks'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '@/ui/referrals/actions'
import { StatusSelect } from '@/ui/referrals/patient-referrals-widget/status-select'
import { PermissionAlert } from '@/ui/schedule/shared'
import { EDIT_LOCATION_STATUS } from '../constants'
import { useStore } from '../store'

const OrderDetailLocationCell = ({
  row: { original: referral },
}: PropsWithRow<PatientReferral>) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const hasPermission = useHasPermission('changeLocationIntReferralTab')
  const store = useStore()
  const { data, setData, locationsList } = zustandUseStore(store, (state) => ({
    locationsList: state.locationsList,
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(
    referral?.referralProviderLocationId,
  )

  const updateReferralStatus = async (value: string) => {
    if (!hasPermission) {
      setIsOpen(true)
      return
    }
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      referralProviderLocationId: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.referralProviderLocationId)
      return toast.error(result.error ?? 'Failed to update!')
    }
    const updatedData = data?.referrals.map((item) => {
      if (referral.id === item.id) {
        return {
          ...item,
          referralProviderLocationId: value,
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
        message={EDIT_LOCATION_STATUS}
      />
      <StatusSelect
        value={selectedValue}
        onValueChange={updateReferralStatus}
        options={locationsList}
      />
    </>
  )
}

export { OrderDetailLocationCell }
