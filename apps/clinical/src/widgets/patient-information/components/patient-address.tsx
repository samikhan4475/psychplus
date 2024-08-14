import { useEffect } from 'react'
import { Box, Flex, Grid, Heading, RadioGroup, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect, FormTextInput } from '@psychplus/form'
import { useEditModeContext, useStore } from '@psychplus/patient-info'
import { PlacesAutocomplete } from '@/components/places-autocomplete'
import { useGooglePlacesContext } from '@/providers'
import { FORM_FIELD_CLASSES } from '../constants'
import { useUsStatesOptions } from '../hooks'
import { PatientMailingAddress } from './patient-mailing-address'

const PatientAddress = () => {
  const { register, watch, setValue, resetField } = useFormContext()
  const { loaded } = useGooglePlacesContext()
  const { editable } = useEditModeContext()
  const usStates = useUsStatesOptions()
  const isMailingAddressSameAsPrimary = watch(
    'contactDetails.isMailingAddressSameAsPrimary',
  )

  useEffect(() => {
    if (isMailingAddressSameAsPrimary) {
      resetField('contactDetails.mailingAddress', {
        defaultValue: {
          type: 'Mailing',
          street1: '',
          street2: '',
          city: '',
          state: '',
          country: '',
          postalCode: '',
        },
      })
    }
  }, [isMailingAddressSameAsPrimary, resetField])

  return (
    <Flex direction="column">
      <Heading size="3" className="pb-1 pl-2 pt-2 text-[14px]">
        Address
      </Heading>
      <Grid columns="2" className="gap-4 bg-[#FFFF] px-2 pb-2 pt-3">
        <Box className="col-span-1">
          <Box className="flex flex-col gap-4">
            <Heading size="3" className="py-1">
              Primary <span className="text-[#FF0000]">*</span>
            </Heading>
            {loaded && (
              <PlacesAutocomplete
                required
                disabled={!editable}
                placeholder="Address line 1"
                name={'contactDetails.homeAddress'}
              />
            )}
            <FormTextInput
              className={FORM_FIELD_CLASSES}
              disabled={!editable}
              {...register(`contactDetails.homeAddress.street2`)}
              label="Address 2"
              placeholder="Address line 2"
            />
            <Flex className="bg-gray-200 gap-3">
              <Box className="flex-1">
                <FormTextInput
                  {...register(`contactDetails.homeAddress.city`)}
                  disabled={!editable}
                  required
                  label="City"
                  placeholder="City"
                  className={FORM_FIELD_CLASSES}
                />
              </Box>
              <Box className="flex-1">
                <FormSelect
                  {...register(`contactDetails.homeAddress.state`)}
                  disabled={!editable}
                  required
                  buttonClassName={FORM_FIELD_CLASSES}
                  contentClassName="max-h-[250px]"
                  label="State"
                  placeholder="Select state"
                  options={usStates}
                />
              </Box>
              <Box className="flex-1">
                <FormTextInput
                  {...register(`contactDetails.homeAddress.postalCode`)}
                  disabled={!editable}
                  required
                  label="Zip"
                  placeholder="Zip code"
                  className={FORM_FIELD_CLASSES}
                />
              </Box>
            </Flex>
          </Box>
        </Box>
        <Box className="col-span-1">
          <Box className="flex flex-col gap-4">
            <Flex className="w-[100%]">
              <Heading size="3" className="grow py-1">
                Mail
              </Heading>
              <Flex
                align="center"
                className="box-border w-[70%] justify-between rounded-[4px] bg-[#F0F4FF] px-3 py-1"
              >
                <Text weight="bold" className="text-[12px]">
                  Is your mailing address same as primary?
                </Text>
                <RadioGroup.Root
                  value={
                    watch('contactDetails.isMailingAddressSameAsPrimary')
                      ? 'Yes'
                      : 'No'
                  }
                  disabled={!editable}
                  onValueChange={(val) => {
                    setValue(
                      'contactDetails.isMailingAddressSameAsPrimary',
                      val === 'Yes',
                    )
                  }}
                  size="3"
                  color="indigo"
                  highContrast
                >
                  <Flex gap="3">
                    <Text as="label" size="2">
                      <Flex gap="1">
                        <RadioGroup.Item value="Yes" /> Yes
                      </Flex>
                    </Text>
                    <Text as="label" size="2">
                      <Flex gap="1">
                        <RadioGroup.Item value="No" /> No
                      </Flex>
                    </Text>
                  </Flex>
                </RadioGroup.Root>
              </Flex>
            </Flex>
            <PatientMailingAddress />
          </Box>
        </Box>
      </Grid>
    </Flex>
  )
}

export default PatientAddress
