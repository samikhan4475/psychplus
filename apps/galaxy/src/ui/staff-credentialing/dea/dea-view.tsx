import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { LicenseHistory } from '../license-history'
import { useStore } from '../store'
import { DEAHeader } from './dea-header'
import { DeaTable } from './dea-table'

const DEAView = () => {
  const { fetchDeaList, loadingDea } = useStore()
  useEffect(() => {
    fetchDeaList(0)
  }, [])
  return (
    <Flex direction="column" width="100%" gap="1">
      <DEAHeader />
      <LicenseHistory staffId={'91'} />

      {loadingDea ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DeaTable />
      )}
    </Flex>
  )
}

export { DEAView }
