import React from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { getPatientProfileDetails } from '@/api'
import { ChartNavigation } from '@/ui/chart-navigation'
import { PatientBanner } from '@/ui/patient-banner'
import { StoreProvider } from '@/ui/quicknotes/store'

interface ChartLayoutProps extends React.PropsWithChildren {
  params: {
    id: string
  }
}

const ChartLayout = async ({ children, params }: ChartLayoutProps) => {
  const payload = {
    isIncludeInsurance: true,
    isIncludeInsuranceVerification: true,
    isIncludeCardVerification: true,
    isIncludeConsentVerification: true,
    patientIds: [params.id],
  }
  const response = await getPatientProfileDetails(payload)

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const patientResult = response.data[response.data.length - 1]

  return (
    <StoreProvider patientId={params.id} patient={patientResult}>
      <Flex
        height="100%"
        direction="column"
        gap="1"
        className="bg-pp-bg-accent"
      >
        <PatientBanner patientId={params.id} user={patientResult} />
        <Flex gap="3" px="2" className="flex-1 overflow-auto">
          <ChartNavigation />
          <ScrollArea className="flex-1">
            <Flex className="flex-1" mb="4">
              {children}
            </Flex>
          </ScrollArea>
        </Flex>
      </Flex>
    </StoreProvider>
  )
}

export default ChartLayout
