'use client'

import { useEffect, useState } from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { type ActionResult } from '@/api'
import { TabContentHeading, ViewLoadingPlaceholder } from '../shared'
import { getPatientProfileAction } from './actions'
import { CreateUserCard } from './create-user'
import { HistoryButton } from './history-button'
import { PatientInfoForm } from './patient-info-form'
import { SaveButton } from './save-button'
import { StatusSelector } from './status-selector'
import type { PatientProfile } from './types'

const TAB_TITLE = 'Patient Info'

interface PatientInfoTabProps {
  patientId: string
}

const PatientInfoTab = ({ patientId }: PatientInfoTabProps) => {
  const [result, setResult] = useState<ActionResult<PatientProfile>>()

  useEffect(() => {
    getPatientProfileAction(patientId).then(setResult)
  }, [patientId])

  if (!result) {
    return <ViewLoadingPlaceholder title={TAB_TITLE} />
  }

  if (result.state === 'error') {
    return <div>{result.error}</div>
  }

  return (
    <PatientInfoForm patient={result.data}>
      <TabContentHeading title={TAB_TITLE}>
        <Flex align="center" justify="end" gap="2" className="flex-1">
          <Text className="text-[13px] font-[500] text-accent-10">
            Verified
          </Text>
          <StatusSelector />
          <HistoryButton />
          <SaveButton />
        </Flex>
      </TabContentHeading>
      <ScrollArea>
        <Flex direction="column" gap="2">
          <CreateUserCard />
          <Flex className="bg-white h-[250px] border border-gray-5">
            card b
          </Flex>
          <Flex className="bg-white h-[250px] border border-gray-5">
            card c
          </Flex>
          <Flex className="bg-white h-[250px] border border-gray-5">
            card d
          </Flex>
        </Flex>
      </ScrollArea>
    </PatientInfoForm>
  )
}

export { PatientInfoTab }
