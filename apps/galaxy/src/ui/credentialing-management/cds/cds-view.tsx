import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { State } from '@/types'
import { LicenseType } from '../types'
import { CDSHeader } from './cds-header'
import { CDSPagination } from './cds-pagination'
import { CDSTable } from './cds-table'
import { CDSFilterForm } from './filter-form'
import { useStore } from './store'

const CDSView = ({
  loadingStates,
  states,
}: {
  states: State[]
  loadingStates: boolean
}) => {
  const { data, search } = useStore((state) => ({
    data: state.data,
    search: state.search,
  }))

  useEffect(() => {
    if (!loadingStates && !data.length && states.length) {
      search({ licenseTypes: [LicenseType.CDS] })
    }
  }, [loadingStates, states.length])

  return (
    <Flex
      direction="column"
      width="100%"
      gap="1"
      className="bg-white h-full !overflow-hidden"
    >
      <CDSHeader />
      <CDSFilterForm />
      <CDSTable licenses={data} />
      <CDSPagination />
    </Flex>
  )
}

export { CDSView }
