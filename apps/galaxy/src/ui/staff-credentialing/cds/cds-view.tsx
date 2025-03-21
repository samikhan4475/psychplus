import { useEffect, useState } from 'react'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { LoadingPlaceholder } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { State } from '@/types'
import { getLicensesAction, GetLicensesParams } from '../actions'
import { transformData } from '../transform'
import { License, LicenseType } from '../types'
import { CDSHeader } from './cds-header'
import { CDSTable } from './cds-table'

const CDSView = ({
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
  const stateCodes = useCodesetCodes(CODESETS.UsStates)

  useEffect(() => {
    if (!loadingStates && states.length) fetchLicenseList()
  }, [loadingStates, states.length])

  const fetchLicenseList = async () => {
    setLoading(true)
    const payload: GetLicensesParams = {
      providerStaffIds: [parseInt(staffId)],
      licenseTypes: [LicenseType.CDS],
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
      licenseType: LicenseType.CDS,
      stateCodes,
      providerStaffId: parseInt(staffId),
    })
    setLicenses(data)
  }

  return (
    <Flex direction="column" width="100%" gap="1">
      <CDSHeader />

      {loading ? (
        <LoadingPlaceholder className="bg-white min-h-[46vh]" />
      ) : (
        <CDSTable licenses={licenses} fetchLicenseList={fetchLicenseList} />
      )}
    </Flex>
  )
}

export { CDSView }
