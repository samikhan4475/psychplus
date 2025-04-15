'use client'

import { useMemo } from 'react'
import { Appointment } from '@/types'
import { CodesWidgetSchemaType } from '@/ui/codes/codes-widget/codes-widget-schema'
import {
  getCptCodeOptions,
  getModifiedCptCodes,
  getSortedCptCodes,
} from '@/ui/codes/codes-widget/utils'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
  appointment: Appointment
  isNoteDetailView?: boolean
}

const Details = ({
  data,
  appointment,
  isNoteDetailView,
}: Props<CodesWidgetSchemaType>) => {
  const { cptCodesLookup } = getCptCodeOptions(
    appointment?.cptPrimaryCodes ?? [],
    appointment?.cptAddonCodes ?? [],
    appointment?.cptModifiersCodes ?? [],
  )
  const { cptAddonCodes, cptPrimaryCodes, cptmodifierCodes } = useMemo(() => {
    if (!isNoteDetailView) {
      return getModifiedCptCodes(data, appointment).updatedCodes
    }
    return data
  }, [data, appointment, isNoteDetailView])

  return (
    <BlockContainer heading="Codes">
      {!!cptPrimaryCodes?.length && (
        <LabelAndValue
          label={'Primary:'}
          value={getSortedCptCodes(cptPrimaryCodes, cptCodesLookup)?.join(', ')}
        />
      )}
      {!!cptmodifierCodes?.length && (
        <LabelAndValue
          label={'Modifier:'}
          value={getSortedCptCodes(cptmodifierCodes, cptCodesLookup)?.join(
            ', ',
          )}
        />
      )}
      {!!cptAddonCodes?.length && (
        <LabelAndValue
          label={'Addons:'}
          value={getSortedCptCodes(cptAddonCodes, cptCodesLookup)?.join(', ')}
        />
      )}
    </BlockContainer>
  )
}

export { Details }
