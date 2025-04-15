import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getLocationDetail } from '../actions/get-location-detail'
import { LocationResult } from '../types'

export const useLocationOptions = (locationId?: string) => {
  const [data, setData] = useState<LocationResult[] | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const fetch = async () => {
      if (!locationId) return
      setLoading(true)
      getLocationDetail(locationId)
        .then((res) => {
          if (res.state === 'error') {
            toast.error(res.error)
          } else {
            setData(res.data)
          }
        })
        .finally(() => {
          setLoading(false)
        })
    }
    fetch()
  }, [locationId])

  return { data, loading }
}
