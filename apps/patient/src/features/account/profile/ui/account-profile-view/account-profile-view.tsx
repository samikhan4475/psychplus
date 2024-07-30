import { CODESETS } from '@psychplus-v2/constants'
import { GOOGLE_MAPS_API_KEY } from '@psychplus-v2/env'
import { Flex } from '@radix-ui/themes'
import { getCodesets, getProfile } from '@/api'
import { FeatureContainer } from '@/components-v2'
import { CodesetStoreProvider, GooglePlacesContextProvider } from '@/providers'
import { ProfileStoreProvider } from '../../store'
import { AddressCard } from './address-card'
import { ProfileAvatar } from './avatar'
import { DescriptiveCard } from './descriptive-card'
import { EmergencyContactCard } from './emergency-contact-card'
import { PersonalInfoCard } from './personal-info-card'

const AccountProfileView = async () => {
  const [codesets, profileResponse] = await Promise.all([
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
  ])

  if (profileResponse.state === 'error') {
    throw new Error(profileResponse.error)
  }

  return (
    <ProfileStoreProvider profile={profileResponse.data}>
      <CodesetStoreProvider codesets={codesets}>
        <GooglePlacesContextProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Flex direction="column" gap="4">
            <ProfileAvatar />
            <FeatureContainer>
              <PersonalInfoCard />
              <AddressCard />
              <DescriptiveCard />
              <EmergencyContactCard />
            </FeatureContainer>
          </Flex>
        </GooglePlacesContextProvider>
      </CodesetStoreProvider>
    </ProfileStoreProvider>
  )
}

export { AccountProfileView }
