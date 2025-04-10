import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore as useGlobalStore } from '@/store'
import { useStore } from './store'
import { VisitTable } from './visit-table'
import { VisitsFilterForm } from './visits-filter-form'
import { VisitHeader } from './visits-header'
import { VisitsTablePagination } from './visits-pagination-table'

const VisitsView = (props: { isProfileView?: boolean }) => {
  const { user } = useGlobalStore((state) => ({ user: state.user }))
  const { id } = useParams()
  const staffId = props.isProfileView ? `${user?.staffId}` : id

  const { fetchVistsList, loadingVisits } = useStore()
  const [isPartialFilterView, setIsPartialFilterView] = useState(false)
  useEffect(() => {
    const payload = {
      providerIds: [Number(staffId)],
      appointmentStatus: 'Scheduled',
    }
    fetchVistsList(payload)
  }, [])
  return (
    <Flex direction="column" width="100%" gap="1">
      <VisitHeader
        onClick={() => setIsPartialFilterView(true)}
        isPartialFilterView={isPartialFilterView}
      />

      <VisitsFilterForm
        isPartialFilterView={isPartialFilterView}
        onHide={() => setIsPartialFilterView(false)}
      />
      {loadingVisits ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <>
          <VisitTable />
          <VisitsTablePagination />
        </>
      )}
    </Flex>
  )
}

export { VisitsView }
