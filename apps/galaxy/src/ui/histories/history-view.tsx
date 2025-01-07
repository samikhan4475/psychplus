'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import * as Tabs from '@radix-ui/react-tabs'
import { Flex } from '@radix-ui/themes'
import toast from 'react-hot-toast'
import { TabsTrigger } from '@/components'
import { QuickNoteSectionItem } from '@/types'
import { transformIn as transformFamilyPsychHx } from '@/ui/family-psych-hx/family-psych-hx-widget/data'
import { FamilyPsychHxWidget } from '@/ui/family-psych-hx/family-psych-hx-widget/family-psych-hx-widget'
import { FamilyPsychHxWidgetSchemaType } from '@/ui/family-psych-hx/family-psych-hx-widget/family-psych-hx-widget-schema'
import { transformIn as transformPastMedicalHx } from '@/ui/past-medical-hx/past-medical-hx-widget/data'
import { PastMedicalHxWidget } from '@/ui/past-medical-hx/past-medical-hx-widget/past-medical-hx-widget'
import { PastMedicalHxWidgetSchemaType } from '@/ui/past-medical-hx/past-medical-hx-widget/past-medical-hx-widget-schema'
import { transformIn as transformPastPsychHx } from '@/ui/past-psych-hx/past-psych-hx-widget/data'
import { PastPsychHxWidget } from '@/ui/past-psych-hx/past-psych-hx-widget/past-psych-hx-widget'
import { PastPsychHxWidgetSchemaType } from '@/ui/past-psych-hx/past-psych-hx-widget/past-psych-hx-widget-schema'
import { transformIn as transformSocialHx } from '@/ui/social-hx/social-hx-widget/data'
import { SocialHxWidget } from '@/ui/social-hx/social-hx-widget/social-hx-widget'
import { SocialHxWidgetSchemaType } from '@/ui/social-hx/social-hx-widget/social-hx-widget-schema'
import { transformIn as transformSubstanceUseHx } from '@/ui/substance-use-hx/substance-use-hx-widget/data'
import { SubstanceUseHxWidgetSchemaType } from '@/ui/substance-use-hx/substance-use-hx-widget/substance-use-hx-schema'
import { SubstanceUseHxWidget } from '@/ui/substance-use-hx/substance-use-hx-widget/substance-use-widget'
import { QuickNoteSectionName } from '../quicknotes/constants'
import { getHistoryAction } from './actions'
import { HistoryTabs } from './constant'

interface HistoryViewProps {
  pastPsychHxData: PastPsychHxWidgetSchemaType
  familyPsychHxData: FamilyPsychHxWidgetSchemaType
  medicalPsychHxData: PastMedicalHxWidgetSchemaType
  substanceUseHxData: SubstanceUseHxWidgetSchemaType
  socialHxData: SocialHxWidgetSchemaType
  responseData: QuickNoteSectionItem[]
}

const HistoryView = () => {
  const { id: patientId } = useParams<{ id: string }>()
  const [data, setData] = useState<HistoryViewProps>({
    pastPsychHxData: {} as PastPsychHxWidgetSchemaType,
    familyPsychHxData: {} as FamilyPsychHxWidgetSchemaType,
    medicalPsychHxData: {} as PastMedicalHxWidgetSchemaType,
    substanceUseHxData: {} as SubstanceUseHxWidgetSchemaType,
    socialHxData: {} as SocialHxWidgetSchemaType,
    responseData: [],
  })

  useEffect(() => {
    const fetchData = async () => {
      const response = await getHistoryAction({ patientId })
      if (response.state === 'error') {
        toast.error(response.error)
        return
      }

      const groupedData = response.data.reduce((acc, item) => {
        if (!acc[item.sectionName]) {
          acc[item.sectionName] = []
        }
        acc[item.sectionName].push(item)
        return acc
      }, {} as Record<string, QuickNoteSectionItem[]>)

      const pastPsychHxData = transformPastPsychHx(
        groupedData[QuickNoteSectionName.QuickNoteSectionPastPsychHx] || [],
      )
      const familyPsychHxData = transformFamilyPsychHx(
        groupedData[QuickNoteSectionName.QuickNoteSectionFamilyPsychHx] || [],
      )
      const medicalPsychHxData = transformPastMedicalHx(
        groupedData[QuickNoteSectionName.QuickNoteSectionPastMedicalHx] || [],
      )
      const socialHxData = transformSocialHx(
        groupedData[QuickNoteSectionName.QuickNoteSectionSocialHx] || [],
      )
      const substanceUseHxData = transformSubstanceUseHx(
        groupedData[QuickNoteSectionName.QuickNoteSectionSubstanceUseHx] || [],
      )

      setData({
        pastPsychHxData,
        familyPsychHxData,
        medicalPsychHxData,
        socialHxData,
        substanceUseHxData,
        responseData: response.data,
      })
    }

    fetchData()
  }, [patientId])

  return (
    <Tabs.Root className="flex w-full flex-col" defaultValue={HistoryTabs.PPH}>
      <Flex>
        <Tabs.List>
          <TabsTrigger value={HistoryTabs.PPH}>{HistoryTabs.PPH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.PMH}>{HistoryTabs.PMH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.FH}>{HistoryTabs.FH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.SH}>{HistoryTabs.SH}</TabsTrigger>
          <TabsTrigger value={HistoryTabs.SUH}>{HistoryTabs.SUH}</TabsTrigger>
        </Tabs.List>
        <Flex className="flex-1 border-b border-gray-5" />
      </Flex>
      <TabsContent value={HistoryTabs.PPH}>
        <PastPsychHxWidget
          patientId={patientId}
          initialValue={data.pastPsychHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.PMH}>
        <PastMedicalHxWidget
          patientId={patientId}
          initialValue={data.medicalPsychHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.FH}>
        <FamilyPsychHxWidget
          patientId={patientId}
          initialValue={data.familyPsychHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.SH}>
        <SocialHxWidget
          patientId={patientId}
          initialValue={data.socialHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
      <TabsContent value={HistoryTabs.SUH}>
        <SubstanceUseHxWidget
          patientId={patientId}
          initialValue={data.substanceUseHxData}
          isHistoryHeader={true}
        />
      </TabsContent>
    </Tabs.Root>
  )
}

const TabsContent = ({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) => {
  return (
    <Tabs.Content
      value={value}
      className="hidden flex-1 flex-col gap-2 overflow-auto data-[state=active]:flex"
    >
      {children}
    </Tabs.Content>
  )
}

export { HistoryView }
