import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useStore as globalStore } from '@/store'
import { getLicenseExpiryNotificationsAction } from '../client-actions/get-near-to-expire-licenses'
import { NearToExpireLicenseResponse } from '../types'

export const useLicenseExpiryNotification = (isInitialLogin: boolean) => {
  const { staffId } = globalStore((state) => state.user)
  const [isOpen, setIsOpen] = useState<boolean>(isInitialLogin)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<NearToExpireLicenseResponse[]>([])

  useEffect(() => {
    if (!isInitialLogin) return
    setLoading(true)
    getLicenseExpiryNotificationsAction(staffId).then((res) => {
      if (res.state === 'error') {
        return toast.error(
          res.error || 'Error while fetching License Expiry Notifications',
        )
      }
      if (res.data.length) {
        setIsOpen(true)
        setData(res.data)
      }
      setLoading(false)
    })
  }, [isInitialLogin, staffId])

  return {
    isOpen,
    setIsOpen,
    loading,
    data,
  }
}
