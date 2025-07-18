'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'
import { PropsWithRow } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { PatientReferral } from '@/types'
import { AUTH_IO_PROCESS } from '@/ui/int-referrals/constants'
import { sortCodesetBySortAttribute } from '@/ui/patient-lookup/utils'
import { QuickNoteSectionName } from '@/ui/quicknotes/constants'
import { useQuickNoteUpdate } from '@/ui/quicknotes/hooks'
import { sendEvent } from '@/utils'
import { updatePatientReferralAction } from '../../actions'
import { StatusSelect } from '../status-select'
import { isContactMadeScheduledOrCancelled, isReferralDeleted } from '../utils'

interface Props extends PropsWithRow<PatientReferral> {
  disabled?: boolean
}
const ContactMadeSelectCell = ({
  row: { original: referral },
  disabled,
}: Props) => {
  const { isQuickNoteView } = useQuickNoteUpdate()
  const [selectedValue, setSelectedValue] = useState(referral?.contactStatus)
  const codes = useCodesetCodes(CODESETS.ContactMadeStatus)

  const updateContactMadeStatus = async (value: string) => {
    setSelectedValue(value)
    const result = await updatePatientReferralAction({
      ...referral,
      contactStatus: value,
    })
    if (result.state === 'error') {
      setSelectedValue(referral?.contactStatus ?? '')
      return toast.error(result.error ?? 'Failed to update!')
    }
    if (isQuickNoteView) {
      sendEvent({
        widgetId: QuickNoteSectionName.QuicknoteSectionReferrals,
        eventType: 'widget:save',
      })
    }
    toast.success('Successfully updated!')
  }

  return (
    <StatusSelect
      options={sortCodesetBySortAttribute(codes, {
        includeDisabled: true,
      }).filter((option) => option.value !== AUTH_IO_PROCESS)}
      value={selectedValue}
      onValueChange={updateContactMadeStatus}
      disabled={
        disabled ||
        isReferralDeleted(referral?.resourceStatus) ||
        isContactMadeScheduledOrCancelled(referral?.contactStatus)
      }
    />
  )
}

export { ContactMadeSelectCell }
