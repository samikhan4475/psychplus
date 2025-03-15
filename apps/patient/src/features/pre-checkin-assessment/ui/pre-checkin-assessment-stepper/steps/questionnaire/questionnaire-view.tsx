'use client'

import { useEffect, useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants/constants.ts'
import { useNoteStore } from '@/features/note/store'
import { useStore } from '@/features/pre-checkin-assessment/store'
import {
  Aims,
  Audit,
  Dast10,
  Gad7,
  HamD,
  Moca,
  Pcl5,
  Phq9,
  SnapIv,
  Ybocs,
} from '@/features/questionnaire'
import { QuestionnaireSection } from './questionnaire-section'

const QuestionnaireView = ({
  questionnaireSectionsToShowOnPreCheckin,
}: {
  questionnaireSectionsToShowOnPreCheckin: NoteSectionName[]
}) => {
  const visibleSections = sectionComponents.filter((sectionComponent) =>
    questionnaireSectionsToShowOnPreCheckin.includes(sectionComponent.name),
  )
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const { isSaveButtonPressed, save } = useStore()
  const patientId = useProfileStore((state) => state.profile.id)
  const isCompleted = useMemo(() => {
    return visibleSections.every((section) => {
      const sectionData = getNoteData(section.name) || []
      return sectionData.some(
        (item) => !(item.sectionItem === '1' && item.sectionItemValue === '1'),
      )
    })
  }, [visibleSections])

  useEffect(() => {
    if (isSaveButtonPressed) save({ isTabCompleted: isCompleted, patientId })
  }, [isSaveButtonPressed])

  return (
    <Flex gap="4" direction="column">
      {visibleSections.map((section) => (
        <QuestionnaireSection key={section.name} {...section} />
      ))}
    </Flex>
  )
}

const sectionComponents = [
  { name: NoteSectionName.NoteSectionPhq9, title: 'PHQ-9', component: Phq9 },
  { name: NoteSectionName.NoteSectionGad7, title: 'GAD-7', component: Gad7 },
  {
    name: NoteSectionName.NoteSectionSnapIV,
    title: 'SNAP-IV',
    component: SnapIv,
  },
  { name: NoteSectionName.NoteSectionPcl5, title: 'PCL-5', component: Pcl5 },
  { name: NoteSectionName.NoteSectionYbocs, title: 'YBOCS', component: Ybocs },
  { name: NoteSectionName.NoteSectionAims, title: 'AIMS', component: Aims },
  { name: NoteSectionName.NoteSectionAudit, title: 'AUDIT', component: Audit },
  {
    name: NoteSectionName.NoteSectionDast10,
    title: 'DAST-10',
    component: Dast10,
  },
  { name: NoteSectionName.NoteSectionHamD, title: 'HAM-D', component: HamD },
  { name: NoteSectionName.NoteSectionMoca, title: 'MOCA', component: Moca },
]

export { QuestionnaireView }
