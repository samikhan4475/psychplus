import { useEffect } from 'react'
import { LoadingPlaceholder } from '@/components'
import { ClinicTimeTable } from './clinic-time-table'
import { useStore } from './store'
import { PropsWithStaffId } from './types'

const ClinicTimeTableLoader = ({ staffId }: PropsWithStaffId) => {
  const { data, loading, fetchClinicSchedules, fetchStaffData } = useStore(
    (store) => ({
      data: store.data,
      loading: store.loading,
      fetchClinicSchedules: store.fetchClinicSchedules,
      fetchStaffData: store.fetchStaffData,
    }),
  )

  useEffect(() => {
    const fetchData = () => {
      fetchClinicSchedules(staffId)
      fetchStaffData(Number(staffId))
    }
    fetchData()
  }, [staffId, fetchClinicSchedules, fetchStaffData])

  if (loading) {
    return <LoadingPlaceholder className="h-full w-full" />
  }

  return <ClinicTimeTable data={data ?? []} />
}

export { ClinicTimeTableLoader }
