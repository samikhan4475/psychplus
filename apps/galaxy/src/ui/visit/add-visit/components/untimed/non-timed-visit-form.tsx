import { Flex, Text } from '@radix-ui/themes'
import { VisitTypeDropdown } from '../visit-type-select'
import { AdmittingProviderSelector } from './admitting-provider-select'
import { AuthDate } from './auth-date'
import { AuthNumberInput } from './auth-number-text'
import { DateTimeOfAdmission } from './date-time-of-admission'
import { GroupDropdown } from './group-select'
import { LegalDropdown } from './legal-select'
import { PaymentResponsibilitySelect } from '../payment-responsibility-select'
import { RoomDropdown } from './room-select'
import { UnitDropdown } from './unit-select'
import { VisitFrequencyDropdown } from './visit-frequency-select'
import { VisitMediumSelect } from './visit-medium-select'
import { VisitSequenceSelect } from './visit-sequence-select'
import { VisitStatusSelect } from './visit-status-select'
import { ProviderTypeSelect } from './provider-type-select'
import { DischargeDate } from '@/ui/visit/components'
import { SchemaType } from '../../schema'

const NonTimedVisitForm = () => {
  return (
    <Flex className='col-span-12' direction="column" gap="3">
      <Flex
        direction="column"
        p="2"
        className="border-pp-focus-bg rounded-[4px] border-[2px]"
        gap="3"
      >
        <Text className='text-[14px] font-[500]'>Create New Facility Admission ID</Text>
        <Flex gap="2" align="start">
          <DateTimeOfAdmission />
          <AdmittingProviderSelector />
          <DischargeDate<SchemaType> />
        </Flex>
        <Flex gap="2" align="start">
          <ProviderTypeSelect />
          <LegalDropdown />
          <AuthNumberInput />
          <AuthDate />
        </Flex>
        <Flex gap="2" align="start">
          <UnitDropdown />
          <RoomDropdown />
          <GroupDropdown />
        </Flex>
      </Flex>
      <Flex gap="2" align="start">
        <VisitTypeDropdown />
        <VisitMediumSelect />
        <VisitSequenceSelect />
      </Flex>
      <Flex gap="2" align="start">
        <VisitFrequencyDropdown />
        <VisitStatusSelect />
        <PaymentResponsibilitySelect />
      </Flex>
    </Flex>
  )
}

export { NonTimedVisitForm }
