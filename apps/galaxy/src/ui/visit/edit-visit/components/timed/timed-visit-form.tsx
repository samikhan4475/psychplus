import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { TCM } from '@/ui/visit/constants'
import { TCMVisitTypes } from '../../../types'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'
import { VisitDate } from '../visit-date'
import { DurationDropdown } from './duration-select'
import { FrequencyDropdown } from './frequency-select'
import { ProviderSelect } from './provider-select'
import { ProviderTypeSelect } from './provider-type-select'
import { VisitMediumText } from './visit-medium-text'
import { VisitSequenceText } from './visit-sequence-text'
import { VisitTimeSelect } from './visit-time-select'
import { VisitTypeSelect } from './visit-type-select'

const TimedVisitForm = () => {
  const form = useFormContext<SchemaType>()
  const [showDCFields, setShowDCFields] = useState<boolean>(false)
  const { visitTypes } = useEditVisitStore()

  const selectedVisitType = form.watch('visitType')

  useEffect(() => {
    if (selectedVisitType) {
      const visitType = visitTypes.find(
        (type) => type.encouterType === selectedVisitType,
      )

      if (visitType) {
        setShowDCFields(TCM.includes(visitType.encouterType as TCMVisitTypes))
      }
    } else if (showDCFields && !selectedVisitType) {
      setShowDCFields(false)
    }
  }, [selectedVisitType, visitTypes])

  return (
    <>
      <Box className="col-span-4">
        <ProviderTypeSelect />
      </Box>
      <Box className="col-span-4">
        <ProviderSelect />
      </Box>
      <Box className="col-span-4">
        <VisitTypeSelect />
      </Box>
      <Box className="col-span-3">
        <VisitSequenceText />
      </Box>
      <Box className="col-span-3">
        <VisitMediumText />
      </Box>
      <Box className="col-span-3">
        <VisitDate />
      </Box>
      <Box className="col-span-3">
        <VisitTimeSelect />
      </Box>
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
