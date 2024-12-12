'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as zustandUseStore } from 'zustand'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetOptions } from '@/hooks'
import { PatientReferral } from '@/types'
import { updatePatientReferralAction } from '../../actions'
import { DISABLE_CODESET_ATTRIBUTE } from '../constants'
import { StatusSelect } from '../status-select'
import { useStore } from '../store'
import { isContactStatusError } from '../utils'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}
const ContactMadeSelectCell = ({
  row: { original: referral },
  disabled,
}: Props) => {
  const store = useStore()
  const { data, setData } = zustandUseStore(store, (state) => ({
    setData: state.setData,
    data: state.data,
  }))
  const [selectedValue, setSelectedValue] = useState(referral?.contactStatus)
  const options = useCodesetOptions(
    CODESETS.ContactMadeStatus,
    DISABLE_CODESET_ATTRIBUTE,
  )

  const updateContactMadeStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      contactStatus: value,
    })
    if (result.state === 'success') {
      toast.success('Successfully updated!')
      if (!data) return
      const updatedData = data?.referrals.map((item) => {
        if (referral.id === item.id) {
          return {
            ...item,
            contactStatus: value,
          }
        }
        return item
      })
      setData(updatedData)
    } else if (result.state === 'error') {
      setSelectedValue(referral?.contactStatus ?? '')
      toast.error(result.error ?? 'Failed to update!')
    }
  }

  return (
    <StatusSelect
      options={options}
      value={
        isContactStatusError(referral.contactStatus)
          ? referral.contactStatus
          : selectedValue
      }
      onValueChange={updateContactMadeStatus}
      disabled={disabled || isContactStatusError(referral.contactStatus)}
    />
  )
}

export { ContactMadeSelectCell }
