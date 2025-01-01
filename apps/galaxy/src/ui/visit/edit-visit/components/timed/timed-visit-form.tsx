import { useEffect } from 'react'
import { Box, Flex } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { TCMTypeOfVisit } from '@/ui/visit/constants'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'
import { PaymentResponsibilitySelect } from '../payment-responsibility-select'
import { ProviderTypeSelect } from '../provider-type-select'
import { VisitTypeSelect } from '../visit-type-select'
import { DCDate } from './dc-date'
import { DCLocationText } from './dc-location-text'
import { DurationSelect } from './duration-select'
import { EDDischargeDropdown } from './ed-discharge-select'
import { FrequencySelect } from './frequency-select'
import { GroupTypeSelect } from './group-select'
import { ProviderSelect } from './provider-select'
import { VisitDate } from './visit-date'
import { VisitMediumText } from './visit-medium-text'
import { VisitSequenceText } from './visit-sequence-text'
import { VisitTimeSelect } from './visit-time-select'

const TimedVisitForm = ({
  isPsychiatristVisitTypeSequence,
}: {
  isPsychiatristVisitTypeSequence?: boolean
}) => {
  const form = useFormContext<SchemaType>()
  const { visitTypes } = useEditVisitStore()

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
  }, [selectedVisitType, visitTypes])

  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeSelect
          isPsychiatristVisitTypeSequence={isPsychiatristVisitTypeSequence}
        />
      </Box>
      <Box className="col-span-4">
        <ProviderSelect />
      </Box>
      <Box className="col-span-4">
        <VisitTypeSelect />
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
          <GroupTypeSelect />
          <VisitSequenceText />
          <VisitMediumText />
          <VisitDate />
          <VisitTimeSelect />
        </Flex>
      </Box>

      <Box className="col-span-4">
        <DurationSelect />
      </Box>
      <Box className="col-span-4">
        <FrequencySelect />
      </Box>
      <Box className="col-span-4">
        <PaymentResponsibilitySelect />
      </Box>
    </>
  )
}
export { TimedVisitForm }
