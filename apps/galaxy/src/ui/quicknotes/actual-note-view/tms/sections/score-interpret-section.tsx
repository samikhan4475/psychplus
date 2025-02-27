'use client'

import React from 'react'
import { Text } from '@radix-ui/themes'
import { QuickNoteHistory } from '@/types'
import { calculateTotalScore } from '@/ui/procedures/tms-tab/utils'

interface ScoreInterpretSectionProps {
  questionaireData?: QuickNoteHistory
  title?: string
}

function interpretScore(score: number) {
  if (score >= 0 && score <= 7) return 'Subclinical Range'
  if (score >= 8 && score <= 15) return 'Mild'
  if (score >= 16 && score <= 23) return 'Moderate'
  if (score >= 24 && score <= 31) return 'Severe'
  if (score >= 32 && score <= 40) return 'Extreme'
  return ''
}

const ScoreInterpretSection = ({
  questionaireData,
  title,
}: ScoreInterpretSectionProps) => {
  const hasData = !!questionaireData?.data

  const score = hasData ? calculateTotalScore(questionaireData?.data) : ''

  return (
    <>
      <Text className="mt-2 text-2 font-medium">{title}:</Text>
      <Text className=" text-1 font-medium">
        Score Interpretation | 0-7 - Subclinical Range | 8-15 - Mild | 16-23 -
        Moderate | 24-31 - Severe | 32-40 - Extreme
      </Text>
      <Text className="mb-1 text-1 font-medium">
        Score {score} |{' '}
        {score !== undefined ? interpretScore(Number(score)) : ' '}
      </Text>
    </>
  )
}

export { ScoreInterpretSection }
