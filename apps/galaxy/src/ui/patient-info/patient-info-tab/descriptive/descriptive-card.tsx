'use client'

import { Flex } from '@radix-ui/themes'
import { CardHeading } from '@/components'
import { EthnicitySelect } from './ethnicity-select'
import { GenderExpressionSelect } from './gender-expression-select'
import { GenderOrientationSelect } from './gender-orientation-select'
import { GenderSelect } from './gender-select'
import { LanguageSelect } from './language-select'
import { MotherMaidenNameInput } from './maiden-name-input'
import { PreferredNameInput } from './preferred-name-input'
import { PrefixInput } from './prefix-input'
import { ProfessionalSuffixSelect } from './profesional-suffix-select'
import { CommentInput } from './professional-suffix-input'
import { ProficiencySelect } from './proficiency-select'
import { GenderPronounSelect } from './pronoun-select'
import { RaceSelect } from './race-select'
import { ReligionSelect } from './religion-select'
import { SuffixInput } from './suffix-input'

interface DescriptiveCardProps {
  patientId: string
}

const DescriptiveCard = ({ patientId }: DescriptiveCardProps) => {
  return (
    <Flex direction="column" className="bg-white overflow-hidden rounded-1">
      <CardHeading title="Descriptive" />
      <Flex direction="column" px="2" py="2" gap="2">
        <Flex align="start" gap="2">
          <PreferredNameInput />
          <PrefixInput />
          <SuffixInput />
          <ProfessionalSuffixSelect />
          <GenderSelect />
          <GenderOrientationSelect />
          <GenderExpressionSelect />
          <GenderPronounSelect />
        </Flex>
        <Flex align="start" gap="2">
          <CommentInput />
          <ReligionSelect />
          <MotherMaidenNameInput />
          <LanguageSelect />
          <ProficiencySelect />
        </Flex>
        <Flex align="start" gap="2">
          <RaceSelect />
          <EthnicitySelect />
        </Flex>
      </Flex>
    </Flex>
  )
}

export { DescriptiveCard }
