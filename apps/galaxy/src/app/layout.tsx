import './base.css'
import { type Metadata } from 'next'
import { Josefin_Sans } from 'next/font/google'
import { Flex, Theme } from '@radix-ui/themes'
import { Toaster } from 'react-hot-toast'
import { getCodesets, getUserPermissions } from '@/api'
import { CODESETS } from '@/constants'
import { StoreProvider } from '@/store'
import { Header } from '@/ui/header'
import { cn } from '@/utils'
import { getAuthCookies } from '@/utils/auth'

export const metadata: Metadata = {
  title: 'PsychPlus',
  description: 'PsychPlus',
}

const josefin = Josefin_Sans({
  weight: ['600'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-josefin',
})

const RootLayout = async ({ children }: React.PropsWithChildren) => {
  const auth = getAuthCookies()

  const content = (
    <html lang="en" className={cn(josefin.variable)}>
      <body>
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 5000,
          }}
        />
        <Theme
          accentColor="blue"
          radius="medium"
          className="flex h-full w-full flex-col"
        >
          {auth ? <Header /> : null}
          <Flex direction="column" className="flex-1 overflow-y-auto">
            {children}
          </Flex>
        </Theme>
      </body>
    </html>
  )

  if (auth) {
    const [codesets, permissions] = await Promise.all([
      getCodesets([
        CODESETS.Gender,
        CODESETS.ProfSuffix,
        CODESETS.GenderOrientation,
        CODESETS.GenderExpression,
        CODESETS.GenderPronoun,
        CODESETS.Religion,
        CODESETS.Language,
        CODESETS.SpecialistType,
        CODESETS.ProviderType,
        CODESETS.FacilityAppointmentStatus,
        CODESETS.AppointmentType,
        CODESETS.VisitSequenceType,
        CODESETS.VisitRepeatFrequency,
        CODESETS.AdmissionLegalStatus,
        CODESETS.LanguageProficiency,
        CODESETS.RaceAndEthnicity,
        CODESETS.GroupTherapyType,
        CODESETS.UsStates,
        CODESETS.CommonLanguages,
        CODESETS.VisitMedium,
        CODESETS.FirstResponder,
        CODESETS.ServicesOffered,
        CODESETS.ProviderType,
        CODESETS.SpecialistType,
        CODESETS.AppointmentStatus,
        CODESETS.EncounterType,
        CODESETS.NotificationStatus,
        CODESETS.NotificationChannel,
        CODESETS.UsStates,
        CODESETS.AppointmentStatus,
        CODESETS.EncounterType,
        CODESETS.UsStates,
        CODESETS.CustomerStatus,
        CODESETS.Relationship,
        CODESETS.InsurancePolicyPriority,
        CODESETS.InsuranceRelationship,
        CODESETS.GuardianRelationship,
        CODESETS.VacationStatus,
        CODESETS.VisitStatus,
        CODESETS.VerificationStatus,
        CODESETS.VisitSequence,
        CODESETS.LegalStatus,
        CODESETS.TransactionType,
        CODESETS.PractitionerHonor,
        CODESETS.PatientConsentPolicyType,
        CODESETS.RecordStatus,
      ]),
      getUserPermissions(),
    ])

    return (
      <StoreProvider permissions={permissions} codesets={codesets}>
        {content}
      </StoreProvider>
    )
  }

  return content
}

export default RootLayout
