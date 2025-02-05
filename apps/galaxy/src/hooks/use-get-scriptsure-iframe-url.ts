import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import {
  getScriptSureExternalPatient,
  getScriptSureSessionToken,
} from '@/actions'
import { DAWSYS } from '@/constants'
import { useStore as useAllergiesStore } from '@/ui/allergy/patient-allergies-widget/store'
import { useStore as useMedicationsStore } from '@/ui/medications/patient-medications-widget/store'


const useGetScriptSureIframeUrl = (
  id: string,
  scriptSureAppUrl: string,
  baseUrl: string,
  darkMode: 'on' | 'off' = 'off',
) => {
  const allergiesListError = useAllergiesStore((state) => state.allergiesListError)
  const medicationError = useMedicationsStore((state) => state.error)
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
      }
      
      
      if (sessionTokenResponse.state === 'error') {
        toast.error( allergiesListError ?? medicationError ?? sessionTokenResponse.error ?? 'Failed to fetch data')
      }


      if (externalPatientResponse.state === 'error') {
        toast.error(externalPatientResponse.error ?? 'Failed to fetch data')
      }
      setLoading(false)
    }

    if (id) {
      fetchData()
    }
  }, [id, scriptSureAppUrl, baseUrl])

  return { iframeUrl, loading }
}

export { useGetScriptSureIframeUrl }
