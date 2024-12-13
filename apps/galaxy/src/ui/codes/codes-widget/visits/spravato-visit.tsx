import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { VisitProps } from '../types'

const SpravatoVisit = ({
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

export { SpravatoVisit }
