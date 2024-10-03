import { useEffect, useState } from 'react'
import { Box } from '@radix-ui/themes'
import { useFormContext, useWatch } from 'react-hook-form'
import { TCM } from '@/ui/visit/constants'
import { TCMVisitTypes } from '../../../types'
import { SchemaType } from '../../schema'
import { useEditVisitStore } from '../../store'
import { VisitDate } from '../visit-date'
import { VisitTypeSelect } from '../visit-type-select'
import { DurationSelect } from './duration-select'
import { FrequencySelect } from './frequency-select'
import { ProviderSelect } from './provider-select'
import { ProviderTypeSelect } from './provider-type-select'
import { VisitMediumText } from './visit-medium-text'
import { VisitSequenceText } from './visit-sequence-text'
import { VisitTimeSelect } from './visit-time-select'

const TimedVisitForm = () => {
  const form = useFormContext<SchemaType>()
  const [showDCFields, setShowDCFields] = useState<boolean>(false)
  const { visitTypes } = useEditVisitStore()

  const selectedVisitType = useWatch({
    control: form.control,
    name: 'visitType',
  })

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
        <VisitDate dependentOn="visitType" />
      </Box>
      <Box className="col-span-3">
        <VisitTimeSelect />
      </Box>
      <Box className="col-span-3">
        <DurationSelect />
      </Box>
      <Box className="col-span-3">
        <FrequencySelect />
      </Box>
    </>
  )
}
export { TimedVisitForm }
