import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { State } from '@/types'
import { getLicensesAction, GetLicensesParams } from '../actions'
import { transformData } from '../transform'
import { License, LicenseType } from '../types'
import { DEAHeader } from './dea-header'
import { DeaTable } from './dea-table'

const DEAView = ({
  staffId,
  states,
  loadingStates,
}: {
  staffId: string
  states: State[]
  loadingStates: boolean
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [licenses, setLicenses] = useState<License[]>([])

  useEffect(() => {
    if (!loadingStates && states.length) fetchLicenseList()
  }, [loadingStates, states.length])

  const fetchLicenseList = async () => {
    setLoading(true)
    const payload: GetLicensesParams = {
      providerStaffIds: [parseInt(staffId)],
      licenseTypes: [LicenseType.DEA],
      recordStatuses: ['Active'],
    }
    const result = await getLicensesAction(payload)
    setLoading(false)
    if (result.state === 'error') {
      toast.error(result.error || 'Error while fetching Licenses')
      return
    }
    const licenses = result.data
    const data = transformData({
      states,
      licenses,
      licenseType: LicenseType.DEA,
      providerStaffId: parseInt(staffId),
    })
    setLicenses(data)
  }

  return (
    <Flex direction="column" width="100%" gap="1">
      <DEAHeader />

      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <DeaTable licenses={licenses} fetchLicenseList={fetchLicenseList} />
      )}
    </Flex>
  )
}

export { DEAView }
