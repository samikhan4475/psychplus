import { Box } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { SchemaType } from '../../schema'
import { VisitTypeDropdown } from '../visit-type-select'
import { AdmittingProviderSelector } from './admitting-provider-select'
import { AuthDate } from './auth-date'
import { AuthNumberInput } from './auth-number-text'
import { DateTimeOfAdmission } from './date-time-of-admission'
import { DischargeDate } from './discharge-date'
import { FacilityAdmissionDropdown } from './facility-admission-id-select'
import { GroupDropdown } from './group-select'
import { LegalDropdown } from './legal-select'
import { PaymentResponsibilitySelect } from './payment-responsibility-select'
import { RoomDropdown } from './room-select'
import { UnitDropdown } from './unit-select'
import { VisitFrequencyDropdown } from './visit-frequency-select'
import { VisitMediumSelect } from './visit-medium-select'
import { VisitSequenceSelect } from './visit-sequence-select'
import { VisitStatusSelect } from './visit-status-select'

const UntimedVisitForm = () => {
  const form = useFormContext<SchemaType>()
  const facilityAdmissionId = useWatch({
    control: form.control,
    name: 'facilityAdmissionId',
  })

  const isNewFacilityAdmissionId = facilityAdmissionId === 'createNew'

  return (
    <>
      <Box className="col-span-4">
        <VisitTypeDropdown />
      </Box>
      <Box className="col-span-4">
        <FacilityAdmissionDropdown />
      </Box>
      {isNewFacilityAdmissionId && (
        <>
          <Box className="col-span-4">
            <DateTimeOfAdmission />
          </Box>
          <Box className="col-span-4">
            <AdmittingProviderSelector />
          </Box>
          <Box className="col-span-4">
            <DischargeDate />
          </Box>
        </>
      )}
      <Box className="col-span-3">
        <VisitSequenceSelect />
      </Box>
      <Box className="col-span-3">
        <VisitMediumSelect />
      </Box>
      <Box className="col-span-3">
        <VisitFrequencyDropdown />
      </Box>
      <Box className="col-span-3">
        <VisitStatusSelect />
      </Box>
      <Box className="col-span-3">
        <LegalDropdown />
      </Box>
      <Box className="col-span-3">
        <AuthNumberInput />
      </Box>
      <Box className="col-span-3">
        <AuthDate />
      </Box>
      <Box className="col-span-3">
        <PaymentResponsibilitySelect />
      </Box>
      <Box className="col-span-4">
        <UnitDropdown />
      </Box>
      <Box className="col-span-4">
        <RoomDropdown />
      </Box>
      <Box className="col-span-4">
        <GroupDropdown />
      </Box>
    </>
  )
}
export default UntimedVisitForm
