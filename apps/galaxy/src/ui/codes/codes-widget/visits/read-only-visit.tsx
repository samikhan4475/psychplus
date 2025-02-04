import React from 'react'
import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { VisitProps } from '../types'

const ReadOnlyVisit = ({
  cptAddOnsCodes,
  cptPrimaryCodes,
  cptmodifierCodes,
}: VisitProps) => {
  return (
    <>
      <PrimaryCodeTable codes={cptPrimaryCodes} isDisabled />
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  )
}

export { ReadOnlyVisit }
