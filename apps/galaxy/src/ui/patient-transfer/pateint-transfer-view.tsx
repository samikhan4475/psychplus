'use client'

import React, { createContext } from 'react'
import { Flex } from '@radix-ui/themes'
import { TabContentHeading } from '@/components'
import { SelectOptionType } from '@/types'
import { PatientHistoryFilterForm } from './pateint-transfer-filter-form'
import { PatientTransferTable } from './patient-transfer-table'
import TransferPatientButton from './transfer-patient-button'

interface PatientTransferContextType {
  staffData?: SelectOptionType[]
  error?: string
  loading?: boolean
  locationsData?: SelectOptionType[]
  posCodesData?: SelectOptionType[]
  fetchClaimOptionsData: () => void
}

const getData = () => {}

const mockContextValue: PatientTransferContextType = {
  staffData: [],
  error: undefined,
  loading: false,
  locationsData: [],
  posCodesData: [],
  fetchClaimOptionsData: () => {
    getData()
  },
}

const TransferPatientContext = createContext<
  PatientTransferContextType | undefined
>(undefined)

const PatientTransferView = () => {
  return (
    <TransferPatientContext.Provider value={mockContextValue}>
      <Flex direction="column" className="relative flex-1 gap-0.5" width="100%">
        <Flex style={{ backgroundColor: 'red' }}>
          <PatientHistoryFilterForm />
        </Flex>
        <TabContentHeading title="Transfer Patient">
          <Flex className="gap-1">
            <TransferPatientButton />
          </Flex>
        </TabContentHeading>
        <Flex direction="column" className="bg-white w-full flex-1">
          <PatientTransferTable />
        </Flex>
      </Flex>
    </TransferPatientContext.Provider>
  )
}

export { PatientTransferView }
