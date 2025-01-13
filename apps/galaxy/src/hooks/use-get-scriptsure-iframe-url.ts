import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getScriptSureExternalPatient,
  getScriptSureSessionToken,
} from '@/actions'
import { DAWSYS } from '@/constants'

const useGetScriptSureIframeUrl = (
  id: string,
  scriptSureAppUrl: string,
  baseUrl: string,
  darkMode: 'on' | 'off' = 'off',
) => {
  const [iframeUrl, setIframeUrl] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      const [sessionTokenResponse, externalPatientResponse] = await Promise.all(
        [getScriptSureSessionToken(DAWSYS), getScriptSureExternalPatient(id)],
      )

      if (
        sessionTokenResponse.state !== 'error' &&
        externalPatientResponse.state !== 'error'
      ) {
        const sessionToken = sessionTokenResponse.data
        const externalPatientId = externalPatientResponse.data.externalPatientId
        const url = `${scriptSureAppUrl}/widgets/${baseUrl}/${externalPatientId}?sessiontoken=${sessionToken}&darkmode=${darkMode}`
        setIframeUrl(url)
      } else {
        toast.error('Failed to fetch data')
      }
      setLoading(false)
    }

    fetchData()
  }, [id, scriptSureAppUrl, baseUrl])

  return { iframeUrl, loading }
}

export { useGetScriptSureIframeUrl }
