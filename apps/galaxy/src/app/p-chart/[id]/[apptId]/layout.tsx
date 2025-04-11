import React, { Suspense } from 'react'
import { Flex, ScrollArea, Text } from '@radix-ui/themes'
import { getPatientProfileDetails } from '@/api'
import { LoadingPlaceholder } from '@/components'
import { ChartNavigation } from '@/ui/chart-navigation'
import { PatientBanner } from '@/ui/patient-banner'
import { StoreProvider } from '@/ui/quicknotes/store'

interface MrnLayoutProps extends React.PropsWithChildren {
  params: {
    id: string
    apptId: string
  }
}

const VisitViewLayout = async ({ children, params }: MrnLayoutProps) => {
  const response = await getPatientProfileDetails({
    isIncludeInsurance: true,
    isIncludeInsuranceVerification: true,
    isIncludeCardVerification: true,
    isIncludeConsentVerification: true,
    patientIds: [params.id],
  })

  if (response.state === 'error') {
    return <Text>{response.error}</Text>
  }

  const patientResult = response.data[response.data.length - 1] ?? {}

  return (
    <StoreProvider patientId={params.id} patient={patientResult}>
      <Flex
        height="100%"
        direction="column"
        gap="1"
        className="bg-pp-bg-accent"
      >
        <Suspense
          fallback={
            <Flex
              direction="column"
              align="center"
              justify="center"
              flexGrow="1"
              className="h-full"
            >
              <LoadingPlaceholder />
            </Flex>
          }
        >
          <PatientBanner
            patientId={params.id}
            user={patientResult}
            appointmentId={params.apptId}
          />
        </Suspense>

        <Flex gap="3" px="2" className="flex-1 overflow-auto">
          <ChartNavigation />
          <ScrollArea className="flex-1">
            <Flex className="h-full flex-1" mb="4">
              <Suspense
                fallback={
                  <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    flexGrow="1"
                    className="h-full"
                  >
                    <LoadingPlaceholder />
                  </Flex>
                }
              >
                {children}
              </Suspense>
            </Flex>
          </ScrollArea>
        </Flex>
      </Flex>
    </StoreProvider>
  )
}

export default VisitViewLayout