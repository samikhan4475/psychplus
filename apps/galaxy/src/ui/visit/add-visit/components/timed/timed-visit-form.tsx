import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { TCM } from '@/ui/visit/constants'
import { StateCodeSet, TCMVisitTypes } from '../../../types'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'
import { VisitDate } from '../visit-date'
import { VisitTypeDropdown } from '../visit-type-select'
import { DCDate } from './dc-date'
import { DCLocationSelect } from './dc-location-select'
import { DurationDropdown } from './duration-select'
import { EDDischargeDropdown } from './ed-discharge-select'
import { FrequencyDropdown } from './frequency-select'
import { GroupTypeDropdown } from './group-select'
import { PaymentResponsibilitySelect } from './payment-responsibility-select'
import { ProviderDropdown } from './provider-select'
import { VisitMediumText } from './visit-medium-text'
import { VisitSequenceText } from './visit-sequence-text'
import { VisitTimeDropdown } from './visit-time-select'

const TimedVisitForm = ({ states }: { states: StateCodeSet[] }) => {
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
        const isTCM = TCM.includes(visitType.encouterType as TCMVisitTypes)
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
        <ProviderDropdown />
      </Box>
      <Box className="col-span-4">
        <VisitTypeDropdown />
      </Box>

      {showDCFields && (
        <>
          <Box className="col-span-4">
            <DCDate />
          </Box>
          <Box className="col-span-4">
            <DCLocationSelect states={states} />
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
          <VisitSequenceText />
          <VisitMediumText />
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
