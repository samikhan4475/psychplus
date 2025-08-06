'use client'

import { BlockHeading } from '../../block-heading'
import { BlockProps } from '../../types'
import { CivilLitigationRadio } from './civil-litigation-radio'
import { LegalHistoryRadio } from './legal-history-radio'
import { MotorVehicleRecordRadio } from './motor-vehicle-record-radio'
import { RestraintOrderRadio } from './restraint-order-radio'

const Legal = ({ disabled = false }: BlockProps) => {
  return (
    <BlockHeading title="Legal">
      <LegalHistoryRadio disabled={disabled} />
      <RestraintOrderRadio disabled={disabled} />
      <CivilLitigationRadio disabled={disabled} />
      <MotorVehicleRecordRadio disabled={disabled} />
    </BlockHeading>
  )
}
export { Legal }
