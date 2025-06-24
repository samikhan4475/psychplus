import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { Flex } from '@radix-ui/themes'
import { getCodesets, getProfile, getRelationship } from '@/api'
import { FeatureContainer } from '@/components-v2'
import { AdditionalContactCard } from '@/features/account/profile/ui/account-profile-view/additional-contact-card'
import { AlternateInfoCard } from '@/features/account/profile/ui/account-profile-view/alternate-info-card'
import { PreferredPartnerCard } from '@/features/account/profile/ui/account-profile-view/preferred-partner-card'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'
import { ProfileStoreProvider } from '../../store'
import { AddressCard } from './address-card'
import { ProfileAvatar } from './avatar'
import { DescriptiveCard } from './descriptive-card'
import { PersonalInfoCard } from './personal-info-card'
import { EmergencyContactCard } from './emergency-contact-card'

const AccountProfileView = async () => {
  const [codesets, profileResponse, relationshipResponse] = await Promise.all([
    getCodesets([
      CODESETS.UsStates,
      CODESETS.Gender,
      CODESETS.GenderOrientation,
      CODESETS.GenderExpression,
      CODESETS.GenderPronoun,
      CODESETS.Language,
      CODESETS.GuardianRelationship,
      CODESETS.RaceAndEthnicity,
      CODESETS.ProfSuffix,
      CODESETS.LanguageProficiency,
      CODESETS.LanguageAbility,
      CODESETS.Religion,
    ]),
    getProfile(),
    getRelationship(),
  ])

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  if (relationshipResponse.state === 'error') {
    throw new Error(relationshipResponse.error)
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Flex direction="column" gap="4">
            <ProfileAvatar />
            <FeatureContainer className='px-3 sm:px-0 gap-3'>
              <PersonalInfoCard />
              <AddressCard />
              <EmergencyContactCard relationshipData={relationshipResponse.data}/>
              <AdditionalContactCard />
              <AlternateInfoCard />
              <DescriptiveCard />
            </FeatureContainer>
          </Flex>
        </GooglePlacesContextProvider>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export { AccountProfileView }
