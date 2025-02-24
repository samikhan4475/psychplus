import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { ListViewFilterCard } from './list-view-filter-card'
import { ListViewPagination } from './list-view-pagination'
import { ListViewTable } from './list-view-table'
import { useStore } from './store'

const ListView = () => {
  const { loading } = useStore((state) => ({
    loading: state.loading,
  }))

  return (
    <Flex direction="column" className="h-full !overflow-hidden">
      <ListViewFilterCard />
      {loading ? <LoadingPlaceholder /> : <ListViewTable />}
      <ListViewPagination />
    </Flex>
  )
}

export { ListView }
