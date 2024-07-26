'use client'

import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { Box, Button, Flex, Text, TextFieldInput } from '@radix-ui/themes'
import { z } from 'zod'
import { Form, FormSelect, useForm, validate } from '@psychplus/form'
import { useStore } from '../../store'

const schema = z.object({
  cptCode: validate.anyString.optional(),
  placeOfService: validate.anyString.optional(),
  macLocality: validate.anyString.optional(),
  description: validate.anyString.optional(),
  service: validate.anyString.optional(),
  category: validate.anyString.optional(),
  gender: validate.anyString.optional(),
  minimumAge: validate.anyString.optional(),
  maximumAge: validate.anyString.optional(),
  resourceStatusList: validate.anyString.or(z.array(z.string())).optional(),
})

interface CPT {
  macLocality?: string
  hcpcsCodes?: string
  cptCode?: string
  placeOfService?: string
  description?: string
  category?: string
  requirement?: string
  gender?: string
  minimumAge?: string
  maximumAge?: string
  resourceStatusList?: string[]
}

interface Props {
  search: (data: CPT) => void
}

const CPTFilterForm = (props: Props) => {
  const posCodes = useStore((state) => state.codingPosList || [])
  const feeScheduleCategory = useStore((state) => state.feeScheduleCategoryList || [])
  const form = useForm({
    schema,
    criteriaMode: 'all',
    defaultValues: {},
  })

  const onSubmit = () => {
    const formData = form.getValues();
    if (typeof formData.resourceStatusList === 'string' && formData.resourceStatusList.trim() !== '') {
      formData.resourceStatusList = [formData.resourceStatusList];
    }
    props.search(formData as CPT);
  }

  const handleClearForm = () => {
    form.reset()
    form.setValue('placeOfService', '')
    form.setValue('category', '')
    form.setValue('gender', '')
    form.setValue('resourceStatusList', '')
  }

  return (
    <Form form={form} onSubmit={onSubmit}>
      <Flex className="z-10 mt-2">
        <Flex wrap="wrap" direction="row" mb="2" gap="4">
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              CPT
            </Text>
            <TextFieldInput
              className="h-30 text-sm p-0"
              placeholder="Enter CPT"
              {...form.register('cptCode')}
            />
          </Box>

          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              POS
            </Text>
            <FormSelect
              key={'placeOfService'}
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('placeOfService')}
              options={posCodes.map((r) => ({
                label: r.display,
                value: r.code,
              }))}
            />
          </Box>
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Description
            </Text>
            <TextFieldInput
              className="h-30 text-sm p-0"
              placeholder="Description.."
              {...form.register('description')}
            />
          </Box>
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Category
            </Text>
            <FormSelect
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('category')}
              options={feeScheduleCategory.map((r) => ({
                label: r.display,
                value: r.code,
              }))}
            />
          </Box>
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Gender
            </Text>
            <FormSelect
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('gender')}
              options={[
                { value: 'Male', label: 'Male' },
                { value: 'Female', label: 'Female' },
              ]}
            />
          </Box>
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Age Range
            </Text>
            <TextFieldInput
              className="h-30 text-sm p-0"
              placeholder="Form"
              {...form.register('minimumAge')}
            />
            <span className="ml-2 mr-2">-</span>
            <TextFieldInput
              className="h-30 text-sm p-0"
              placeholder="To"
              {...form.register('maximumAge')}
            />
          </Box>
          <Box className="row flex items-center">
            <Text className="mr-2" size="1" weight="bold">
              Status
            </Text>
            <FormSelect
              label=""
              size="2"
              placeholder="Select"
              required={false}
              {...form.register('resourceStatusList')}
              options={[
                { value: 'Active', label: 'Active' },
                { value: 'Inactive', label: 'Inactive' },
              ]}
            />
          </Box>
          <Box className="row flex items-center">
            <Button
              highContrast
              variant="outline"
              className="mr-2"
              onClick={handleClearForm}
            >
              Clear
            </Button>
            <Button
              color="gray"
              variant="solid"
              className="bg-[#151B4A]"
              highContrast
              onClick={() => onSubmit()}
            >
              <MagnifyingGlassIcon />
            </Button>
          </Box>
        </Flex>
      </Flex>
    </Form>
  )
}

export { CPTFilterForm }
