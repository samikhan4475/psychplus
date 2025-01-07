import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useProviderId } from '../hooks'
import { ListViewFilterCard } from './list-view-filter-card'
import { ListViewPagination } from './list-view-pagination'
import { ListViewTable } from './list-view-table'
import { useStore } from './store'

const ListView = () => {
  const { fetchAppointments, loading } = useStore((state) => ({
    fetchAppointments: state.fetchAppointments,
    loading: state.loading,
  }))
  const providerId = useProviderId()

  useEffect(() => {
    if (!providerId) return
    fetchAppointments({ providerIds: [Number(providerId)] })
  }, [])

  return (
    <Flex direction="column" className="h-full !overflow-hidden">
      <ListViewFilterCard />
      {loading ? <LoadingPlaceholder /> : <ListViewTable />}
      <ListViewPagination />
    </Flex>
  )
}

export { ListView }
