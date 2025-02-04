import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getScriptSureSessionToken,
} from '@/actions'
import { DAWSYS } from '@/constants'

const useGetOrderIdScriptSureIframeUrl = (
  id: string,
  pendingOrderId?: number,
  externalPatientId?: number,
  scriptSureAppUrl?: string,
  baseUrl?: string,
  darkMode: 'on' | 'off' = 'off',
) => {
  const [iframeUrl, setIframeUrl] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  useEffect(() => {
    const fetchData = async () => {
      const sessionTokenResponse = await getScriptSureSessionToken(DAWSYS)

      if (sessionTokenResponse.state !== 'error' && externalPatientId && pendingOrderId) {
        const sessionToken = sessionTokenResponse.data
        const url = `${scriptSureAppUrl}/widgets/${baseUrl}/${externalPatientId}/${pendingOrderId}?sessiontoken=${sessionToken}&darkmode=${darkMode}`
        setIsOpen(true)
        setIframeUrl(url)
      } else if (sessionTokenResponse.state === 'error') {
        toast.error(sessionTokenResponse.error ?? "Failed to get response")
        setIsOpen(false)
      }
    }

    fetchData()
  }, [id, scriptSureAppUrl, baseUrl, pendingOrderId, externalPatientId])

  return { iframeUrl, isOpen }
}

export { useGetOrderIdScriptSureIframeUrl }
