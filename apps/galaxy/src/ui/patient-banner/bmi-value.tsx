'use client'

import { PatientVital } from '../vitals'
import { LabelAndValue } from './label-and-value'

interface BmiValueProps {
  vital?: PatientVital
}

const BmiValue = ({ vital }: BmiValueProps) => {
  return <LabelAndValue label="BMI" value={vital?.bodyMassIndex} />
}

export { BmiValue }
