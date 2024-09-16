'use client'

import { useEffect, useRef } from 'react'
import { Flex } from '@radix-ui/themes'
import { Insurance, InsurancePayer } from '../types'
import { InsuranceForm } from './insurance-from'

interface InsuranceFormsProps {
  insurances: Insurance[]
  isAddFormOpen: boolean
  insurancePayers: InsurancePayer[]
}

const InsuranceForms = ({
  insurances,
  isAddFormOpen,
  insurancePayers,
}: InsuranceFormsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isAddFormOpen || !scrollRef?.current || !insurances?.length) return
    scrollRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })
  }, [isAddFormOpen])

  return (
    <>
      {insurances.map((insurance) => (
        <InsuranceForm
          key={insurance.id}
          insurancePayers={insurancePayers}
          insurance={insurance}
        />
      ))}
      {isAddFormOpen && (
        <Flex ref={scrollRef}>
          <InsuranceForm insurancePayers={insurancePayers} />
        </Flex>
      )}
    </>
  )
}

export { InsuranceForms }
