import { Box } from '@radix-ui/themes'
import { PaymentResponsibilitySelect } from '../payment-responsibility-select'
import { VisitTypeSelect } from '../visit-type-select'
import { AdmittingProviderSelect } from './admitting-provider-select'
import { AuthDate } from './auth-date'
import { AuthNumberText } from './auth-number-text'
import { DateTimeOfAdmission } from './date-time-of-admission'
import { FacilityAdmissionText } from './facility-admission-id-text'
import { GroupSelect } from './group-select'
import { InsuranceVerificationSelect } from './insurance-verification-select'
import { LastCoverageDate } from './last-coverage-date'
import { LegalSelect } from './legal-select'
import { ProviderTypeSelect } from './provider-type-select'
import { RoomSelect } from './room-select'
import { UnitSelect } from './unit-select'
import { VisitFrequencySelect } from './visit-frequency-select'
import { VisitMediumSelect } from './visit-medium-select'
import { VisitSequenceSelect } from './visit-sequence-select'
import { VisitStatusSelect } from './visit-status-select'

const UntimedVisitForm = () => {
  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeSelect />
      </Box>
      <Box className="col-span-4">
        <VisitTypeSelect />
      </Box>
      <Box className="col-span-4">
        <FacilityAdmissionText />
      </Box>
      <Box className="col-span-6">
        <DateTimeOfAdmission />
      </Box>
      <Box className="col-span-6">
        <AdmittingProviderSelect />
      </Box>
      <Box className="col-span-4">
        <VisitSequenceSelect />
      </Box>
      <Box className="col-span-4">
        <VisitMediumSelect />
      </Box>
      <Box className="col-span-4">
        <VisitFrequencySelect />
      </Box>
      <Box className="col-span-4">
        <VisitStatusSelect />
      </Box>
      <Box className="col-span-4">
        <InsuranceVerificationSelect />
      </Box>
      <Box className="col-span-4">
        <LegalSelect />
      </Box>
      <Box className="col-span-4">
        <AuthNumberText />
      </Box>
      <Box className="col-span-4">
        <AuthDate />
      </Box>
      <Box className="col-span-4">
        <LastCoverageDate />
      </Box>
      <Box className="col-span-3">
        <PaymentResponsibilitySelect />
      </Box>
      <Box className="col-span-3">
        <UnitSelect />
      </Box>
      <Box className="col-span-3">
        <RoomSelect />
      </Box>
      <Box className="col-span-3">
        <GroupSelect />
      </Box>
    </>
  )
}
export { UntimedVisitForm }
