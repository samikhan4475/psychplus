'use client'

import { useEffect, useState } from 'react'
import { Flex, Text } from '@radix-ui/themes'
import { CodeSet } from '@psychplus/codeset'
import { getCodeSet } from '@psychplus/codeset/api.client'
import {
  FeatureComingSoonDialog,
  useFeatureComingSoon,
} from '../feature-coming-soon-dialog'

const CarePlanCard = () => {
  const { isDialogOpen, toggleDialog } = useFeatureComingSoon()

  const [codeSet, setCodeSet] = useState<CodeSet>()

  useEffect(() => {
    getCodeSet('CarePlanType').then(setCodeSet)
  }, [])

  return (
    <Flex
      className="w-full rounded-6 border border-gray-2 font-bold shadow-3"
      direction="column"
      align="center"
      py="6"
      p="2"
      gap="5"
    >
      <Text size="6" align="center">
        Your Personalized Care Plans
      </Text>

      <Flex gap="7" className="w-full flex-wrap" justify="center" px="7">
        {codeSet?.codes.map((code) => (
          <Flex
            key={code.code}
            justify="center"
            align="center"
            className="h-12 w-1/4 rounded-2 border-2 border-accent-11 text-accent-11 transition duration-500 hover:bg-accent-11 hover:text-accent-1 max-xs:w-full"
            onClick={toggleDialog}
          >
            <Text size="4">{code.display}</Text>
          </Flex>
        ))}
      </Flex>

      <FeatureComingSoonDialog
        isDialogOpen={isDialogOpen}
        toggleDialog={toggleDialog}
      />
    </Flex>
  )
}

export { CarePlanCard }
