'use client'

import { Flex } from '@radix-ui/themes'
import { NoteSectionName } from '@/features/note/constants/constants.ts'
import { Dast10, Gad7, HamD, Pcl5, Phq9 } from './blocks'
import { Audit } from './blocks/audit'

const sectionComponents = {
  [NoteSectionName.NoteSectionPhq9]: Phq9,
  [NoteSectionName.NoteSectionGad7]: Gad7,
  [NoteSectionName.NoteSectionPcl5]: Pcl5,
  [NoteSectionName.NoteSectionAudit]: Audit,
  [NoteSectionName.NoteSectionDast10]: Dast10,
  [NoteSectionName.NoteSectionHamD]: HamD,
}

const QuestionnaireView = () => {
  return (
    <Flex gap="4" direction="column">
      {Object.entries(sectionComponents).map(([sectionName, Component]) => {
        if (!Component) return null

        return <Component key={sectionName} />
      })}
    </Flex>
  )
}

export { QuestionnaireView }
