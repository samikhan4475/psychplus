import { useMemo } from 'react'
import { Box, Flex, Heading } from '@radix-ui/themes'
import { CODE_NOT_SET } from '@psychplus/codeset'
import { usePatientHistoryContext } from '../../context'
import {
  useDegreeIndex,
  useEthnicityIndex,
  useLanguageAbilityIndex,
  useLanguageProficiencyIndex,
  useRaceIndex,
  useReligionIndex,
} from '../../hooks'
import { LabelledText } from './text-and-label'

const DescriptiveSection = () => {
  const { profileHistory } = usePatientHistoryContext()
  const religionIndex = useReligionIndex()
  const degreeIndex = useDegreeIndex()
  const languageProficiencyIndex = useLanguageProficiencyIndex()
  const languageAbilityIndex = useLanguageAbilityIndex()
  const raceIndex = useRaceIndex()
  const ethnicitiesIndex = useEthnicityIndex()
  const races = useMemo(
    () => profileHistory.races?.map((race) => raceIndex[race]).join(', '),
    [profileHistory.races, raceIndex],
  )
  const ethnicities = useMemo(
    () =>
      profileHistory.ethnicities
        ?.map((ethnicity) => ethnicitiesIndex[ethnicity])
        .join(', '),
    [profileHistory.ethnicities, ethnicitiesIndex],
  )
  const cellNumber = profileHistory.contactDetails?.phoneNumbers?.find(
    (number) => number.type === 'Contact',
  )

  return (
    <>
      <Heading size="3" className="pb-1 pl-2 pt-2">
        Descriptive
      </Heading>
      <Flex wrap='wrap' className="gap-x-3 bg-[#FFFF] p-2">
        <LabelledText
          label="Preferred Name"
          value={profileHistory.legalName?.preferredName ?? ''}
        />
        <LabelledText
          label="Prefix"
          value={profileHistory.legalName?.title ?? ''}
        />
        <LabelledText
          label="Suffix"
          value={profileHistory.legalName?.suffix ?? ''}
        />
        <LabelledText
          label="Prof. Suffix"
          value={degreeIndex[profileHistory.legalName?.honors ?? CODE_NOT_SET]}
        />

        <LabelledText
          required
          label="Gender"
          value={profileHistory.gender ?? ''}
        />
        <LabelledText
          label="Orientation"
          value={profileHistory.genderOrientation ?? ''}
        />
        <LabelledText
          label="Gender Expression"
          value={profileHistory.genderExpression ?? ''}
        />
        <LabelledText
          label="Pronoun"
          value={profileHistory.genderPronoun ?? ''}
        />
        <LabelledText label="Comment" value={cellNumber?.comment ?? ''} />

        <LabelledText
          label="Religion"
          value={religionIndex[profileHistory.religion ?? CODE_NOT_SET]}
        />
        <LabelledText
          label="Mother Maiden Name"
          value={profileHistory.motherMaidenName ?? ''}
        />

        <LabelledText label="Language" value={profileHistory.language ?? ''} />
        <LabelledText
          label="Language Ability"
          value={
            languageAbilityIndex[profileHistory.languageAbility ?? CODE_NOT_SET]
          }
        />
        <LabelledText
          label="Proficiency"
          value={
            languageProficiencyIndex[
              profileHistory.languageProficiency ?? CODE_NOT_SET
            ]
          }
        />
        <LabelledText
          label="Race"
          value={races?? ''}
        />
        <Box className="flex-1">
          <LabelledText
            label="Ethnicity"
            value={ethnicities?? ''}
          />
        </Box>
      </Flex>
    </>
  )
}

export default DescriptiveSection
