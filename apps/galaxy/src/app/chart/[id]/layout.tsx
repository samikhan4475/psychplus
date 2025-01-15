import React, { Suspense } from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { getPatientProfile } from '@/api'
import { LoadingPlaceholder } from '@/components'
import { ChartNavigation } from '@/ui/chart-navigation'
import { PatientBanner } from '@/ui/patient-banner'
import { StoreProvider } from '@/ui/quicknotes/store'

interface ChartLayoutProps extends React.PropsWithChildren {
  params: {
    id: string
  }
}

const ChartLayout = async ({ children, params }: ChartLayoutProps) => {
  const patientResult = await getPatientProfile(params.id)
  if (patientResult.state === 'error') {
    return <Text>{patientResult.error}</Text>
  }

  return (
    <StoreProvider patientId={params.id} patient={patientResult.data}>
      <Flex
        height="100%"
        direction="column"
        gap="1"
        className="bg-pp-bg-accent"
      >
        <Suspense
          fallback={
            <Flex className="bg-white h-[146px] border-b border-b-gray-5">
              <LoadingPlaceholder />
            </Flex>
          }
        >
          <PatientBanner patientId={params.id} user={patientResult.data} />
        </Suspense>
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
