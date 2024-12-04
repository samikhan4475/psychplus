'use client'

import { Appointment } from '@/types'
import { CodesWidgetSchemaType } from '@/ui/codes/codes-widget/codes-widget-schema'
import {
  getCptCodeOptions,
  getSortedCptCodes,
} from '@/ui/codes/codes-widget/utils'
import { BlockContainer, LabelAndValue } from '../shared'

interface Props<T> {
  data: T
  appointment?: Appointment
}

const Details = ({
  data: { cptPrimaryCodes, cptAddonCodes, cptmodifierCodes },
  appointment,
}: Props<CodesWidgetSchemaType>) => {
  const { cptCodesLookup } = getCptCodeOptions(
    appointment?.cptPrimaryCodes ?? [],
    appointment?.cptAddonCodes ?? [],
    appointment?.cptModifiersCodes ?? [],
  )

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
