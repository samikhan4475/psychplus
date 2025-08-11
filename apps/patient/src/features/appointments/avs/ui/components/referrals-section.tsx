import React, { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { ReferralStatuses } from '@psychplus/patient'
import { getReferralsAction } from '../../api'
import { TitleSection } from '../../common'
import { Referral } from '../../types'
import ReferralsTable from './referrals-table'

const ReferralsSection = () => {
  const [loading, setLoading] = useState(true)
  const [referrals, setReferrals] = useState<Referral[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const response = await getReferralsAction({
        resourceStatus: [
          ReferralStatuses.Incomplete,
          ReferralStatuses.Completed,
          ReferralStatuses.Pending,
        ],
      })
      if (response.state === 'success') {
        setReferrals(response?.data ?? [])
      }
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <Box>
      <TitleSection title="Referrals" />
      <ReferralsTable loading={loading} referrals={referrals} />
    </Box>
  )
}

export { ReferralsSection }
