'use client'

import { Insurance, InsurancePayer } from '@/types'
import { InsuranceForm } from './insurance-from'

interface InsuranceFormsProps {
  insurances?: Insurance[]
  isAddFormOpen: boolean
  insurancePayers: InsurancePayer[]
  patientId: string
}

const InsuranceForms = ({
  insurances,
  isAddFormOpen,
  insurancePayers,
  patientId,
}: InsuranceFormsProps) => {
  return (
    <>
      {isAddFormOpen && (
        <InsuranceForm
          patientId={patientId}
          insurancePayers={insurancePayers}
        />
      )}
      {insurances?.map((insurance) => (
        <InsuranceForm
          key={insurance.id}
          insurancePayers={insurancePayers}
          insurance={insurance}
          patientId={patientId}
        />
      ))}
    </>
  )
}

export { InsuranceForms }
