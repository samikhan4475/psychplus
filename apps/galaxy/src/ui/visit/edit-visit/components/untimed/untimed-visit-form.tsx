import { Box, Flex } from '@radix-ui/themes'
import { VisitDate } from '../visit-date'
import { VisitTypeSelect } from '../visit-type-select'
import { AdmittingProviderSelect } from './admitting-provider-select'
import { AuthDate } from './auth-date'
import { AuthNumberText } from './auth-number-text'
import { DateTimeOfAdmission } from './date-time-of-admission'
import { FacilityAdmissionSelect } from './facility-admission-id-select'
import { GroupSelect } from './group-select'
import { InsuranceVerificationSelect } from './insurance-verification-select'
import { LastCoverageDate } from './last-coverage-date'
import { LegalSelect } from './legal-select'
import { ProviderTypeSelect } from './provider-type-select'
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
        <VisitSequenceSelect />
      </Box>
      <Box className="col-span-4">
        <VisitMediumSelect />
      </Box>
      <Box className="col-span-8">
        <FacilityAdmissionSelect />
      </Box>
      <Box className="col-span-4">
        <DateTimeOfAdmission />
      </Box>
      <Box className="col-span-4">
        <AdmittingProviderSelect />
      </Box>
      <Box className="col-span-4">
        <VisitDate dependentOn="facilityAdmissionId" />
      </Box>
      <Box className="col-span-12">
        <Flex gap={'3'} direction={'row'} className="flex-1">
          <VisitFrequencySelect />
          <VisitStatusSelect />
          <InsuranceVerificationSelect />
        </Flex>
      </Box>
      <Box className="col-span-3">
        <LegalSelect />
      </Box>
      <Box className="col-span-3">
        <AuthNumberText />
      </Box>
      <Box className="col-span-3">
        <AuthDate />
      </Box>
      <Box className="col-span-3">
        <LastCoverageDate />
      </Box>
      <Box className="col-span-4">
        <UnitSelect />
      </Box>
      <Box className="col-span-4">
        <GroupSelect />
      </Box>
    </>
  )
}
export { UntimedVisitForm }
