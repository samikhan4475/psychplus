import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { State } from '@/types'
import { getLicensesAction, GetLicensesParams } from '../actions'
import { transformData } from '../transform'
import { License, LicenseType, RecordStatus } from '../types'
import { LicenseHeader } from './license-header'
import { LicenseTable } from './license-table'

const LicenseView = ({
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
      licenseTypes: [LicenseType.License],
      recordStatuses: [RecordStatus.Active],
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
      licenseType: LicenseType.License,
      providerStaffId: parseInt(staffId),
    })
    setLicenses(data)
  }

  return (
    <Flex direction="column" width="100%" gap="1">
      <LicenseHeader />

      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <LicenseTable licenses={licenses} fetchLicenseList={fetchLicenseList} />
      )}
    </Flex>
  )
}

export { LicenseView }
