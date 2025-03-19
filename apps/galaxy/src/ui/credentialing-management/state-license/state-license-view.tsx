import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { State } from '@/types'
import { LicenseType } from '../types'
import { LicenseFilterForm } from './filter-form'
import { StateLicenseHeader } from './state-license-header'
import { StateLicensePagination } from './state-license-pagination'
import { StateLicenseTable } from './state-license-table'
import { useStore } from './store'

const StateLicenseView = ({
  states,
  loadingStates,
}: {
  states: State[]
  loadingStates: boolean
}) => {
  const { search, data } = useStore((state) => ({
    search: state.search,
    data: state.data,
  }))

  useEffect(() => {
    if (!loadingStates && states.length && !data.length) {
      search({ licenseTypes: [LicenseType.License] })
    }
  }, [loadingStates, states.length])

  return (
    <Flex
      direction="column"
      width="100%"
      gap="1"
      className="bg-white h-full !overflow-hidden"
    >
      <StateLicenseHeader />
      <LicenseFilterForm />
      <StateLicenseTable licenses={data} />
      <StateLicensePagination />
    </Flex>
  )
}

export { StateLicenseView }
