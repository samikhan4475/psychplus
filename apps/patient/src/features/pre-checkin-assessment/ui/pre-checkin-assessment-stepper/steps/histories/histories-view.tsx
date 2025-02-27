'use client'

import { Flex } from '@radix-ui/themes'
import { NoteSectionName } from '@/features/note/constants/constants'
import { FamilyPsychHx } from './blocks'

const sectionComponents = {
  [NoteSectionName.NoteSectionFamilyPsychHx]: FamilyPsychHx,
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
