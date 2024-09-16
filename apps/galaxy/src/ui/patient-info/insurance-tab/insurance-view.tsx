'use client'

import { EmptyFileIcon } from '@/components/icons'
import { InsuranceForms } from './form-section'
import { InsuranceHeader } from './insurance-header'
import { FeatureEmpty } from './shared'
import { useStore } from './store'
import { InsurancePayer } from './types'

interface InsuranceViewProps {
  insurancePayers: InsurancePayer[]
}

const InsuranceView = ({ insurancePayers }: InsuranceViewProps) => {
  const { insurances, isAddFormOpen } = useStore((state) => ({
    isAddFormOpen: state.isAddFormOpen,
    insurances: state.insurances,
  }))

  return (
    <>
      <InsuranceHeader />
      {(insurances && insurances?.length > 0) || isAddFormOpen ? (
        <InsuranceForms
          insurances={insurances ?? []}
          isAddFormOpen={isAddFormOpen}
          insurancePayers={insurancePayers}
        />
      ) : (
        !isAddFormOpen && (
          <FeatureEmpty
            description="No insurance added yet"
            Icon={EmptyFileIcon}
          />
        )
      )}
    </>
  )
}

export { InsuranceView }
