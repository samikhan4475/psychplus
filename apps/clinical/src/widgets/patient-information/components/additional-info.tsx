import { Box, Flex, Grid, Heading } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormPhoneNumberInput, FormSelect, FormTextInput } from '@psychplus/form'
import { FORM_FIELD_CLASSES } from '../constants'
import { useDegreeOptions, useUsStatesOptions } from '../hooks'
import DescriptiveSection from './descriptive-section'
import { useGooglePlacesContext } from '@/providers'
import { PlacesAutocomplete } from '@/components/places-autocomplete'
import { useEditModeContext } from '@psychplus/patient-info'

const AdditionalInfo = () => {
  const { register } = useFormContext()
  const usStates = useUsStatesOptions()
  const { loaded } = useGooglePlacesContext()
  const { editable } = useEditModeContext()
  const degreeOptions = useDegreeOptions()

  return (
    <>
      <Box className="w-[100%] bg-[#EEF2F6]">
        <Flex direction="column" className="col-span-1">
          <Heading size="3" className="pb-1 pl-2 pt-2 text-[14px]">
            Additional Contact Info
          </Heading>
          <Grid columns='12' className="gap-3 bg-[#FFFF] p-2">
            <Box className="col-span-2">
              <FormPhoneNumberInput
                className={FORM_FIELD_CLASSES}
                {...register(`contactDetails.homeNumber.number`)}
                disabled={!editable}
                label="Home Phone"
              />
            </Box>
            <Box className="col-span-1">
              <FormTextInput
                className={FORM_FIELD_CLASSES}
                {...register(`contactDetails.homeNumber.extension`)}
                disabled={!editable}
                placeholder='Extension'
                label="Ext"
              />
            </Box>
            <Box className="col-span-3">
              <FormTextInput
                className={FORM_FIELD_CLASSES}
                placeholder='Add comment'
                {...register(`contactDetails.homeNumber.comment`)}
                disabled={!editable}
                label="Comment"
              />
            </Box>
            <Box className="col-span-2">
              <FormPhoneNumberInput
                className={FORM_FIELD_CLASSES}
                {...register(`contactDetails.workNumber.number`)}
                disabled={!editable}
                label="Work Phone"
              />
            </Box>
            <Box className="col-span-1">
              <FormTextInput
                className={FORM_FIELD_CLASSES}
                {...register(`contactDetails.workNumber.extension`)}
                disabled={!editable}
                placeholder='Extension'
                label="Ext"
              />
            </Box>
            <Box className="col-span-3">
              <FormTextInput
                className={FORM_FIELD_CLASSES}
                {...register(`contactDetails.workNumber.comment`)}
                disabled={!editable}
                placeholder='Add comment'
                label="Comment"
              />
            </Box>
          </Grid>
        </Flex>
      </Box>
      <Box className="w-[100%] bg-[#EEF2F6]">
        <Heading size="3" className="pb-1 pl-2 pt-2 text-[14px]">
          Alternate/Previous Info
        </Heading>
        <Grid columns='12' className="gap-3 bg-[#FFFF] p-2">
          <Box className="col-span-2">
            <FormTextInput
              className={FORM_FIELD_CLASSES}
              {...register('alternateOrPreviousName.firstName')}
              disabled={!editable}
              label="First Name"
              placeholder='First name'
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              className={FORM_FIELD_CLASSES}
              {...register('alternateOrPreviousName.middleName')}
              disabled={!editable}
              label="Middle Name"
              placeholder='Middle name'
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              className={FORM_FIELD_CLASSES}
              {...register('alternateOrPreviousName.lastName')}
              disabled={!editable}
              label="Last Name"
              placeholder='Last name'
            />
          </Box>
          <Box className="col-span-1">
            <FormTextInput
              {...register('alternateOrPreviousName.title')}
              disabled={!editable}
              label="Prefix"
              className={FORM_FIELD_CLASSES}
              placeholder='Prefix'
            />
          </Box>
          <Box className="col-span-1">
            <FormTextInput
              {...register('alternateOrPreviousName.suffix')}
              disabled={!editable}
              label="Suffix"
              className={FORM_FIELD_CLASSES}
              placeholder='Suffix'
            />
          </Box>

          <Box className="col-span-4">
            <FormSelect
              {...register('alternateOrPreviousName.honors')}
              disabled={!editable}
              label="Prof. Suffix"
              placeholder='Select professional suffix'
              buttonClassName={FORM_FIELD_CLASSES}
              contentClassName='max-h-[250px]'
              options={degreeOptions}
            />
          </Box>
          <Box className="col-span-3">
            {loaded && <PlacesAutocomplete label='Address Line 1' disabled={!editable} name={'alternateOrPreviousContactDetails.homeAddress'} placeholder='Address line 1' />}
          </Box>
          <Box className="col-span-3">
            <FormTextInput
              className={FORM_FIELD_CLASSES}
              disabled={!editable}
              {...register(
                'alternateOrPreviousContactDetails.homeAddress.street2',
              )}
              placeholder='Address line 2'
              label="Address Line 2"
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              className={FORM_FIELD_CLASSES}
              disabled={!editable}
              {...register(
                'alternateOrPreviousContactDetails.homeAddress.city',
              )}
              placeholder='City'
              label="City"
            />
          </Box>
          <Box className="col-span-2">
            <FormSelect
              buttonClassName={FORM_FIELD_CLASSES}
              contentClassName='max-h-[250px]'
              disabled={!editable}
              {...register(
                'alternateOrPreviousContactDetails.homeAddress.state',
              )}
              label="State"
              placeholder='Select state'
              options={usStates}
            />
          </Box>
          <Box className="col-span-2">
            <FormTextInput
              className={FORM_FIELD_CLASSES}
              disabled={!editable}
              {...register(
                'alternateOrPreviousContactDetails.homeAddress.postalCode',
              )}
              placeholder='Zip code'
              label="Zip"
            />
          </Box>
        </Grid>
      </Box>
      <Box className="w-[100%]">
        <DescriptiveSection />
      </Box>
    </>
  )
}

export default AdditionalInfo
