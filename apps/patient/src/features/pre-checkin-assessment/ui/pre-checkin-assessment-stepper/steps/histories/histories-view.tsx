'use client'

import { useEffect, useMemo } from 'react'
import { Flex } from '@radix-ui/themes'
import { useProfileStore } from '@/features/account/profile/store'
import { NoteSectionName } from '@/features/note/constants/constants'
import { useNoteStore } from '@/features/note/store'
import { useStore } from '@/features/pre-checkin-assessment/store'
import { FamilyPsychHx, PastPsychHx, SubstanceUseHx } from './blocks'
import { PastMedicalHx } from './blocks/past-medical-hx'
import { SocialHx } from './blocks/social-hx'

const sectionComponents = {
  [NoteSectionName.NoteSectionPastPsychHx]: PastPsychHx,
  [NoteSectionName.NoteSectionFamilyPsychHx]: FamilyPsychHx,
  [NoteSectionName.NoteSectionSubstanceUseHx]: SubstanceUseHx,
  [NoteSectionName.NoteSectionSocialHx]: SocialHx,
  [NoteSectionName.NoteSectionPastMedicalHx]: PastMedicalHx,
}

const HistoriesView = () => {
  const { isSaveButtonPressed, save } = useStore()
  const getNoteData = useNoteStore((state) => state.getNoteData)
  const patientId = useProfileStore((state) => state.profile.id)
  const isCompleted = useMemo(() => {
    return Object.keys(sectionComponents).every((section) =>
      getNoteData(section as NoteSectionName).some(
        (item) =>
          !(item.sectionItem === 'empty' && item.sectionItemValue === 'true'),
      ),
    )
  }, [getNoteData])

  useEffect(() => {
    if (isSaveButtonPressed) save({ isTabCompleted: isCompleted, patientId })
  }, [isSaveButtonPressed])

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
