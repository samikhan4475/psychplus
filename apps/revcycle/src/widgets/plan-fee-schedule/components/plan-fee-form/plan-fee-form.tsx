'use client'

import { ChangeEvent } from 'react'
import { UploadIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormTextInput, useForm, validate } from '@psychplus/form'
import { RadioGroup } from '@psychplus/ui/radio-group'

interface FeeFormData {
  type: string
  mdDoPercent: number | string
  npPoPercent: number | string
  prPercent: number | string
  psychologyPercent: number | string
  mastersPercent: number | string
  file?: File
}

interface FeeFormFile {
  type: string
  file: File
}

enum FeeTypes {
  Percent = 'Percent',
  Fixed = 'Fixed',
}

const rangeRegex = /^[1-9][0-9]?$|^100$/
const schema = z.object({
  type: validate.anyString.optional(),
  mdDoPercent: validate.anyString.regex(rangeRegex),
  npPoPercent: validate.anyString.regex(rangeRegex),
  prPercent: validate.anyString.regex(rangeRegex),
  psychologyPercent: validate.anyString.regex(rangeRegex),
  mastersPercent: validate.anyString.regex(rangeRegex),
})

const PlanScheduleFeeForm = ({
  onFeeFormSubmit,
}: {
  onFeeFormSubmit?: (data: FeeFormData | FeeFormFile) => void
}) => {
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {
      type: 'Percent',
      mdDoPercent: '',
      npPoPercent: '',
      psychologyPercent: '',
      mastersPercent: '',
      prPercent: '',
    },
  })
  const type = form.watch('type', 'Percent')

  const onFeeTypeChange = (event: ChangeEvent) => {
    if (event?.target) {
      onFeeFormSubmit?.({
        type: FeeTypes.Fixed,
        file: ((event.target as HTMLInputElement).files as FileList)[0],
      })
    }
    form.reset()
  }

  const submitPlanFeeForm = () => {
    const data = form.getValues()
    onFeeFormSubmit?.({ ...data, type: data.type || 'Fixed' })
    form.reset()
  }

  return (
    <Box className="mb-2 bg-[#EBF3FC]">
      <Form form={form} onSubmit={submitPlanFeeForm}>
        <Flex direction="row" gap="5" mb="4" mt="4" px="2">
          <Flex gap="4" mb="4" className="items-center">
            <RadioGroup.Root
              size="3"
              defaultValue={FeeTypes.Percent}
              onValueChange={(val) => form.setValue('type', val)}
            >
              <Flex direction="row" gap="3">
                <Text as="label" size="3" key={FeeTypes.Percent}>
                  <Flex gap="2">
                    <RadioGroup.Item
                      key={FeeTypes.Percent}
                      value={FeeTypes.Percent}
                    />
                    {' ' + FeeTypes.Percent}
                  </Flex>
                </Text>
                <Text as="label" size="3" key={FeeTypes.Fixed}>
                  <Flex gap="2">
                    <RadioGroup.Item
                      key={FeeTypes.Fixed}
                      value={FeeTypes.Fixed}
                    />
                    {' ' + FeeTypes.Fixed}
                  </Flex>
                </Text>
              </Flex>
            </RadioGroup.Root>
          </Flex>

          {type === FeeTypes.Percent && (
            <Flex gap="4" mb="4">
              <Box key={'0.0%'} className="flex-1">
                <FormTextInput
                  key={'mdDoPercent'}
                  max={100}
                  step={0.01}
                  label={'MD/DO'}
                  placeholder={'0.0%'}
                  {...form.register('mdDoPercent')}
                />
              </Box>

              <Box key={'pPoPercent'} className="flex-1">
                <FormTextInput
                  key={'npPoPercent'}
                  max={100}
                  step={0.01}
                  placeholder={'0.0%'}
                  label={'NP/PA'}
                  {...form.register('npPoPercent')}
                />
              </Box>

              <Box key={'psychologyPercents'} className="flex-1">
                <FormTextInput
                  key={'psychologyPercent'}
                  max={100}
                  step={0.01}
                  label={'Psychology'}
                  placeholder={'0.0%'}
                  {...form.register('psychologyPercent')}
                />
              </Box>

              <Box key={'mastersPercents'} className="flex-1">
                <FormTextInput
                  key={'mastersPercent'}
                  max={100}
                  step={0.01}
                  label={'Masters'}
                  placeholder={'0.0%'}
                  {...form.register('mastersPercent')}
                />
              </Box>

              <Box className="flex-1">
                <Button
                  className="mt-5"
                  color="blue"
                  variant="surface"
                  highContrast
                  onClick={submitPlanFeeForm}
                >
                  Save
                </Button>
              </Box>
            </Flex>
          )}

          {type === FeeTypes.Fixed && (
            <Flex gap="4">
              <Button color="gray" variant="surface" highContrast>
                <UploadIcon /> Upload File
                <input
                  type="file"
                  className="absolute w-[107px] opacity-0"
                  onChange={onFeeTypeChange}
                />
              </Button>
            </Flex>
          )}
        </Flex>
      </Form>
    </Box>
  )
}

export { PlanScheduleFeeForm }
