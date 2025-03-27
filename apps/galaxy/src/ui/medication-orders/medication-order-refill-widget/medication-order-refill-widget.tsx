'use client'
import { MedicationOrderRefillFilterForm } from './medication-order-refill-filter-form'
import { MedicationOrderRefillHeader } from './medication-order-refill-header'
import { MedicationOrderRefillTable } from './medication-order-refill-table'
import {  Flex } from '@radix-ui/themes'


const MedicationOrderRefillWidget = () => {
  return (
    <Flex
    direction="column"
    width="100%"
    className="bg-white h-[calc(100dvh_-_278px)] rounded-1 shadow-2"
  >
      <MedicationOrderRefillHeader />
      <MedicationOrderRefillFilterForm />
      <MedicationOrderRefillTable />
    </Flex>
  )
}

export { MedicationOrderRefillWidget }
