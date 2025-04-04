'use client'

import { PropsWithChildren, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { TabsTrigger } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { TabsValue } from './constants'
import { HospitalDischargeTab } from './hospital-discharge-widget/hospital-discharge-tab'
import { HospitalInitialTab } from './hospital-initial-widget/hospital-initial-tab'
import { getHospitalTab } from './utils'

interface HospitalViewProps {
  patientId: string
  hospitalInitialData: QuickNoteSectionItem[]
  hospitalDischargeData: QuickNoteSectionItem[]
}

const HospitalView = ({
  patientId,
  hospitalInitialData,
  hospitalDischargeData,
}: HospitalViewProps) => {
  const visitSequence = useSearchParams().get('visitSequence') ?? ''
  const tab = useMemo(() => getHospitalTab(visitSequence), [visitSequence])
  const hospitalWidgets = {
    [TabsValue.Initial]: (
      <HospitalInitialTab
        patientId={patientId}
        isHospitalInitialTab={true}
        hospitalInitialData={hospitalInitialData}
      />
    ),
    [TabsValue.Discharge]: (
      <HospitalDischargeTab
        patientId={patientId}
        isHospitalDischargeTab={true}
        hospitalDischargeData={hospitalDischargeData}
        hospitalInitialData={hospitalInitialData}
      />
    ),
  }
  if (!tab) return null
  return (
    <Tabs.Root defaultValue={tab} className="flex w-full flex-col">
      <Tabs.List>
        <TabsTrigger value={tab}>{tab}</TabsTrigger>
      </Tabs.List>
      <TabsContent value={tab}>{hospitalWidgets[tab]}</TabsContent>
    </Tabs.Root>
  )
}

const TabsContent = ({
  value,
  children,
}: PropsWithChildren<{
  value: string
}>) => (
  <Tabs.Content
    value={value}
    forceMount={true}
    className="hidden flex-1 flex-col gap-2 data-[state=active]:flex"
  >
    {children}
  </Tabs.Content>
)

export { HospitalView, TabsValue }
