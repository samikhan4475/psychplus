'use client'

import { useEffect, useRef } from 'react'
import { Flex, ScrollArea } from '@radix-ui/themes'
import { EmptyFileIcon } from '@/components/icons'
import { Insurance, InsurancePayer } from '@/types'
import { InsuranceForms } from './form-section'
import { InsuranceHeader } from './insurance-header'
import { FeatureEmpty } from './shared'
import { useStore } from './store'

interface InsuranceViewProps {
  insurancePayers: InsurancePayer[]
  patientId: string
  patientPolicies: Insurance[]
}

const InsuranceView = ({
  insurancePayers,
  patientPolicies,
  patientId,
}: InsuranceViewProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const { isAddFormOpen, setInsurances, filteredInsurances } = useStore(
    (state) => ({
      isAddFormOpen: state.isAddFormOpen,
      setInsurances: state.setInsurances,
      filteredInsurances: state.filteredInsurances,
    }),
  )

  useEffect(() => {
    if (patientPolicies?.length > 0) {
      setInsurances(patientPolicies)
    }
  }, [patientPolicies, patientId, setInsurances])

  useEffect(() => {
    if (!scrollRef?.current) return
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }, [isAddFormOpen])

  return (
    <Flex direction="column" ref={scrollRef} gap="1">
      <InsuranceHeader />
      <ScrollArea className="max-h-[calc(100dvh-375px)]">
        {(filteredInsurances && filteredInsurances?.length > 0) ||
        isAddFormOpen ? (
          <InsuranceForms
            patientId={patientId}
            insurances={filteredInsurances}
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
      </ScrollArea>
    </Flex>
  )
}

export { InsuranceView }
