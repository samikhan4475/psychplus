'use client'

import { Flex } from '@radix-ui/themes'
import { NoteSectionName } from '@/features/note/constants/constants'
import { FamilyPsychHx, PastPsychHx, SubstanceUseHx } from './blocks'
import { SocialHx } from './blocks/social-hx'
import { PastMedicalHx } from './blocks/past-medical-hx'

const sectionComponents = {
  [NoteSectionName.NoteSectionPastPsychHx]: PastPsychHx,
  [NoteSectionName.NoteSectionFamilyPsychHx]: FamilyPsychHx,
  [NoteSectionName.NoteSectionSubstanceUseHx]: SubstanceUseHx,
  [NoteSectionName.NoteSectionSocialHx]: SocialHx,
  [NoteSectionName.NoteSectionPastMedicalHx]: PastMedicalHx,
}

const HistoriesView = () => {
  return (
    <Flex gap="4" direction="column">
      {Object.entries(sectionComponents).map(([sectionName, Component]) => {
        if (!Component) return null

        return <Component key={sectionName} />
      })}
    </Flex>
  )
}

export { HistoriesView }
