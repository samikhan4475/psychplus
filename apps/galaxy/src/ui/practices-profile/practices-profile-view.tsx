'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { Organization, PracticeResource } from '@/types'
import { getOrganizationsAction, getPracticesListAction } from './actions'
import { ProfileForm } from './profile-form'

interface PracticesProfileViewProps {
  googleApiKey: string
}
const PracticesProfileView = ({ googleApiKey }: PracticesProfileViewProps) => {
  const { id } = useParams<{ id: string }>()
  const [practiceData, setPracticeData] = useState<PracticeResource>()
  const [loading, setLoading] = useState(true)
  const [organizationData, setOrganizationData] = useState<Organization>()

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const response = await getPracticesListAction({
        payload: {
          practiceId: id,
        },
      })

      if (response.state === 'success') {
        const practice = response.data[0]
        setPracticeData(practice)

        const organizationResponse = await getOrganizationsAction({
          payload: {
            organizationId: practice.organizationId,
          },
        })

        if (organizationResponse.state === 'success') {
          setOrganizationData(organizationResponse.data[0])
        }
      }

      setLoading(false)
    })()
  }, [])

  if (loading || !practiceData) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }

  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      <ProfileForm practice={practiceData} organization={organizationData} />
    </GooglePlacesContextProvider>
  )
}

export { PracticesProfileView }
