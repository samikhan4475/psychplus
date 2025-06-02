import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { TCMTypeOfVisit } from '@/ui/visit/constants'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'
import { SlotDetails } from '../../types'
import { VisitDate } from '../visit-date'
import { VisitTypeDropdown } from '../visit-type-select'
import { DCDate } from './dc-date'
import { DCLocationText } from './dc-location-text'
import { DurationDropdown } from './duration-select'
import { EDDischargeDropdown } from './ed-discharge-select'
import { FrequencyDropdown } from './frequency-select'
import { GroupTypeDropdown } from './group-select'
import { PaymentResponsibilitySelect } from '../payment-responsibility-select'
import { ProviderDropdown } from './provider-select'
import { ProviderTypeSelect } from './provider-type-select'
import { VisitMediumText } from './visit-medium-text'
import { VisitSequenceText } from './visit-sequence-text'
import { VisitTimeDropdown } from './visit-time-select'

const TimedVisitForm = ({ slotDetails }: { slotDetails?: SlotDetails }) => {
  const form = useFormContext<SchemaType>()
  const { visitTypes } = useAddVisitStore()

  const [selectedVisitType, showDCFields] = useWatch({
    control: form.control,
    name: ['visitType', 'showDCFields'],
  })

  useEffect(() => {
    if (selectedVisitType) {
      const visitType = visitTypes.find(
        (type) => type.encouterType === selectedVisitType,
      )

      if (visitType) {
        const isTCM = visitType.typeOfVisit.includes(TCMTypeOfVisit)
        form.setValue('showDCFields', isTCM)
      }
    } else if (!selectedVisitType && showDCFields) {
      form.setValue('showDCFields', false)
    }
    return () => form.setValue('showDCFields', false)
  }, [visitTypes, selectedVisitType])

  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeSelect />
      </Box>
      <Box className="col-span-4">
        <ProviderDropdown />
      </Box>
      <Box className="col-span-4">
        <VisitTypeDropdown slotDetails={slotDetails} />
      </Box>

      {showDCFields && (
        <>
          <Box className="col-span-4">
            <DCDate />
          </Box>
          <Box className="col-span-4">
            <DCLocationText />
          </Box>
          <Box className="col-span-4">
            <Flex align="center" gap="2" className="flex-1">
              <EDDischargeDropdown />
            </Flex>
          </Box>
        </>
      )}

      <Box className="col-span-12">
        <Flex direction={'row'} gap={'3'} className="flex-1">
          <GroupTypeDropdown />
          <VisitMediumText />
          <VisitSequenceText />
          <VisitDate dependentOn="visitType" />
          <VisitTimeDropdown />
        </Flex>
      </Box>

      <Box className="col-span-4">
        <DurationDropdown />
      </Box>
      <Box className="col-span-4">
        <FrequencyDropdown />
      </Box>
      <Box className="col-span-4">
        <PaymentResponsibilitySelect />
      </Box>
    </>
  )
}
export default TimedVisitForm
