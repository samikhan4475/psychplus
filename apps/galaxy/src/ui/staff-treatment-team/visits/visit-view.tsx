import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useStore } from '../store'
import { VisitTable } from './visit-table'
import { VisitHeader } from './visits-header'

const VisitsView = () => {
  const { fetchVistsList, loadingVisits } = useStore()
  useEffect(() => {
    fetchVistsList(0)
  }, [])
  return (
    <Flex direction="column" width="100%" gap="1">
      <VisitHeader />

      {loadingVisits ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <VisitTable />
      )}
    </Flex>
  )
}

export { VisitsView }
