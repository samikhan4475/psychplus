'use client'

import { useEffect, useState } from 'react'
import { ActionResult } from '@/api'
import { FormFieldContainer, FormFieldLabel, SelectInput } from '@/components'
import { CODESETS } from '@/constants'
import { useCodesetCodes } from '@/hooks'
import { Encounter } from '@/types'
import { getVisitEncounterTypesAction } from '@/ui/schedule/client-actions'
import { getVisitTypesAction } from '@/ui/scheduling-history/actions'
import { SelectOptionType } from '@/ui/scheduling-history/types'
import { getCodesetDisplayName } from '@/utils'
import { useStore } from '../store'

const VisitTypeSelect = () => {
  const [visitTypesResult, setVisitTypesResult] =
    useState<ActionResult<SelectOptionType[]>>()

  const { setVisitTypes } = useStore()
  const sequenceCcodes = useCodesetCodes(CODESETS.VisitSequence)
  const mediumCcodes = useCodesetCodes(CODESETS.VisitMedium)

  useEffect(() => {
    getVisitEncounterTypesAction().then((data: any) => {
      const visitTypes = data.data.map((visitType: Encounter) => {
        const sequence = getCodesetDisplayName(
          visitType.visitSequence,
          sequenceCcodes,
        )
        const medium = getCodesetDisplayName(
          visitType?.visitMedium,
          mediumCcodes,
        )
        return {
          label: `${visitType.typeOfVisit} | ${sequence} | ${medium}`,
          value: String(visitType.id),
          servicesOffered: visitType.encounterToServices?.[0]?.serviceOffered,
        }
      })
      setVisitTypesResult({
        state: 'success',
        data: visitTypes,
      })
    })
  }, [])

  const isSuccess = visitTypesResult?.state === 'success'
  const options = isSuccess ? visitTypesResult?.data : []

  useEffect(() => {
    setVisitTypes(options)
  }, [visitTypesResult])

  return (
    <FormFieldContainer className="flex-row items-center gap-1">
      <FormFieldLabel>Visit Type</FormFieldLabel>
      <SelectInput
        field="visitTypeCode"
        buttonClassName={buttonClassName}
        options={options}
      />
    </FormFieldContainer>
  )
}
const buttonClassName =
  'border-pp-gray-2 h-6 border border-solid !outline-none [box-shadow:none] w-[120px]'
export { VisitTypeSelect }
