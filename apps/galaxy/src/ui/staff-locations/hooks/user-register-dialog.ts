import { useCallback, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { getStaffById } from '../actions/get-service-staff-by-id'
import {  StaffLocation } from '../types'
import { StaffResource } from '@/types'

export const useRegisterDialog = (record: StaffLocation) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [providerData, setProviderData] = useState<StaffResource | null>(null)
  const lock = useRef(false)

  const fetchProviderData = useCallback(async () => {
    if (lock.current || providerData) return
    lock.current = true
    setLoading(true)

    const result = await getStaffById(Number(record.staffId))
    result.state === 'success'
      ? setProviderData(result.data)
      : toast.error(result.error)

    setLoading(false)
    lock.current = false
  }, [record.staffId, providerData])

  const handleOpen = async () => {
    await fetchProviderData()
    setOpen(true)
  }
  
  const handleClose = () => {
    setOpen(false)
    setProviderData(null)
  }

  return {
    open,
    loading,
    providerData,
    handleOpen,
    handleClose,
  }
}
