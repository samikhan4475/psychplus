import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { State } from '@/types'
import { LicenseType } from '../types'
import { DEAHeader } from './dea-header'
import { DEAPagination } from './dea-pagination'
import { DEATable } from './dea-table'
import { DEAFilterForm } from './filter-form'
import { useStore } from './store'

const DEAView = ({
  states,
  loadingStates,
}: {
  loadingStates: boolean
  states: State[]
}) => {
  const { search, data } = useStore((state) => ({
    data: state.data,
    search: state.search,
  }))

  useEffect(() => {
    if (!loadingStates && states.length && !data.length) {
      search({ licenseTypes: [LicenseType.DEA] })
    }
  }, [states.length, loadingStates])

  return (
    <Flex
      direction="column"
      width="100%"
      gap="1"
      className="bg-white h-full !overflow-hidden"
    >
      <DEAHeader />
      <DEAFilterForm />
      <DEATable licenses={data} />
      <DEAPagination />
    </Flex>
  )
}

export { DEAView }
