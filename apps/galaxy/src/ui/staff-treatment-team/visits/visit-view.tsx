import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { useStore } from './store'
import { VisitTable } from './visit-table'
import { VisitsFilterForm } from './visits-filter-form'
import { VisitHeader } from './visits-header'
import { VisitsTablePagination } from './visits-pagination-table'

const VisitsView = (props: { isProfileView?: boolean; staffId: string }) => {
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const { fetchVisitsList, loadingVisits } = useStore((state) => ({
    fetchVisitsList: state.fetchVisitsList,
    loadingVisits: state.loadingVisits,
  }))
  const staffId = props.isProfileView ? `${user?.staffId}` : props.staffId
  const [isPartialFilterView, setIsPartialFilterView] = useState(false)

  useEffect(() => {
    fetchVisitsList({
      providerIds: [Number(staffId)],
      isShowActiveVisits: true,
    })
  }, [])

  return (
    <Flex direction="column" width="100%" gap="1">
      <VisitHeader
        onClick={() => setIsPartialFilterView(true)}
        isPartialFilterView={isPartialFilterView}
      />

      <VisitsFilterForm
        staffId={staffId}
        isPartialFilterView={isPartialFilterView}
        onHide={() => setIsPartialFilterView(false)}
      />
      {loadingVisits ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <>
          <VisitTable staffId={staffId} />
          <VisitsTablePagination />
        </>
      )}
    </Flex>
  )
}

export { VisitsView }
