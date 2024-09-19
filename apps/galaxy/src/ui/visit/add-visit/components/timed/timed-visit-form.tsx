import { useEffect, useState } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { SchemaType } from '../../schema'
import { useAddVisitStore } from '../../store'
import { TCMVisitTypes } from '../../types'
import { ProviderDropdown } from '../provider-select'
import { VisitDate } from '../visit-date'
import { VisitMediumInput } from '../visit-medium-text'
import { VisitSequenceInput } from '../visit-sequence-text'
import { VisitTypeDropdown } from '../visit-type-select'
import { DCDate } from './dc-date'
import { DCLocationInput } from './dc-location-text'
import { DurationDropdown } from './duration-select'
import { EDDischargeDropdown } from './ed-discharge-select'
import { FrequencyDropdown } from './frequency-select'
import { GroupTypeDropdown } from './group-select'
import { ProviderTypeDropdown } from './provider-type-select'
import { VisitTimeDropdown } from './visit-time-select'

const TimedVisitForm = () => {
  const form = useFormContext<SchemaType>()
  const [showDCFields, setShowDCFields] = useState<boolean>(false)
  const { visitTypes } = useAddVisitStore()

  const selectedVisitType = form.watch('visitType')

  useEffect(() => {
    if (selectedVisitType) {
      const visitType = visitTypes.find(
        (type) => type.encouterType === selectedVisitType,
      )

      if (visitType) {
        const TCM = [
          TCMVisitTypes.EST_PT_TRANSITIONAL_CARE,
          TCMVisitTypes.NEW_PT_TRANSITIONAL_CARE,
          TCMVisitTypes.T_EST_PT_TRANSITIONAL_CARE,
          TCMVisitTypes.T_NEW_PT_TRANSITIONAL_CARE,
        ]
        setShowDCFields(TCM.includes(visitType.encouterType as TCMVisitTypes))
      }
    } else if (!selectedVisitType && showDCFields) {
      setShowDCFields(false)
    }
  }, [visitTypes, selectedVisitType])

  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeDropdown />
      </Box>
      <Box className="col-span-4">
        <ProviderDropdown />
      </Box>
      <Box className="col-span-4">
        <VisitTypeDropdown />
      </Box>
      <Box className="col-span-3">
        <VisitSequenceInput />
      </Box>
      <Box className="col-span-3">
        <VisitMediumInput />
      </Box>
      <Box className="col-span-3">
        <VisitDate dependentOn="visitType" />
      </Box>
      <Box className="col-span-3">
        <VisitTimeDropdown />
      </Box>
      {showDCFields && (
        <>
          <Box className="col-span-4">
            <DCDate />
          </Box>
          <Box className="col-span-4">
            <DCLocationInput />
          </Box>
          <Box className="col-span-4">
            <Flex align="center" gap="2" className="flex-1">
              <EDDischargeDropdown />
            </Flex>
          </Box>
        </>
      )}

      <GroupTypeDropdown />
      <Box className="col-span-3">
        <DurationDropdown />
      </Box>
      <Box className="col-span-3">
        <FrequencyDropdown />
      </Box>
    </>
  )
}
export default TimedVisitForm
