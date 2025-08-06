'use client'

import { BlockProps } from '../types'
import { AlcoholDrugs } from './alcohol-and-drugs/alcohol-and-drugs'
import { PatientAppointmentDetails } from './appointment-details'
import { CollateralInterviews } from './collateral-interviews'
import { Conclusion } from './conclusion'
import { Education } from './education'
import { Employment } from './employment'
import { EvaluationBlock } from './evaluation'
import { FamilyHistory } from './family-history'
import { History } from './history'
import { ImpulseControl } from './impulse-control/impulse-control'
import { Legal } from './legal-block'
import { Medical } from './medical'
import { Military } from './military'
import { PatientDescription } from './patient-description'
import { ReasonForReferral } from './reason-for-referral'
import { ResultOfInterview } from './result-of-interview'
import { ReviewOfRecords } from './review-of-records'
import { SummaryAndRecommendation } from './summary-and-recommendation'

const Blocks = ({ disabled = false }: BlockProps) => {
  return (
    <>
      <EvaluationBlock disabled={disabled} />
      <PatientDescription disabled={disabled} />
      <PatientAppointmentDetails disabled={disabled} />
      <ReasonForReferral disabled={disabled} />
      <ReviewOfRecords disabled={disabled} />
      <History disabled={disabled} />
      <Employment disabled={disabled} />
      <Military disabled={disabled} />
      <Medical disabled={disabled} />
      <Legal disabled={disabled} />
      <FamilyHistory disabled={disabled} />
      <Education disabled={disabled} />
      <AlcoholDrugs disabled={disabled} />
      <ImpulseControl disabled={disabled} />
      <CollateralInterviews disabled={disabled} />
      <ResultOfInterview disabled={disabled} />
      <SummaryAndRecommendation disabled={disabled} />
      <Conclusion disabled={disabled} />
    </>
  )
}
export { Blocks }
