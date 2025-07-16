'use client'

import { useState } from 'react'
import { Button, Text } from '@radix-ui/themes'
import { Row } from '@tanstack/react-table'
import toast from 'react-hot-toast'
import { useShallow } from 'zustand/react/shallow'
import { associateMatchingReferralAction } from './actions'
import { useStore } from './store'
import { Match, Patient } from './types'

interface LinkExternalReferralButtonProps {
  row: Row<Match>
  externalReferralPatient: Patient
}
const LinkExternalReferralButton = ({
  row,
  externalReferralPatient,
}: LinkExternalReferralButtonProps) => {
  const [loading, setLoading] = useState(false)
  const { formValues, search } = useStore(
    useShallow((state) => ({
      formValues: state.formValues,
      search: state.search,
    })),
  )

  const handleLinkClick = async () => {
    setLoading(true)
    const response = await associateMatchingReferralAction(
      row.original.patientId,
      externalReferralPatient.id.toString(),
    )
    if (response.state === 'success') {
      toast.success('Referral linked successfully!')
      search(formValues, 1, true)
    } else {
      toast.error(response.error ?? 'Failed to link referral!')
    }
    setLoading(false)
  }

  return (
    <Button
      size="1"
      highContrast
      className=" text-white h-full min-h-0 w-full min-w-0 rounded-[4px] "
      onClick={handleLinkClick}
      disabled={loading}
    >
      <Text>Link</Text>
    </Button>
  )
}

export { LinkExternalReferralButton }
