import { AddonsTable, ModifierTable, PrimaryCodeTable } from '../blocks'
import { VisitProps } from '../types'

const SpravatoVisit = ({ cptAddOnsCodes, cptPrimaryCodes }: VisitProps) => {
  return (
    <>
      <PrimaryCodeTable codes={cptPrimaryCodes} isDisabled />
      <ModifierTable codes={cptmodifierCodes} isDisabled />
      <AddonsTable codes={cptAddOnsCodes} isDisabled />
    </>
  )
}
const cptmodifierCodes = [{ label: '', value: '25' }]

export { SpravatoVisit }
