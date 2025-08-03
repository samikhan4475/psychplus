'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Flex } from '@radix-ui/themes'
import { LoadingPlaceholder } from '@/components'
import { useOrganizationMember } from '@/hooks'
import { GooglePlacesContextProvider } from '@/providers/google-places-provider'
import { getAllOrganizationsListAction } from '../organization-practice/actions'
import { Organization } from '../organization-practice/types'
import { ProfileForm } from './profile-form'

interface OrganizationProfileViewProps {
  googleApiKey: string
}
const OrganizationProfileView = ({
  googleApiKey,
}: OrganizationProfileViewProps) => {
  const [organization, setOrganization] = useState<Organization>()
  const [loading, setLoading] = useState(false)
  const { id } = useParams<{ id: string }>()
  const isMember = useOrganizationMember(id ?? '')

  useEffect(() => {
    if (!isMember) return
    const fetchOrganization = async () => {
      setLoading(true)
      if (!id) return

      const response = await getAllOrganizationsListAction({
        payload: { organizationId: id },
      })

      if (response.state === 'success') {
        const organization = response.data.organizations[0]
        setOrganization(organization)
        setLoading(false)
      } else {
        setLoading(false)
      }
    }

    fetchOrganization()
  }, [id])

  if (!isMember) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <h1>You are unauthorized to view this page</h1>
      </Flex>
    )
  }

  if (loading) {
    return (
      <Flex height="100%" width="100%" align="center" justify="center">
        <LoadingPlaceholder />
      </Flex>
    )
  }
  return (
    <GooglePlacesContextProvider apiKey={googleApiKey}>
      {organization && <ProfileForm defaultValues={organization} />}
    </GooglePlacesContextProvider>
  )
}

export { OrganizationProfileView }
