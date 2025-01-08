'use client'

import { GooglePlacesContextProvider } from "@/providers/google-places-provider"
import { ProfileForm } from "./profile-form"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getAllOrganizationsListAction } from "../organization-practice/actions"
import { Organization } from "../organization-practice/types"
import { Flex } from "@radix-ui/themes"
import { LoadingPlaceholder } from "@/components"
interface OrganizationProfileViewProps {
  googleApiKey: string
}
const OrganizationProfileView = ({ googleApiKey }: OrganizationProfileViewProps) => {
  const [organization, setOrganization] = useState<Organization>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchOrganization = async () => {
      setLoading(true);
      if (!id) return;

      const response = await getAllOrganizationsListAction({
        payload: { organizationId: id },
      });

      if (response.state === 'success') {
        const organization = response.data.organizations[0];
        setOrganization(organization);
        setLoading(false);
      } else {
        console.error('Failed to fetch organization data', response.error);
        setLoading(false);
      }

    };

    fetchOrganization();
  }, [id]);
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