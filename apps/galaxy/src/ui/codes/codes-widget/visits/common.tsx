import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { VisitProps } from '../types'

const CommonVisit = ({
  cptAddOnsCodes,
  cptPrimaryCodes,
  cptmodifierCodes,
}: VisitProps) => {
  return (
    <>
      <PrimaryCodeTable codes={cptPrimaryCodes} />
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  )
}
export { CommonVisit }
