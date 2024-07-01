import { Box, Grid, Heading } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import { FORM_FIELD_CLASSES } from '../constants'
import {
  useDegreeOptions,
  useGenderExpressions,
  useGenderOptions,
  useGenderOrientations,
  useGenderPronouns,
  useLanguageAbilityOptions,
  useLanguageOptions,
  useLanguageProficiencyOptions,
  usePatientEthnicityOptions,
  usePatientRaceOptions,
  useReligionOptions,
} from '../hooks'
import {MultiSelectDropdown}  from '@psychplus/ui/multi-select-search-dropdown'
import { useEditModeContext } from '../context'

const DescriptiveSection = () => {
  const raceOptions = usePatientRaceOptions()
  const ethnicityOptions = usePatientEthnicityOptions()
  const degreeOptions = useDegreeOptions()
  const genders = useGenderOptions()
  const genderExpressions = useGenderExpressions()
  const genderOrientations = useGenderOrientations()
  const genderPronouns = useGenderPronouns()
  const languageOptions = useLanguageOptions()
  const religionOptions = useReligionOptions()
  const languageAbilityOptions = useLanguageAbilityOptions()
  const languageProficiencyOptions = useLanguageProficiencyOptions()
  const { register, setValue, getValues } = useFormContext()
  const { editable } = useEditModeContext()

  return (
    <Box className='bg-[#EEF2F6]'>
      <Heading size="3" className="pb-1 pl-2 pt-2 text-[14px]">
        Descriptive
      </Heading>
      <Grid columns='12' rows='2' className="gap-3 bg-[#FFFF] p-2">
        <Box className="col-span-2">
          <FormTextInput
            className={FORM_FIELD_CLASSES}
            {...register('legalName.preferredName')}
            disabled={!editable}
            label="Preferred Name"
          />
        </Box>
        <Box className="col-span-1">
          <FormTextInput
            {...register('legalName.title')}
            disabled={!editable}
            label="Prefix"
            className={FORM_FIELD_CLASSES}
          />
        </Box>
        <Box className="col-span-1">
          <FormTextInput
            {...register('legalName.suffix')}
            disabled={!editable}
            label="Suffix"
            className={FORM_FIELD_CLASSES}
          />
        </Box>
        <Box className="col-span-2">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            contentClassName='max-h-[250px]'
            {...register('legalName.honors')}
            disabled={!editable}
            label="Prof. Suffix"
            options={degreeOptions}
          />
        </Box>

        <Box className="col-span-1">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            {...register('gender')}
            disabled={!editable}
            label="Gender"
            required
            options={genders}
          />
        </Box>
        <Box className="col-span-2">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            {...register('genderOrientation')}
            disabled={!editable}
            label="Orientation"
            options={genderOrientations}
          />
        </Box>
        <Box className="col-span-2">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            {...register('genderExpression')}
            disabled={!editable}
            label="Gender Expression"
            options={genderExpressions}
          />
        </Box>
        <Box className="col-span-1">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            {...register('genderPronoun')}
            disabled={!editable}
            label="Pronoun"
            options={genderPronouns}
          />
        </Box>
        <Box className="col-span-3">
          <FormTextInput
            className={FORM_FIELD_CLASSES}
            {...register('contactDetails.mobileNumber.comment')}
            disabled={!editable}
            label="Comment"
          />
        </Box>

        <Box className="col-span-2">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            contentClassName='max-h-[250px]'
            {...register('religion')}
            disabled={!editable}
            label="Religion"
            options={religionOptions}
          />
        </Box>
        <Box className="col-span-2">
          <FormTextInput
            className={FORM_FIELD_CLASSES}
            {...register('motherMaidenName')}
            disabled={!editable}
            label="Mother Maiden Name"
          />
        </Box>

        <Box className="col-span-2">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            {...register('language')}
            disabled={!editable}
            label="Language"
            options={languageOptions}
          />
        </Box>
        <Box className="col-span-2">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            {...register('languageAbility')}
            disabled={!editable}
            label="Language Ability"
            options={languageAbilityOptions}
          />
        </Box>
        <Box className="col-span-1">
          <FormSelect
            buttonClassName={FORM_FIELD_CLASSES}
            {...register('languageProficiency')}
            disabled={!editable}
            label="Proficiency"
            options={languageProficiencyOptions}
          />
        </Box>
      </Grid>
      <Grid columns='12' className="gap-3 bg-[#FFFF] px-2">
        <Box className="col-span-5">
          <MultiSelectDropdown
            buttonClassName='h-7'
            defaultValues={getValues('races')}
            disabled={!editable}
            onValueChange={(vals) => setValue('races', vals)}
            options={raceOptions ?? []}
            label="Race"
          />
        </Box>
        <Box className="col-span-5">
          <MultiSelectDropdown
            defaultValues={getValues('ethnicities')}
            disabled={!editable}
            buttonClassName='h-7'
            onValueChange={(vals) => setValue('ethnicities', vals)}
            options={ethnicityOptions ?? []}
            label="Ethnicity"
          />
        </Box>
      </Grid>
    </Box>
  )
}

export default DescriptiveSection
