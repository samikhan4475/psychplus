'use client'

import { Box, Flex, Text } from '@radix-ui/themes'
import { LabelledText } from '../shared'
import { useStore } from '../store'

const DescriptiveCard = () => {
  const { selectedRow } = useStore((state) => ({
    selectedRow: state?.selectedRow,
  }))
  const ethnicities = selectedRow?.ethnicities?.join(', ')
  const races = selectedRow?.races?.join(', ')
  const cellNumber = selectedRow?.contactDetails?.phoneNumbers?.find(
    (number) => number?.type === 'Contact',
  )

  return (
    <Flex direction="column">
      <Box className="bg-pp-table-subRows rounded-t-1" px="2">
        <Text size="2" weight="bold">
          Descriptive
        </Text>
      </Box>
      <Flex gapX="6" gapY="3" wrap="wrap" p="2">
        <LabelledText
          title="Preferred Name"
          content={selectedRow?.legalName?.preferredName}
        />
        <LabelledText title="Prefix" content={selectedRow?.legalName?.title} />
        <LabelledText title="Suffix" content={selectedRow?.legalName?.suffix} />
        <LabelledText
          title="Prof. Suffix"
          content={selectedRow?.legalName?.honors}
        />
        <LabelledText title="Gender" content={selectedRow?.gender} required />
        <LabelledText
          title="Orientation"
          content={selectedRow?.genderOrientation}
        />
        <LabelledText
          title="Gender Expression"
          content={selectedRow?.genderExpression}
        />
        <LabelledText title="Pronoun" content={selectedRow?.genderPronoun} />
        <LabelledText title="Comment" content={cellNumber?.comment} />
        <LabelledText title="Religion" content={selectedRow?.religion} />
        <LabelledText
          title="Mother Maiden Name"
          content={selectedRow?.motherMaidenName}
        />
        <LabelledText title="Language" content={selectedRow?.language} />
        <LabelledText
          title="Language Ability"
          content={selectedRow?.languageAbility}
        />
        <LabelledText
          title="Proficiency"
          content={selectedRow?.languageProficiency}
        />
        <LabelledText title="Race" content={races} />
        <LabelledText title="Ethnicity" content={ethnicities} />
      </Flex>
    </Flex>
  )
}

export { DescriptiveCard }
