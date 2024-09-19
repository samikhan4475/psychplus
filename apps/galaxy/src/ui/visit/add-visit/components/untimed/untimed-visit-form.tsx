import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../../schema'
import { VisitDate } from '../visit-date'
import { VisitMediumSelect } from '../visit-medium-select'
import { VisitSequenceSelect } from '../visit-sequence-select'
import { VisitTypeDropdown } from '../visit-type-select'
import { AdmittingProviderSelector } from './admitting-provider-select'
import { AuthDateInput } from './auth-date-text'
import { AuthNumberInput } from './auth-number-text'
import { DateTimeOfAdmission } from './date-time-of-admission'
import { FacilityAdmissionDropdown } from './facility-admission-id-select'
import { VisitFrequencyDropdown } from './visit-frequency-select'
import { GroupDropdown } from './group-select'
import { LegalDropdown } from './legal-select'
import { ProviderTypeDropdown } from './provider-type-select'
import { UnitDropdown } from './unit-select'

const UntimedVisitForm = () => {
  const form = useFormContext<SchemaType>()

  const isNewFacilityAdmissionId =
    form.watch('facilityAdmissionId') === 'createNew'

  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeDropdown />
      </Box>

      <Box className="col-span-4">
        <VisitTypeDropdown />
      </Box>
      <Box className="col-span-4">
        <VisitSequenceSelect />
      </Box>
      <Box className="col-span-4">
        <VisitMediumSelect />
      </Box>
      <Box className="col-span-8">
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
            <VisitDate dependentOn="facilityAdmissionId" />
          </Box>
        </>
      )}
      <Box className="col-span-12">
        <Flex direction={'row'} gap={'3'} className="flex-1">
          {!isNewFacilityAdmissionId && (
            <VisitDate dependentOn="facilityAdmissionId" />
          )}
          <VisitFrequencyDropdown />
          <LegalDropdown />
          <AuthNumberInput />
          <AuthDateInput />
        </Flex>
      </Box>

      <Box className="col-span-4">
        <UnitDropdown />
      </Box>
      <Box className="col-span-4">
        <GroupDropdown />
      </Box>
    </>
  )
}
export default UntimedVisitForm
