'use client'

import { Box, Flex, Grid, RadioGroup, Text } from '@radix-ui/themes'
import { useFormContext } from 'react-hook-form'
import { FormSelect } from '@psychplus/form'
import { useGooglePlacesContext } from '@/providers'
import { useUsStatesOptions } from '../hooks'
import { PlacesAutocomplete } from './places-autocomplete/places-autocomplete'
import TextFieldLabel from './text-field'

const ClaimAddress = () => {
  const { loaded } = useGooglePlacesContext()
  const usStates = useUsStatesOptions()
  const form = useFormContext()
  return (
    <Box className="bg-[#fff]">
      <Box className="rounded-tl-1 rounded-tr-1 bg-[#EEF2F6] px-2 py-1">
        <Text
          weight={'bold'}
          className="text-[14px] leading-[16px] text-[#000]"
        >
          Claim Address
        </Text>
      </Box>
      <Flex
        className="max-w-[630px] gap-y-[10px]  py-[10px]"
        direction={'column'}
        width={'100%'}
        px={'2'}
      >
        <Flex
          width={'100%'}
          direction={'row'}
          align={'center'}
          justify={'between'}
          gap={'3'}
        >
          <Text size={'3'} weight={'medium'}>
            Claim Address
          </Text>
          <Flex
            align="center"
            className="box-border justify-between gap-x-[25px] gap-y-1 rounded-[4px] bg-[#F0F4FF] px-3 py-1"
          >
            <Text weight="bold" className="text-[13px]">
              Is your claim address same as Primary?
            </Text>
            <RadioGroup.Root
              defaultValue={form.watch('claimAddressSameAsPrimary')}
              size="3"
              color="indigo"
              onValueChange={(val) =>
                form.setValue('claimAddressSameAsPrimary', val)
              }
              highContrast
            >
              <Flex gap="3">
                <Text as="label" size="2">
                  <Flex gap="1">
                    <RadioGroup.Item value="No" /> No
                  </Flex>
                </Text>
                <Text as="label" size="2">
                  <Flex gap="1">
                    <RadioGroup.Item value="Yes" /> Yes
                  </Flex>
                </Text>
              </Flex>
            </RadioGroup.Root>
          </Flex>
        </Flex>
        <Grid columns={'2'} gap={'3'}>
          {loaded && <PlacesAutocomplete required name={'address1'} />}
          <TextFieldLabel
            label="Address 2"
            type="text"
            required
            error={
              form.formState?.errors?.address2?.message as string | undefined
            }
            onChange={(value: string) => {
              form.setValue(`address2`, value)
            }}
            register={form.register('address2')}
          />
        </Grid>
        <Grid columns={'3'} gap={'3'}>
          <TextFieldLabel
            label="City"
            type="text"
            placeholder="Select"
            error={form.formState?.errors?.city?.message as string | undefined}
            onChange={(value: string) => {
              form.setValue(`city`, value)
            }}
            required
            register={form.register('city')}
          />
          <FormSelect
            label="State"
            size="2"
            placeholder="Select"
            options={usStates ?? []}
            {...form.register('state')}
            required
          />
          <TextFieldLabel
            type="text"
            label="Zip"
            error={form.formState?.errors?.zip?.message as string | undefined}
            onChange={(value: string) => {
              form.setValue(`zip`, value)
            }}
            required
            register={form.register('zip')}
          />
        </Grid>
      </Flex>
    </Box>
  )
}

export { ClaimAddress }
