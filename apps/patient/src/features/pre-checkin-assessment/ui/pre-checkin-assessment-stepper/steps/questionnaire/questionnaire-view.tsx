'use client'

import { Flex } from '@radix-ui/themes'
import { NoteSectionName } from '@/features/note/constants/constants.ts'
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
