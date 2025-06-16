'use client'

import React, { PropsWithChildren, useEffect, useState } from 'react'
import { AppointmentAvailability } from '@psychplus-v2/types'
import { Cross1Icon } from '@radix-ui/react-icons'
import { Dialog, IconButton } from '@radix-ui/themes'
import { Staff } from '@psychplus/staff'
import { StaffBio } from '@/components-v2/shared'
import { searchStaffUnauthenticatedAction } from '../../actions'
import { getStaffFullName, searchStaffPayload } from '../../utils'

interface ProviderBioDialogProps {
  appointmentDetail: AppointmentAvailability
}

const ProviderBioDialog = ({
  children,
  appointmentDetail,
}: PropsWithChildren<ProviderBioDialogProps>) => {
  const [staffData, setStaffData] = useState<Staff | undefined>()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const { specialist } = appointmentDetail
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    setErrorMessage(null)
    const payload = searchStaffPayload(specialist)
    searchStaffUnauthenticatedAction(payload).then((res) => {
      if (res.state === 'error') {
        setErrorMessage(res.error ?? 'Failed to load staff information.')
      } else {
        const staffList = Array.isArray(res?.data) ? res.data[0] : res.data
        setStaffData(staffList)
      }
      setLoading(false)
    })
  }, [open, specialist])
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {children}
      <Dialog.Content
        onOpenAutoFocus={(e) => e.preventDefault()}
        className="relative min-h-[472px] max-w-[708px] overflow-visible rounded-6 p-6"
      >
        <Dialog.Close className="absolute right-6 top-5 cursor-pointer">
          <IconButton size="1" highContrast variant="ghost" color="gray">
            <Cross1Icon width={20} height={20} strokeWidth={1.5} />
          </IconButton>
        </Dialog.Close>
        <StaffBio
          heading="About"
          title={getStaffFullName(specialist ?? staffData)}
          description={staffData?.bio ?? 'No bio available'}
          rating={staffData?.rating ?? specialist?.rating}
          data={appointmentDetail ?? staffData}
          loading={loading}
          errorMessage={errorMessage}
        />
      </Dialog.Content>
    </Dialog.Root>
  )
}
export { ProviderBioDialog }
