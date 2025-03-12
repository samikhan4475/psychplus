import { Box } from '@radix-ui/themes'
import { Appointment } from '@/types'
import { DischargeDate } from '@/ui/visit/components'
import { SchemaType } from '../../schema'
import { PaymentResponsibilitySelect } from '../payment-responsibility-select'
import { ProviderTypeSelect } from '../provider-type-select'
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
import { RoomSelect } from './room-select'
import { UnitSelect } from './unit-select'
import { VisitFrequencySelect } from './visit-frequency-select'
import { VisitMediumSelect } from './visit-medium-select'
import { VisitSequenceSelect } from './visit-sequence-select'
import { VisitStatusSelect } from './visit-status-select'

const UntimedVisitForm = ({
  visitDetails,
  isPsychiatristVisitTypeSequence,
}: {
  visitDetails: Appointment
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-4">
        <VisitTypeSelect />
      </Box>
      <Box className="col-span-4">
        <FacilityAdmissionText visitDetails={visitDetails} />
      </Box>
      <Box className="col-span-6">
        <DateTimeOfAdmission
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-3">
        <AdmittingProviderSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-3">
        <DischargeDate<SchemaType> />
      </Box>

      <Box className="col-span-4">
        <VisitSequenceSelect
          visitDetails={visitDetails}
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
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
        <InsuranceVerificationSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-4">
        <LegalSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-4">
        <AuthNumberText
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-4">
        <AuthDate
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-4">
        <LastCoverageDate />
      </Box>
      <Box className="col-span-3">
        <PaymentResponsibilitySelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-3">
        <UnitSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-3">
        <RoomSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-3">
        <GroupSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
    </>
  )
}
export { UntimedVisitForm }
