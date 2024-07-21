import React, { useMemo } from 'react'
import { Box, Text } from '@radix-ui/themes'
import { PatientHistoryContext } from '../../context'
import { useStore } from '../../store'
import { AdditionalInfo } from './additional-info'
import CreateUser from './create-user'
import PatientAddress from './patient-address'
import PatientData from './patient-data'
import { Patient } from '@psychplus/patient'

interface PatientInfoHistoryProps {
  id?: number
}

const PatientInfo = ({
  id,
  children,
}: React.PropsWithChildren<PatientInfoHistoryProps>) => {
  const data = useStore((state) => state.patientHistory)
  const history = useMemo(
    () => ({ profileHistory: data.find((data) => data.id === id)?? {} as Patient }),
    [data, id],
  )

  if (!history.profileHistory.id) {
    return (
      <Text as="p" className="mt-8 text-center">
        No history records were found
      </Text>
    )
  }

  return (
    <Box className="ml-1 bg-[#EEF2F6] [box-shadow:-0.4px_0_#0134DB72]">
      <PatientHistoryContext.Provider
        value={history}
      >
        <CreateUser />
        <PatientData />
        <PatientAddress />
        {children}
        <AdditionalInfo />
      </PatientHistoryContext.Provider>
    </Box>
  )
}

export { PatientInfo }
