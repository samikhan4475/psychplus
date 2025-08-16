'use client'

import { useEffect } from 'react'
import { Flex } from '@radix-ui/themes'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants/constants.ts'
import { useNoteStore } from '@/features/note/store'
import { useStore } from '@/features/pre-checkin-assessment/store'
import {
  AdultAsrs,
  Aims,
  Audit,
  CopsR,
  Cssrs,
  Dast10,
  Gad7,
  HamD,
  Moca,
  Pcl5,
  Phq9,
  Psc17,
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

  useEffect(() => {
    if (isSaveButtonPressed) {
      const isCompleted = visibleSections.every((section) => {
        const sectionData = getNoteData(section.name) || []
        return sectionData.some(
          (item) =>
            !(item.sectionItem === '1' && item.sectionItemValue === '1'),
        )
      })

      save({ isTabCompleted: isCompleted, patientId })
    }
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
  { name: NoteSectionName.NoteSectionMoca, title: 'MOCA', component: Moca },
  { name: NoteSectionName.NoteSectionHamD, title: 'HAM-D', component: HamD },
  {
    name: NoteSectionName.NoteSectionCssrs,
    title: 'C-SSRC',
    component: Cssrs,
  },
  {
    name: NoteSectionName.NoteSectionPsc17,
    title: 'PSC-17',
    component: Psc17,
  },
  {
    name: NoteSectionName.NoteSectionCopsR,
    title: 'COPS-R',
    component: CopsR,
  },
  {
    name: NoteSectionName.NoteSectionAdultAsrs,
    title: 'Adult ASRS',
    component: AdultAsrs,
  },
]

export { QuestionnaireView, sectionComponents }
